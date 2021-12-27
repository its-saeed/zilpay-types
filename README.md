# Zilpay Types

![npm](https://img.shields.io/npm/dm/@nft-game-co/zilpay-types?color=orange)
![npm](https://img.shields.io/npm/l/@nft-game-co/zilpay-types?color=orange)
![npm](https://img.shields.io/npm/v/@nft-game-co/zilpay-types)

These are the types for the Zilpay  wallet and libraries. We created this package as we use a typescript react app and it is much easier to have types to work with.

---

## Installation

Symply run the following:

```bash
yarn add @nft-game-co/zilpay-types
```

or

```bash
npm install @nft-game-co/zilpay-types
```

---

## Usage

To use the extension you can extend the window object with the type.

```ts
import { ZilPay } from '@nft-game-co/zilpay-types'


declare global {
    interface Window {
        zilPay: ZilPay;
    }
}
```

You can then use the types freely when coding:


```ts
const isConnect = await window.zilPay.wallet.connect();
```

---

## Author

Burlet Mederic 

mederic@nftgameco.com
