import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";



function NewsFeed() {

  const [articles, setArticles] = useState(null)

  useEffect(() => {
    var options = {
      method: 'GET',
      url: '/news',
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
      let ind = Math.floor((Math.random() *articles.length));
      articles_to_display.push(articles[ind])
    }
  }

  if (articles_to_display.length !== 0) {
    return (
      <div className="news-feed">
        <h2>News Feed</h2>
        
          {articles_to_display?.map((article, _index) => (<div key={_index}>
            <a href={article.url} target={"_blank"}>
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
}

export default NewsFeed;