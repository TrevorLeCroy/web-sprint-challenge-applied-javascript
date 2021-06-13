import axios from 'axios';

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const card         = document.createElement('div');
  const headLine     = document.createElement('div');
  const author       = document.createElement('div');
  const imgContainer = document.createElement('div');
  const authorPhoto  = document.createElement('img');
  const by           = document.createElement('span');


  headLine   .textContent = article.headline;
  by         .textContent = article.authorName;
  authorPhoto.src         = article.authorPhoto;
  

  card        .appendChild(headLine);
  card        .appendChild(author);
  author      .appendChild(imgContainer);
  author      .appendChild(by);
  imgContainer.appendChild(authorPhoto);

  card        .classList.add('card');
  headLine    .classList.add('headline');
  author      .classList.add('author');
  imgContainer.classList.add('img-container');

  card.addEventListener('click', e => {
    console.log(article.headline);
  });

  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  let selectedElement = document.querySelector(selector);

  let request = axios.get(`https://lambda-times-api.herokuapp.com/articles`)
  .then(res => {
    let articles = res.data.articles;

    Object.keys(articles).forEach(articleTopic => {
      for(let i = 0; i < Object.values(articles).length; i++) {
        let article = articles[articleTopic][i];

        if(article != undefined) {
          let articleCard = Card(article);
          selectedElement.appendChild(articleCard);
        }
      }
    });
  })
  .catch(err => {
    console.log(err);
  })

}

export { Card, cardAppender }
