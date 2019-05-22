export interface ValidateReceiptOptions {
    password?: string;
    excludeOldTransactions?: string;
}

export interface RequestBody extends ValidateReceiptOptions {
    "receipt-data": string;
}
