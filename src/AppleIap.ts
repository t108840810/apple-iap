import axios from "axios";
import {RequestBody, ValidateReceiptOptions} from "./interface/apple_iap.interface";

export class AppleIap {
    /**
     * apple server url
     */
    public readonly serverUrl: string;

    /**
     * constructor
     * @param isTest test env?
     */
    public constructor(isTest: boolean) {
        this.serverUrl = isTest
            ? "https://buy.itunes.apple.com/verifyReceipt"
            : "https://sandbox.itunes.apple.com/verifyReceipt";
    }

    /**
     * Validate apple receipt
     * @param receipt apple receipt
     * @param options options
     */
    public async validateReceipt(receipt: string, options: ValidateReceiptOptions): Promise<any> {
        // request data
        const requestPath = "/verifyReceipt";
        const requestMethod = "POST";
        const requestBody: RequestBody = {
            "receipt-data": receipt
        };

        // add options
        if (options.password !== undefined) requestBody.password = options.password;
        if (options.excludeOldTransactions !== undefined)
            requestBody.excludeOldTransactions = options.excludeOldTransactions;

        // send request
        const response = await axios({
            url: `${this.serverUrl}${requestPath}`,
            method: requestMethod,
            headers: {
                "Content-type": "application/json"
            },
            data: requestBody,
            timeout: 10000
        });

        return response.data;
    }
}
