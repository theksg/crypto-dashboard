import { useState } from "react";
import ExchangeRate from "./ExchangeRate";
import axios from "axios";

function CurrencyConverter() {

    const currencies=['BTC','ETH','USD','XRP','LTC','ADA']
    const [chosenPrimaryCurrency,setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency,setChosenSecondaryCurrency] = useState('BTC')
    const [amount,setAmount] = useState(0)
    const [exchangeRate,setExchangeRate] = useState(0)
    const [result,setResult] = useState(0)


    const [exchangeRateVals,setExchangeRateVals] = useState({
        obtainedExchangeRate:0,
        obtainedPrimaryExchangeRate:'BTC',
        obtainedSecondaryExchangeRate:'BTC'
    })


    const convert = ()=>{

        var options = {
        method: 'GET',
        url: 'http://localhost:8000/convert',
        params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
        };

        axios.request(options).then(function (response) {
            console.log(response.data)
            setExchangeRate(response.data);
            setExchangeRateVals({
                obtainedExchangeRate:response.data,
                obtainedPrimaryExchangeRate:chosenPrimaryCurrency,
                obtainedSecondaryExchangeRate:chosenSecondaryCurrency
                })
            setResult(response.data*amount)
        }).catch(function (error) {
            console.error(error);
        });
    }

    console.log("Primary",chosenPrimaryCurrency)
    console.log("Secondary",chosenSecondaryCurrency)
    console.log("Amount",amount)

    return (
        <div className="currency-converter">
            <h2>Currency Converter</h2>
            <div className="input-box">
                <table>
                    <tbody>
                        <tr>
                            <td id="sideColumn">
                                Primary Amount
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={amount}
                                    name="currency-amount-1"
                                    onChange={(e)=>{setAmount(e.target.value)}}
                                />
                            </td>
                            <td>
                                <select
                                    value={chosenPrimaryCurrency}
                                    name="currency-option-1"
                                    className="currency-options"
                                    onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                                >

                                {currencies.map((currency,_index) =>(<option key={_index}>{currency}</option>))}

                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td id="sideColumn">
                                Secondary Amount
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={result}
                                    name="currency-amount-2"
                                    disabled={true}
                                    id="disabledInput"
                                />
                            </td>
                            <td>
                                <select
                                    value={chosenSecondaryCurrency}
                                    name="currency-option-2"
                                    className="currency-options"
                                    onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                                >

                                {currencies.map((currency,_index) =>(<option key={_index}>{currency}</option>))}

                                </select>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                <button id="convert-button" onClick={convert}>Convert</button>
            </div>
            <ExchangeRate 
                exchangeRateVals={exchangeRateVals}
            />
        </div>
    );
}

export default CurrencyConverter;