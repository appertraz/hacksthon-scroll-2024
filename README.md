# Hackathon Scroll 2024

Proyecto presentado en el Hackathon de Scroll 2024, aplicando a la categoría general.

## Desafío 1

### Lanzamiento y Verificación de Contrato en la Red de Pruebas de Scroll

Siguiendo los pasos del [tutorial](https://gist.github.com/Turupawn/529de9174eb338c6afe04bf85d96983e) proporcionado durante el evento, se logró desplegar y verificar el contrato demo. El contrato está disponible en el siguiente enlace:

- https://sepolia.scrollscan.com/address/0x378E58E2033dD69927398b1979dD39eFc3123a43#code

---

## Proyecto

### Gestor Documental en la Nube

Desarrollamos un gestor documental en la nube diseñado para digitalizar, organizar y centralizar la documentación industrial. Este sistema utiliza contratos inteligentes basados en Scroll para garantizar la inmutabilidad mediante huellas digitales y NFTs.

### Tecnología

#### Smart Contracts

Dentro del gestor documental, se utilizan dos contratos inteligentes para la verificación de documentos. Un contrato principal que incluye un segundo contrato, con el propósito de generar otro contrato `ERC721` para cada cliente. Este contrato es responsable de crear los NFTs que contienen en su descripción los hashes, tamaños y nombres de los archivos, asegurando así la inmutabilidad de los mismos. Los contratos se encuentran en la carpeta `contracts`:

- `MinterFactory.sol`: https://sepolia.scrollscan.com/address/0x04C3BD6d34059dF62443fd3FE2eeDEf18caE8BaE#code
- `Minter.sol`: contrato incluido en `MinterFactory.sol`.

Los contratos cuentan con pruebas unitarias y una coverage del 100%.

Se incluye ademas en la carpeta `optimizing` un script en python que optimiza el número de runs para coompilar
cada uno de los contratos, generando el menor gasto.

#### Frontend

En la carpeta `front` se incluye una versión mínima del flujo de datos necesario para operar los contratos.

### Instalación y Ejecución

#### Contratos

Para instalar todas las dependencias, ejecute el siguiente comando en la carpeta `contracts`:

```bash
npm install
```

Con los siguientes comandos es posible compilar, deployar y testear los mismos:

- `npm run clean`: Limpia el entorno de trabajo
- `npm run test`: prueba los contratos informando el valor de gas
- `npm run coverage`: se evalua la covertura de las pruebas
- `npm run compile`: compila los contratos

- `npm run localhost:launch`: lanza un nodo local
- `npm run localhost:deploy`: deploya el contrato en el nodo local
- `npm run localhost:test`: ejecuta las pruebas sobre el nodo local

- `npm run deploy`: deploya el contrato en la red de scrollSepolia
- `npm run verify`: verifica el contrato deployando anteriormente
- `npm run factory`: ejecuta el contrato `MinterFactory` para obtener un contrato `Minter` para un cliente
- `npm run mint`: consulta el contrato `MinterFactory` para obtener el address del contrato `Minter`
  de un cliente en particular para generar un NFT de un lote.

#### Frontend

Para instalar todas las dependencias es necesario ejecutar el siguiente comendo en la carpeta `front`:

```bash
npm install
```

Con los siguientes comandos es posible lanzar en modo desarrollo, compilar y generar el "compilado" optimizado para ser levantado en un servidor:

- `npm run dev`: lanza un nodo local
- `npm run build`: deploya el contrato en el nodo local
- `npm run start`: ejecuta las pruebas sobre el nodo local
