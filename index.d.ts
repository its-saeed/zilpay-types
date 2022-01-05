export interface ZilPay {
    wallet: ZilPayWallet
    blockchain: ZilPayBlockchain
    crypto: ZilPayCrypto
    utils: ZilPayUtils
    transactions: ZilPayTransactions
}

export interface ZilPayWallet {
    net: ZilPayNet
    defaultAccount: {
        base16: string
        bech32: string
    }
    isEnable: boolean
    connect: () => Promise<boolean>
    sign: () => Promise<{ signature: string, message: string, publicKey: string }>
    verify: Function
    observableAccount: () => {
        subscribe: Function
        unsubscribe: Function
    }
    observableNetwork: () => {
        subscribe: () => ZilPayNet
        unsubscribe: Function
    }
    observableBlock: () => {
        subscribe: () => any
        unsubscribe: Function
    }
    observableTransaction: (...args: string[]) => {
        subscribe: () => any
        unsubscribe: Function
    }
}

export interface ZilPayTransactions {
    // toDs to know if should send to normal or Ds shard
    // https://blog.zilliqa.com/provisioning-sharding-for-smart-contracts-a-design-for-zilliqa-cd8d012ee735.
    new: (transactionParams: ZilPayTransactionProps, toDs: boolean) => ZilPayTransaction
}

export interface ZilPayTransaction extends ZilPayBlockchainPayload {
    result: any
}
export interface ZilPayTransactionProps {
    version?: any
    toAddr: string
    amount: any, // Sending an amount in Zil (1) and converting the amount to Qa
    gasPrice: any, // Minimum gasPrice veries. Check the `GetMinimumGasPrice` on the blockchain
    gasLimit?: any,

}

export interface ZilPayCrypto {
    fromBech32Address: (address: string) => string
    toBech32Address: (address: string) => String
    isValidChecksumAddress: (address: string) => boolean
    toChecksumAddress: (address: string) => string
}

export interface ZilPayUtils {
    bytes: {
        pack: (chainId: number, msgVersion: number) => any
    }
    units: {
        fromQa: (qa: any, unit: "zil" | "qa", options?: any) => string | number
        toQa: (input: string, unit: "zil" | "li") => string | number | any
        Units: {
            Zil: "zil"
            Li: "li"
            Qa: "qa"
        }
    }
}




export interface ZilPayBlockchain {
    getBalance: (address: string) => Promise<ZilPayBlockchainPayload & {
        result: {
            balance: string
            nonce: number
        }
    }>
    getBlockChainInfo: () => Promise<ZilPayBlockchainPayload & {
        result: {
            CurrentDSEpoch: string
            CurrentMiniEpoch: string
            DSBlockRate: number
            NumDSBlocks: string
            NumPeers: number
            NumTransactions: string
            NumTxBlocks: string
            NumTxnsDSEpoch: string
            NumTxnsTxEpoch: string
            ShardingStructure: { NumPeers: number[] }
            TransactionRate: number
            TxBlockRate: number
        }
    }>
    getContractAddressFromTransactionID: (transactionId: string) => Promise<ZilPayBlockchainPayload & {
        result: string
    }>
    getCurrentDSEpoch: () => Promise<ZilPayBlockchainPayload & {
        result: string
    }>
    getCurrentMiniEpoch: (transactionId: string) => Promise<ZilPayBlockchainPayload & {
        result: string
    }>
    getDSBlock: (blockNum: number) => Promise<ZilPayBlockchainPayload & {
        result: ZilPayBlockchainDSBlock
    }>
    getDSBlockListing: (max: number) => Promise<ZilPayBlockchainPayload & {
        result: {
            data: {
                BlockNum: number
                hash: string
            }[],
            maxPages: number
        }
    }>
    getDSBlockRate: () => Promise<ZilPayBlockchainPayload & {
        result: number
    }>
    getLatestDSBlock: () => Promise<ZilPayBlockchainPayload & {
        result: ZilPayBlockchainDSBlock
    }>
    getMinimumGasPrice: () => Promise<ZilPayBlockchainPayload & {
        result: string
    }>
    createTransaction: (tansaction: ZilPayTransaction) => Promise<ZilPayTransactionProps & any>
}


export interface ZilPayBlockchainDSBlock {
    header: {
        BlockNum: string
        Difficulty: number
        DifficultyDS: number
        GasPrice: string
        LeaderPubKey: string
        PoWWinners: string[],
        PrevHash: string
        Timestamp: string
    },
    signature: string
}

export interface ZilPayBlockchainPayload {
    id: number
    jsonrpc: string
    req: any
}

export type ZilPayNet = "mainnet" | "testnet" | "private"
export type ZilPayUnits = "zil" | "li" | "qa"