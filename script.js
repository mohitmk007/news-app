const apiKey = "2c5dbc42fcdd4a2bb1cfa03d7411cea9";
const url = "https://newsapi.org/v2/everything?q=";

const loader = document.getElementById("preloader")
let load = document.getElementsByClassName("loaderPng")
// console.log(load)
window.addEventListener("load", () => {
    fetchNews("India")
});

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await res.json();
    console.log(data);
    if(data.status === "ok"){
      loader.style.display = "none";
      
    }

    
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  
  cardsContainer.innerHTML = "";
  articles.forEach((article) => {
      if (!article.urlToImage) return;
      const cardClone = newsCardTemplate.content.cloneNode(true);
      fillDataInCard(cardClone, article);
      cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const neswSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  neswSource.innerHTML = `${article.source.name} - ${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
      window.open(article.url, "blank");
    });
}


let curserSelectedNav = null;
function onNavItemClick(id) {
  // const a = curserSelectedNav.classList.add("loaderPng")
  // console.log(a);
  // console.log(data.status)
    fetchNews(id);
    console.log(fetchNews(id))
    const navItem = document.getElementById(id);
  curserSelectedNav?.classList.remove("active");
  curserSelectedNav = navItem;
  curserSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button")
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
  const query = searchText.value;
  const loadpng = document.getElementById('preloader')
  if(!query)return;
  fetchNews(query);
curserSelectedNav?.classList.remove('active')
curserSelectedNav = null;
if(query.status === true){
  loader.style.display = "none";
}else{
  
  loader.style.display = "none";
}
})