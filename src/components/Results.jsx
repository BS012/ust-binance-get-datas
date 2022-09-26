import {timeConverter} from "../requests/utils";

export default function Results({ depositHistFirst, depositHistSecond, tradesHist, error}){
    return(
        <div className="results">
            {
                error === false && (
                    <>
                        <div className="divider">Results</div>
                        {
                            depositHistFirst !== null && (
                                <>
                                    <p className="deposit-title">UST deposit history</p>
                                    <table className="content-table">
                                        <thead>
                                        <tr>
                                            <th>Coin</th>
                                            <th>Amount</th>
                                            <th>Insert Time</th>
                                            <th>Deposit Address</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            depositHistFirst.data.map((item, i) => (
                                                <tr key={i}>
                                                    <td>{item.coin}</td>
                                                    <td>{item.amount}</td>
                                                    <td>{timeConverter(item.insertTime)}</td>
                                                    <td>{item.address}</td>
                                                </tr>
                                            ))
                                        }
                                        {
                                            depositHistSecond !== null && depositHistSecond.data.map((item, i) => (
                                                <tr key={i}>
                                                    <td>{item.coin}</td>
                                                    <td>{item.amount}</td>
                                                    <td>{timeConverter(item.insertTime)}</td>
                                                    <td>{item.address}</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </>
                            )
                        }

                        {
                            tradesHist.length > 0 && (
                                <>
                                    <p className="deposit-title">UST trade history</p>

                                    <table className="content-table">
                                        <thead>
                                        <tr>
                                            <th>Symbol</th>
                                            <th>Amount</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                            <th>Time</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            tradesHist.map((item, i) => (
                                                <tr key={i}>
                                                    <td>{item.symbol}</td>
                                                    <td>{Number(item.qty).toFixed(2)}</td>
                                                    <td>{Number(item.price).toFixed(2)}</td>
                                                    <td>{Number(item.quoteQty).toFixed(2)}</td>
                                                    <td className={item.isBuyer ? "action-buy" : "action-sell"}>{item.isBuyer ? "Buy" : "Sell"}</td>
                                                    <td>{timeConverter(item.time)}</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}
