# Pasos:

Basado en [hardhat tutorial](https://hardhat.org/tutorial/creating-a-new-hardhat-project)

```bash
npm init
npm install --save-dev hardhat
npx hardhat init
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Editar `hardhat.config.js` para incluir `require("@nomicfoundation/hardhat-toolbox");`

Crear la carpeta `contracts` y los contartos dentro.

```bash
npx hardhat compile
```
