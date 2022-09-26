import crypto from "crypto";
import axios from "axios";
import { buildQueryString, removeEmptyValue } from "./utils";

// const baseURL = 'https://api.binance.com';

export const accountStatus = (apiKey, apiSecret, params = {}) => {
    const method = 'GET';
    const path = '/sapi/v1/account/status';

    return sendRequest(
        apiKey,
        apiSecret,
        method,
        path,
        params
    );
}

export const exchangeInfo = (apiKey, apiSecret, params = {}) => {
    const method = 'GET';
    const path = '/api/v3/exchangeInfo';

    return sendRequest(
        apiKey,
        apiSecret,
        method,
        path,
        params,
        false
    );
}

export const depositHistory = (apiKey, apiSecret, params = {}) => {
    const method = 'GET';
    const path = '/sapi/v1/capital/deposit/hisrec';

    return sendRequest(
        apiKey,
        apiSecret,
        method,
        path,
        params
    );
}

export const depositAddress = (apiKey, apiSecret, params = {}) => {
    const method = 'GET';
    const path = '/sapi/v1/capital/deposit/address';

    return sendRequest(
        apiKey,
        apiSecret,
        method,
        path,
        params
    );
}

export const tradeList = (apiKey, apiSecret, params = {}) => {
    const method = 'GET';
    const path = '/api/v3/myTrades';

    return sendRequest(
        apiKey,
        apiSecret,
        method,
        path,
        params
    );
}

const sendRequest = (apiKey, apiSecret, method, path, params = {}, isQueryString = true) => {
    params = removeEmptyValue(params)

    const timestamp = Date.now()
    const queryString = buildQueryString({ ...params, timestamp });
    const signature = crypto
        .createHmac('sha256', apiSecret)
        .update(queryString)
        .digest('hex');

    let url = "";

    if(isQueryString)
        url = `${path}?${queryString}&signature=${signature}`;
    else
        url = path;

    return axios.create(
        {
            headers: {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': apiKey,
                'Access-Control-Allow-Origin':'*'
            },
        }
    ).request({
        method,
        url
    });
}