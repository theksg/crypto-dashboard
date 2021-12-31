import NewsFeed from "./components/NewsFeed";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <>
    <h1 id="mainHeading">CRYPTO DASHBOARD</h1>
    <div className="app">
      
      <CurrencyConverter/>
      <NewsFeed/>
      
    </div>
    </>
    
  );
}

export default App;
