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
                        <a href="#" class="btn btn-primary d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal" id="more-info-btn">
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

            const modalTemplate = `
            <div class="modal fade" id="movieModal" tabindex="-1" aria-labelledby="movieModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="max-width: 600px;"> <!-- Устанавливаем меньшую ширину модального окна -->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="movieModalLabel">${movie.Title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex align-items-start">
                            <img src="${movie.Poster}" alt="${movie.Title} Poster" class="img-fluid" style="width: 40%; margin-right: 15px;"> <!-- Изображение занимает 40% ширины -->
                            <div>
                                <p>${movie.Plot}</p> <!-- Описание располагается справа от изображения -->
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>`;

            document.body.insertAdjacentHTML('beforeend', modalTemplate);

            const movieModal = new bootstrap.Modal(document.getElementById('movieModal'));
            const moreInfoButton = searchResultsContainer.querySelector('#more-info-btn');
            moreInfoButton.addEventListener('click', () => {
                movieModal.show();
            });


            
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



    
    
    

   








