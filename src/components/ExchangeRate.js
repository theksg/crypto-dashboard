
function ExchangeRate({exchangeRateVals}) {
  const exchangeRate=exchangeRateVals.obtainedExchangeRate
  const chosenPrimaryCurrency=exchangeRateVals.obtainedPrimaryExchangeRate
  const chosenSecondaryCurrency=exchangeRateVals.obtainedSecondaryExchangeRate
    return (
      <div className="exchange-rate">
        <h3>Exhchange Rate</h3>
        <h1>{exchangeRate}</h1>
        <h3>{chosenPrimaryCurrency} to {chosenSecondaryCurrency}</h3>
      </div>
    );
  }
  
  export default ExchangeRate;