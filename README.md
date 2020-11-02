# Dapp Boilerplate Using Angular and Bootstrap

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.1.

## Features

* Gets web3 provider from Metamask
* Shows ETH and ERC20 token balances using ethers library
* Dynamically changes addresses when user changes them in Metamask
* Dynamically changes and displays network when user changes them in Metamask
* Allows user to disconnect dapp from wallet

## Bootstrap Dependency

This project uses Bootstrap version 4.1.1 loaded from the Bootstrap CDN (see the `index.html` file). There are alternate ways to add the Bootstrap dependencies to an Angular project directly if you don't want to take a dependency on the CDN. 

## UI Architecture

All HTML was taken from stock bootstrap examples found at https://getbootstrap.com/docs/4.1/examples/.

The project adds a header and footer to the `app.component.html` which are always rendered as components. 

The project adds a default homepage in `homepage.component.ts` which can be easily modified.

The project adds a dashboard for logged in users which displays their balances. This page was based on the dashboard template from the bootstrap examples.

## JSON Module Import

In order to deserialize JSON files to objects, the ts.config has been altered as follows:

```
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
```

## Web3 Integration

The project uses best practices as of October 2020 for connecting to a web3 provider using Metamask. It uses an Observable architecture to listen for both account changed events and network changed events to have the UI automatically update when the user changes things in Metamask. 

Future work could support other wallets which could be added in the login component. 

It uses the ethers library for connecting to smart contracts and shows how to displays erc20 balances. Future work could support more sophisticated smart contract interaction.

## Development server

Run npm or yarn to install dependencies and then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
