# Getting Started with dApp using React App 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

====== SETUP ======

1) Truffle suite `npm install -g truffle`.
2) Metamask.
3) Ganache.

### `npm install`

This command will install all required packages from "package.json".

### =>/contracts/* ; `truffle migrate` (or) `truffle migrate --reset`

The contract to be deployed must be put in the location.
The file Migrations.sol required for debuging purpose.
To make changes to the compiler or network update truffle-config.
Default/Current set presets,
    
    RPC:
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id (or) chain id

    contracts_build_directory: './src/abis/'

NOTE: MAKE SURE TO CHANGE/ADD DEPLOY COMMANDS TO '2_deploy_contracts.js' IN '/migrations/*'.
### =>/src/pages/App.js

Here you can find sample interaction of the dApp and contract.

====== RUN ======
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
