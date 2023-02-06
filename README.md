# Stargate

<p align="center">
 <img src="logo.png" />
</p>

Cross-chain bridge and interoperability protocol for Filecoin EVM

## Architecture

<p align="center">
 <img src="Stargate-Diagram.png" />
</p>

## Send messages

Call StargateOriginator with bytes data

```
 function dispatchMessage(bytes calldata message, address sender) external;
```

## Receive messages

Implement the interface in your target contract

```
 interface IStargateHandler {
    function processMessage(bytes calldata message, address sender) external;
 }
```

## Setup

#### Install dependencies

```
$ npm install
```

#### Run the development server

```
$ npm run dev
```

### Start the frontend app

```
$ npm run start
```
