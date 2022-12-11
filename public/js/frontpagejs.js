const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMAGEPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(APIURL);
async function getMovies(url){
     const response = await fetch(url);
     const responseData = await response.json();
     showMovies(responseData.results);
}
/*
function showMovies(movies){
     main.innerHTML = "";
     movies.forEach(movie => {
          const {poster_path,title,vote_average,overview} = movie;
          const movieElement = document.createElement('div');
          movieElement.classList.add('movie');
          movieElement.innerHTML = `
               <img src="${IMAGEPATH + poster_path}" alt="${title}"/>
               <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
               </div>
               <div class="overview">
                    <h3>Overview:</h3>
                    ${overview}
               </div>
          `;
          main.appendChild(movieElement);
     });
}
function getClassByRate(vote){
     if(vote >= 8){
          return "green";
     }else if(vote >= 5){
          return "orange";
     }else{
          return "red";
     }
}
*/
form.addEventListener('submit',(event) => {
     //event.preventDefault();
     const searchTerm = search.value;
     if(searchTerm){
          getMovies(SEARCHAPI + searchTerm);
          //search.value = "";
     }
});
