import KeysForm from "../components/KeysForm";
import Information from "../components/Information";
import Results from "../components/Results";
import {depositHistory, exchangeInfo, tradeList} from "../requests/binance-api";
import {useState} from "react";

export default function Home(){
    const [depositHistFirst, setDepositHistFirst] = useState(null);
    const [depositHistSecond, setDepositHistSecond] = useState(null);
    const [tradesHist, setTradesHist] = useState([]);
    const [error, setError] = useState(false);

    const onClicked = (binanceApiKey, binanceSecretKey) => {
        setError(false);
        depositHistory(binanceApiKey, binanceSecretKey, {
            coin: "UST",
            startTime: 1651960800000, /*08/05/2022 00:00:00*/
            endTime: 1659304800000 /*01/08/2022 00:00:00*/
        })
            .then((result) => {
                setDepositHistFirst(result)
            })
            .catch((error) => {
                console.log("Error: ", error)
                setDepositHistFirst(null)
                setError(true);
            })

        depositHistory(binanceApiKey, binanceSecretKey, {
            coin: "UST",
            startTime: 1659304800000, /*01/08/2022 00:00:00*/
            endTime: 1666216808000 /*20/10/2022 00:00:08*/
        })
            .then((result) => {
                setDepositHistSecond(result)
            })
            .catch((error) => {
                console.log("Error: ", error)
                setDepositHistSecond(null)
                setError(true);
            })

        exchangeInfo(binanceApiKey, binanceSecretKey)
            .then((result) => {
                const ustSymbols = result.data.symbols.filter(item => item.symbol.includes("UST"));

                ustSymbols.forEach((arrItem) => {
                    tradeList(binanceApiKey, binanceSecretKey, { symbol: arrItem.symbol })
                        .then((result) => {
                            if(result.data.length > 0){
                                result.data.forEach((trade) => {
                                    setTradesHist(current => [...current, trade]);
                                })
                            }

                        })
                        .catch((error) => {
                            console.log("Error: ", error)

                        })
                })
            })
            .catch((error) => {
                console.log("Error: ", error)
                setTradesHist([]);
                setError(true);
            })
    }
    return(
        <>
            <Information/>
            <KeysForm onClicked={onClicked} error={error}/>
            <Results
                depositHistFirst={depositHistFirst}
                depositHistSecond={depositHistSecond}
                tradesHist={tradesHist}
                error={error}/>
        </>
    )
}