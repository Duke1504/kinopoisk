const favMoviesList = JSON.parse(localStorage.getItem('favMovies')) || [];
const favMoviesContainer = document.querySelector('.fav-movies-container');

function renderFavMovies() {
    favMoviesContainer.innerHTML = '';

    favMoviesList.forEach((favMovie, index) => {
        const cardElementTemplate = `
        <div class="card" style="width: 20rem; margin: 10px;" data-card-id="${index}">
            <img
            src="${favMovie.Poster}"
            class="card-img-top"
            alt="${favMovie.Title} movie poster"
            />
            <div class="card-body">
                <h5 class="card-title">${favMovie.Title}</h5>
                <p class="card-text">${favMovie.Plot}</p>
                <div class="d-flex align-items-stretch">
                    <a
                    href="#"
                    class="btn btn-primary d-flex align-items-center more-info-button"
                    data-movie-index="${index}">
                    Подробнее
                    </a>
                    <a
                        href="#"
                        class="btn btn-danger remove-button"
                        >
                        Удалить из избранного
                    </a>
                </div>
            </div>
        </div>`;

        favMoviesContainer.insertAdjacentHTML('beforeend', cardElementTemplate);
    });
}

favMoviesContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-button')) {
        const movieIndex = event.target.closest('.card').dataset.cardId;
        favMoviesList.splice(movieIndex, 1);
        localStorage.setItem('favMovies', JSON.stringify(favMoviesList));
        renderFavMovies();
    }
});

favMoviesContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('more-info-button')) {
        const movieIndex = event.target.getAttribute('data-movie-index');
        openModalWithMovieDetails(favMoviesList[movieIndex]);
    }
});

function openModalWithMovieDetails(movie) {
    const modalTemplate = `
    <div class="modal fade" id="movieModal" tabindex="-1" aria-labelledby="movieModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="max-width: 600px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="movieModalLabel">${movie.Title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex align-items-start">
                    <img src="${movie.Poster}" alt="${movie.Title} Poster" class="img-fluid" style="width: 40%; margin-right: 15px;">
                    <div>
                        <p>${movie.Plot}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                </div>
            </div>
        </div>
    </div>`;

    const existingModal = document.getElementById('movieModal');
    if (existingModal) existingModal.remove();

    document.body.insertAdjacentHTML('beforeend', modalTemplate);

    const movieModal = new bootstrap.Modal(document.getElementById('movieModal'));
    movieModal.show();
}

renderFavMovies();
