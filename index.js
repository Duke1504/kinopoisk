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

    spinner.style.display = "inline-block"; // Показываем спиннер

    try {
        const movie = await fetchData(movieTitleValue);

        if (movie.Response === "False") { // Если фильм не найден
            toastBody.textContent = "Фильм не найден";
            toastHeader.classList.remove("bg-success");
            toastHeader.classList.add("bg-danger"); // Меняем цвет тостера на красный
            toastBootstrap.show(); // Показываем тостер
        } else {
            // Очищаем контейнер перед добавлением новой карточки
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

            // Обработчик для добавления в избранное
            const addToFavButton = searchResultsContainer.querySelector('#add-fav-btn');
            addToFavButton.addEventListener('click', () => {
                // Проверяем, существует ли фильм в избранных
                if (!favMoviesList.some(favMovie => favMovie.Title === movie.Title)) {
                    favMoviesList.push(movie); // Добавляем фильм в избранное
                    localStorage.setItem('favMovies', JSON.stringify(favMoviesList));
                    toastBody.textContent = "Фильм добавлен в избранное";
                    toastHeader.classList.remove("bg-danger");
                    toastHeader.classList.add("bg-success"); // Меняем цвет тостера на зелёный
                    toastBootstrap.show(); // Показываем тостер
                } else {
                    toastBody.textContent = "Фильм уже в избранном";
                    toastHeader.classList.remove("bg-success");
                    toastHeader.classList.add("bg-warning"); // Меняем цвет тостера на жёлтый
                    toastBootstrap.show(); // Показываем тостер
                }
            });

            // Отображаем тостер при успешном нахождении фильма
            toastBody.textContent = "Фильм найден";
            toastHeader.classList.remove("bg-danger");
            toastHeader.classList.add("bg-success"); // Меняем цвет тостера на зелёный
            toastBootstrap.show(); // Показываем тостер
        }
    } catch (error) {
        alert("Ошибка при получении данных о фильме.");
    } finally {
        spinner.style.display = "none"; // Скрываем спиннер после загрузки
    }
});







   


        document.addEventListener("click", function(event) {
        if (event.target && event.target.matches("[data-bs-toggle='modal']")) {
          const movieTitle = event.target.getAttribute("data-movie-title");
          const moviePlot = event.target.getAttribute("data-movie-plot");
          const moviePoster = event.target.getAttribute("data-movie-poster");
      
         
          document.querySelector("#exampleModalLabel").textContent = movieTitle;
          document.querySelector("#moviePlot").textContent = "Plot: " + moviePlot;
          document.querySelector("#moviePoster").src = moviePoster;
        }

})  







