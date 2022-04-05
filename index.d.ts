export interface ZilPay {
    wallet: ZilPayWallet
    blockchain: ZilPayBlockchain
    crypto: ZilPayCrypto
    utils: ZilPayUtils
    transactions: ZilPayTransactions
    contracts: ZilPayContracts
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
    observableAccount: (...args: string[]) => {
        subscribe: Function
        unsubscribe: Function
    }
    observableNetwork: (...args: string[]) => {
        subscribe: (hashs?: string[]) => ZilPayNet
        unsubscribe: Function
    }
    observableBlock: (...args: string[]) => {
        subscribe: (hashs?: string[]) => Promise<any>
        unsubscribe: Function
    }
    observableTransaction: (...args: string[]) => {
        subscribe: any
        unsubscribe: Function
    }
    addTransactionsQueue: (...args: string[]) => any
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


export interface ZilPayContracts {
    at: (address: string) => ZilPayContract
    new: (scillaCode: string, params: ZilPayParam[]) => ZilPayContract
}
export interface ZilPayContract {
    address: string
    code: undefined | string
    init: undefined | ZilPayParam[]
    transaction: any
    call: (transaction: string, params: ZilPayParam[], config: { amount: any, gasPrice: any, gasLimit: any }, toDs: boolean) => Promise<ZilPayContractCall>
    deploy: (config: { amount: any, gasPrice: any, gasLimit: any }, toDs: boolean) => Promise<[ZilPayTransaction, ZilPayContract]>
    getInit: () => Promise<ZilPayParam[]>
    getCode: () => Promise<string>
    getState: () => Promise<ZilPayContractState & any>
}
export interface ZilPayContractState {
    _balance: string
    total_supply: string
}

export interface ZilPayContractCall {
    ID: string
    Info: string
    amount: any
    code: string
    data: { _tag: string, params: ZilPayParam[] }
    from: string
    gasLimit: any
    gasPrice: any
    nonce: number
    priority: boolean
    pubKey: string
    receipt: undefined | any
    signature: string
    toAddr: string
    version: number
}
export interface ZilPayParam {
    type: string,
    value: string,
    vname: string
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