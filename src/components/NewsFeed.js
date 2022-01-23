import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";



function NewsFeed() {

  const [articles, setArticles] = useState(null)

  useEffect(() => {
    var options = {
      method: 'GET',
      url: 'http://localhost:8000/news',
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setArticles(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, [])


  const range = 7
  const articles_to_display = []

  const dummy_article=[]

  for(let i=0;i<range;i++)
    dummy_article.push({url:"",title:"",source:""})

  if (articles?.length > 0) {
    for (let i = 0; i < range; i++) {
      let ind = Math.floor((Math.random() * 100));
      articles_to_display.push(articles[ind])
    }
  }

  if (articles_to_display.length !== 0) {
    return (
      <div className="news-feed">
        <h2>News Feed</h2>
        
          {articles_to_display?.map((article, _index) => (<div key={_index}>
            <a href={article.url}>
              <p>{article.title}</p>
            </a>
            <p id="source">via {article.source}</p>
          </div>)
          )}
        
      </div>
    );
  }
  else
  return (
    <div className="news-feed">
      <h2>News Feed</h2>
      
        {dummy_article?.map((article, _index) => (<div key={_index}>
          <a href={article.url}>
            <p className="skeleton skeleton-text">{article.title}</p>
            <p className="skeleton skeleton-text">{article.title}</p>
          </a>
          <p id="source" className="skeleton skeleton-text">{article.source}</p>
        </div>)
        )}
      
    </div>
  );
  //  return (
  //   <div className="news-feed">
  //     <h2>Latest about Crypto</h2>
  //     <ul><div><a href="https://coindesk.com/learn/"><p>Crypto Explainer+</p></a><p>via coindesk</p></div><div><a href="https://coindesk.com/learn/"><p>Crypto Explainer+</p></a><p>via coindesk</p></div><div><a href="https://coindesk.com/data/"><p>Crypto Prices </p></a><p>via coindesk</p></div><div><a href="https://coindesk.com/tech/2021/12/24/dfinitys-internet-computer-opens-ethereum-bridge/"><p>Dfinity’s Internet Computer Opens Ethereum Bridge</p></a><p>via coindesk</p></div><div><a href="https://coindesk.com/sponsored-content/crypto-aml-compliance-how-risk-scoring-can-help-meet-regulatory-requirements/"><p>Crypto AML Compliance: How Risk Scoring Can Help Meet Regulatory Requirements</p></a><p>via coindesk</p></div><div><a href="https://coindesk.com/markets/2021/12/24/cardano-polkadot-advance-as-crypto-market-rallies-ahead-of-christmas/"><p>Cardano, Polkadot Advance as Crypto Market Rallies Ahead of Christmas</p></a><p>via coindesk</p></div><div><a href="https://coindesk.com/policy/2021/12/23/lummis-to-propose-new-crypto-regulator-clear-guidance-in-2022-bill/"><p>Wyoming Sen. Lummis to Propose New Crypto Regulator, Clear Guidance in 2022 Bill</p></a><p>via coindesk</p></div></ul>
  //   </div>
  // );
}

export default NewsFeed;