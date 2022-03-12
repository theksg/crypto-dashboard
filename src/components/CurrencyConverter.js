import { useState } from "react";
import ExchangeRate from "./ExchangeRate";
import axios from "axios";
import TextField from '@mui/material/TextField';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

function CurrencyConverter() {

    const currencies=['BTC','ETH','USD','XRP','LTC','ADA']
    const [chosenPrimaryCurrency,setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency,setChosenSecondaryCurrency] = useState('BTC')
    const [amount,setAmount] = useState(0)
    const [result,setResult] = useState(0)


    const [exchangeRateVals,setExchangeRateVals] = useState({
        obtainedExchangeRate:0,
        obtainedPrimaryExchangeRate:'BTC',
        obtainedSecondaryExchangeRate:'BTC'
    })


    const convert = ()=>{

        var options = {
        method: 'GET',
        url: '/convert',
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
                
                        <div className="row">
            
                            
                            
                            <TextField
                                required
                                id="outlined-required"
                                label="Primary Currency Value"
                                type="number"
                                    value={amount}
                                    name="currency-amount-1"
                                    onChange={(e)=>{setAmount(e.target.value)}}
                                />
                            <Box>
                                <FormControl>
                            <InputLabel id="demo-simple-select-label">CUR</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={chosenPrimaryCurrency}
                                label="CUR"
                                onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                                >

                                {currencies.map((currency,_index) =>(<MenuItem key={_index} value={currency}>{currency}</MenuItem>))}
                                </Select>
                                </FormControl>
                            </Box>

                           
                        </div>
                        <div className="row">
                            
                            <TextField
                            className="currencyInputValue"
                                id="outlined-read-only-input"
                                label="Converted Currency Value"
                                value={result}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                                <Box>
                                <FormControl>
                            <InputLabel id="demo-simple-select-label">CUR</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={chosenSecondaryCurrency}
                                label="CUR"
                                onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                                >

                                {currencies.map((currency,_index) =>(<MenuItem key={_index} value={currency}>{currency}</MenuItem>))}
                                </Select>
                                </FormControl>
                            </Box>
                         
                        </div>
                   
                <Tooltip title="Convert">
                    <IconButton onClick={convert}>
                <CurrencyExchangeIcon className="currencyExchangeButton" />
                </IconButton>
                </Tooltip>
            </div>
            <ExchangeRate 
                exchangeRateVals={exchangeRateVals}
            />
        </div>
    );
}

export default CurrencyConverter;