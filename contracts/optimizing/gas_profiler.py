#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
# Copyright (C) 2023 Schmidt Cristian Hernán

import os
import re
import json
import shutil
import pathlib
import datetime
import subprocess

try:
    import numpy
    import pandas
    import matplotlib

    matplotlib.use("GTK3Agg")
    import matplotlib.pyplot as plot
except ImportError:
    print("Must have installed: numpy, pandas, matplotlib\n")
    print("Run: python3 -m pip install --user numpy pandas matplotlib")
    sys.exit(-1)

pandas.plotting.register_matplotlib_converters()

# -----------------------------------------------------------------------------

FILE = pathlib.Path(__file__)
BASE = os.path.splitext(FILE.name)[0]
ROOT = FILE.parent
JSON = ROOT / f"{BASE}.json"

hardhat_data = """
require("@nomicfoundation/hardhat-toolbox");
module.exports = {{
  solidity: {{
    version: "0.8.20",
    settings: {{
      optimizer: {{
        enabled: true,
        runs: {runs},
      }},
    }},
  }},
}};
"""
hardhat_path_backup = ROOT.parent / "hardhat.config.js.backup"
hardhat_path = ROOT.parent / "hardhat.config.js"
package_path = ROOT.parent / "package.json"
utils_path = ROOT.parent / "test" / "utils.js"

# -----------------------------------------------------------------------------


def run(command):
    output = subprocess.run(command, shell=True, capture_output=True, text=True)
    return output.stdout.strip()


def list_amounts(start, stop, base=10):
    integer_powers = set(numpy.power(base, range(start, stop + 1)))
    for amount in range(500):
        exponents = numpy.linspace(start, stop, amount)
        runs_list = set(numpy.unique(numpy.power(base, exponents).astype(int)))
        if not (integer_powers - runs_list):  # empty? → all present
            print(f"amount: {amount:3} | real: {len(runs_list):3}")


# -----------------------------------------------------------------------------

amount = 79  #        73 real amount
start = 0  #           1 (base**0)
stop = 6  #    1_000_000 (base**6)
base = 10

if JSON.exists():
    print("\n\x1b[40m\x1b[1;31m Load data \x1b[0m\n")
    with JSON.open(mode="r") as fid:
        (
            version,
            git_hash,
            is_random,
            settings_runs,
            cost_nft_mint,
            cost_contract,
        ) = json.load(fid)

else:
    with package_path.open(mode="r") as fid:
        version = json.load(fid).get("version")

    git_hash = run("git rev-parse HEAD")[0:7]
    is_random = "true" in run(f"grep 'const RANDOM =' {utils_path}")

    ran = "YES" if is_random else "NO"
    print("\n\x1b[40m\x1b[1;31m Random tests: {} \x1b[0m\n".format(ran))

    if is_random:
        answer = input("Tests are randomized, to continue? [yes|no]: ")
        if answer != "yes":
            print("Stoped.\n")
            quit()
        print()

    sep = r"\s+\S\s+"
    num = f"{sep}\S+{sep}\S+{sep}"
    dat = re.compile(f"Minter(?:Factory)?{sep}(mint|createMinter){num}(\d+)")
    col = re.compile("\x1b\[\d+m")

    exponents = numpy.linspace(start, stop, amount)
    runs_list = numpy.unique(numpy.power(base, exponents).astype(int))
    amount = len(runs_list)  # real amount without repeats

    settings_runs = []
    cost_nft_mint = []
    cost_contract = []

    shutil.copy(hardhat_path, hardhat_path_backup)
    os.chdir(ROOT.parent)  # root of NodeJS project

    t1 = datetime.datetime.now()

    for i, runs in enumerate(runs_list, 1):
        print(f"[{i/amount:6.1%}] {runs=}")

        with hardhat_path.open(mode="w", encoding="utf-8") as fid:
            fid.write(hardhat_data.format(runs=runs).strip())

        output = run("npm run clean && npm run test")
        cost = dict(dat.findall(col.sub("", output)))

        settings_runs.append(int(runs))
        cost_nft_mint.append(int(cost["mint"]))
        cost_contract.append(int(cost["createMinter"]))

    t2 = datetime.datetime.now()
    print(f"\nTime: {t2-t1}\n")

    hardhat_path.unlink()
    shutil.move(hardhat_path_backup, hardhat_path)

    with JSON.open(mode="w") as fid:
        data = (
            version,
            git_hash,
            is_random,
            settings_runs,
            cost_nft_mint,
            cost_contract,
        )
        json.dump(data, fid, indent=2)

# -----------------------------------------------------------------------------

data = [
    ("nft", cost_nft_mint, 0.75, "Minter.mint()"),
    ("contract", cost_contract, 0.25, "MinterFactory.createMinter()"),
]
for name, gas, fxpos, fname in data:
    print(f"{name}")

    results = ROOT / "results"
    results.mkdir(exist_ok=True)

    df = pandas.Series(name=name, index=settings_runs, data=gas)
    df.to_csv(
        results / f"{name}.csv",
        sep=",",
        encoding="utf-8",
        index_label="runs",
        header=["gas"],
    )

    fig, ax = plot.subplots()

    ax.plot(df, "ko-", linewidth=0.5, markersize=1)
    ax.set_xscale("log", base=base)

    x1 = settings_runs[0]
    x2 = settings_runs[-1]
    xm = base ** ((stop - start) / 2)

    y1 = gas[0]
    y2 = gas[-1]
    ym = (y2 + y1) / 2

    p = (y2 / y1 - 1) * 100

    ax.annotate(
        "",
        xy=(xm, y1),
        xytext=(xm, y2),
        arrowprops=dict(arrowstyle="|-|", connectionstyle="arc3", color="red"),
    )

    code = "${:+.1f}\,\%$"
    params = {
        "color": "red",
        "fontsize": 10,
        "ha": "center",
        "va": "center",
        "bbox": {"boxstyle": "round", "fc": "white", "ec": "red"},
    }
    ax.text(xm, ym, code.format(p), **params)

    ax.set_title(f"Contract version {version}-{git_hash}")
    ax.set_xlabel("Solidity compiler parameter: $runs$")
    ax.set_ylabel("Gas used in the tests [wei]")

    func = ax.text(
        fxpos,
        0.70,
        fname,
        ha="center",
        va="center",
        fontsize="small",
        transform=ax.transAxes,
        bbox={"boxstyle": "round,pad=0.5", "fc": "#eee", "ec": "#ddd", "lw": 0.5},
    )

    fig.set_size_inches(9, 6, forward=True)
    fig.set_dpi(150)
    fig.savefig(results / f"{name}.png", format="png")

    plot.show()

print()
