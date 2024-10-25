const API_KEY = "6aa2976a";

async function fetchData(title) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
    const data = await response.json();
    return data;
}

const searchInputElement = document.querySelector('#movie-search-input');
const searchButtonElement = document.querySelector('#movie-search-button');
const spinner = document.querySelector(".spinner-border");
const toastElement = document.querySelector('.toast');
const toastBody = document.querySelector('.toast-body');
const toastHeader = document.querySelector('.toast-header');
const toastBootstrap = new bootstrap.Toast(toastElement);
const searchResultsContainer = document.querySelector('.search-results');
let favMoviesList = JSON.parse(localStorage.getItem('favMovies')) || [];

let movieTitleValue = '';
let addedMovie = null;

searchButtonElement.addEventListener('click', async () => {
    movieTitleValue = searchInputElement.value;

    if (!movieTitleValue) {
        alert("Введите название фильма.");
        return;
    }

    spinner.style.display = "inline-block";

    try {
        const movie = await fetchData(movieTitleValue);

        if (movie.Response === "False") {
            toastBody.textContent = "Фильм не найден";
            toastHeader.classList.remove("bg-success");
            toastHeader.classList.add("bg-danger");
            toastBootstrap.show();
        } else {
            
            searchResultsContainer.innerHTML = '';

            const cardElementTemplate = `
            <div class="card" style="width: 18rem">
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title} movie poster" />
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">${movie.Plot}</p>
                    <div class="d-flex align-items-stretch">
                        <a href="#" class="btn btn-primary d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Подробнее
                        </a>
                        <a href="#" class="btn btn-primary" id="add-fav-btn">
                            Добавить в Избранное
                        </a>
                    </div>
                </div>
            </div>`;

            searchResultsContainer.insertAdjacentHTML('beforeend', cardElementTemplate);
            addedMovie = movie;

            
            const addToFavButton = searchResultsContainer.querySelector('#add-fav-btn');
            addToFavButton.addEventListener('click', () => {
                
                if (!favMoviesList.some(favMovie => favMovie.Title === movie.Title)) {
                    favMoviesList.push(movie);
                    localStorage.setItem('favMovies', JSON.stringify(favMoviesList));
                    toastBody.textContent = "Фильм добавлен в избранное";
                    toastHeader.classList.remove("bg-danger");
                    toastHeader.classList.add("bg-success");
                    toastBootstrap.show();
                } else {
                    toastBody.textContent = "Фильм уже в избранном";
                    toastHeader.classList.remove("bg-success");
                    toastHeader.classList.add("bg-warning");
                    toastBootstrap.show(); 
                }
            });

            
            toastBody.textContent = "Фильм найден";
            toastHeader.classList.remove("bg-danger");
            toastHeader.classList.add("bg-success");
            toastBootstrap.show();
        }
    } catch (error) {
        alert("Ошибка при получении данных о фильме.");
    } finally {
        spinner.style.display = "none";
    }
});







   

const cardElementTemplate = `
<div class="card" style="width: 18rem">
    <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title} movie poster" />
    <div class="card-body">
        <h5 class="card-title">${movie.Title}</h5>
        <p class="card-text">${movie.Plot}</p>
        <div class="d-flex align-items-stretch">
            <a href="#" class="btn btn-primary d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal" data-movie='${JSON.stringify(movie)}'>
                Подробнее
            </a>
            <a href="#" class="btn btn-primary" id="add-fav-btn">
                Добавить в Избранное
            </a>
        </div>
    </div>
</div>`;

searchButtonElement.addEventListener('click', async () => {
    movieTitleValue = searchInputElement.value;

    if (!movieTitleValue) {
        alert("Введите название фильма.");
        return;
    }

    spinner.style.display = "inline-block";

    try {
        const movie = await fetchData(movieTitleValue);

        if (movie.Response === "False") {
            toastBody.textContent = "Фильм не найден";
            toastHeader.classList.remove("bg-success");
            toastHeader.classList.add("bg-danger");
            toastBootstrap.show();
        } else {
            searchResultsContainer.innerHTML = '';

            const cardElementTemplate = `
            <div class="card" style="width: 18rem">
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title} movie poster" />
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">${movie.Plot}</p>
                    <div class="d-flex align-items-stretch">
                        <a href="#" class="btn btn-primary d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal" data-movie='${JSON.stringify(movie)}'>
                            Подробнее
                        </a>
                        <a href="#" class="btn btn-primary" id="add-fav-btn">
                            Добавить в Избранное
                        </a>
                    </div>
                </div>
            </div>`;

            searchResultsContainer.insertAdjacentHTML('beforeend', cardElementTemplate);
            addedMovie = movie;

            const addToFavButton = searchResultsContainer.querySelector('#add-fav-btn');
            addToFavButton.addEventListener('click', () => {
                if (!favMoviesList.some(favMovie => favMovie.Title === movie.Title)) {
                    favMoviesList.push(movie);
                    localStorage.setItem('favMovies', JSON.stringify(favMoviesList));
                    toastBody.textContent = "Фильм добавлен в избранное";
                    toastHeader.classList.remove("bg-danger");
                    toastHeader.classList.add("bg-success");
                    toastBootstrap.show();
                } else {
                    toastBody.textContent = "Фильм уже в избранном";
                    toastHeader.classList.remove("bg-success");
                    toastHeader.classList.add("bg-warning");
                    toastBootstrap.show(); 
                }
            });

            toastBody.textContent = "Фильм найден";
            toastHeader.classList.remove("bg-danger");
            toastHeader.classList.add("bg-success");
            toastBootstrap.show();
        }
    } catch (error) {
        alert("Ошибка при получении данных о фильме.");
    } finally {
        spinner.style.display = "none";
    }
});

// Обработчик события для открытия модального окна
modalElement.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget; // Кнопка, которая открыла модалку
    const movieData = JSON.parse(button.getAttribute('data-movie')); // Получаем данные о фильме из атрибута

    // Обновляем содержимое модального окна
    const moviePlotElement = document.querySelector('#moviePlot');
    const moviePosterElement = document.querySelector('#moviePoster');

    moviePlotElement.textContent = `Plot: ${movieData.Plot}`;
    moviePosterElement.src = movieData.Poster;
    moviePosterElement.alt = `${movieData.Title} movie poster`;
});






