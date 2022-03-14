import Tooltip from '@mui/material/Tooltip';

function ExchangeRate({exchangeRateVals}) {
  const exchangeRate=exchangeRateVals.obtainedExchangeRate
  const chosenPrimaryCurrency=exchangeRateVals.obtainedPrimaryExchangeRate
  const chosenSecondaryCurrency=exchangeRateVals.obtainedSecondaryExchangeRate
    return (
      <div className="exchange-rate">
        <h3>Exchange Rate</h3>
        <Tooltip title={exchangeRate}>
        <h1>{exchangeRate}</h1>
        </Tooltip>
        <h3>{chosenPrimaryCurrency} to {chosenSecondaryCurrency}</h3>
      </div>
    );
  }
  
  export default ExchangeRate;