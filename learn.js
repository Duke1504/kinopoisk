// const person = {
//     "a b": 1,
//     temp: 36.6,
//     a_b: 3
// }

// console.log(person["a b"])
// console.log(person.a_b)



// let numbers = [1, 2 ,3]
// console.log(numbers[2]);
// console.log(numbers.at(-2));
// console.log(numbers.pop(2));

// const arr = [10, 20, 30, 40, 50]
// // console.log(arr.slice(1, 4));

// arr.splice(3, 0, 100)
// console.log(arr);


// const numbers = [1, 2, 3, 4, 5]

// const cubesnumbersFn = numbers.map(numbers => numbers ** 3)

// console.log(cubesnumbersFn);


// console.log(localStorage.getItem('dateNow'));
// localStorage.setItem('myBirthday', '15.04.2002')

// const phoneNumbers = ['998994323252', '337010107']
// localStorage.setItem('phoneNumber', phoneNumbers)

// const myData = {
//     age: 22,
//     sex: 'male',
//     hobbys: ['football', 'driving']
// }

// localStorage.setItem('myData', JSON.stringify(myData))


// let myDataJSON = localStorage.getItem('myData')
// let myPasrsedData = JSON.parse(myDataJSON)
// console.log(myPasrsedData.hobbys[0]);
 


// console.log(localStorage.key(0));

// const print = console.log

// for(let elem of [1, 2, 3]) {
//     console.log(elem)
// }

// let arr = [10, 20, 30]

// for(let i = 0; i < arr.length; i++) {
//     print(arr[i])
// }

// [100, 200, 300].forEach((num) => {
//     print(num)
// })

// const studentName = 'Ayubkhan'

// const strikeElementString = `<s>${studentName}</s>`

// print(strikeElementString)

// document.body.insertAdjacentHTML('beforeend', strikeElementString)

// const marqueeElement = document.createElement('marquee')

// marqueeElement.textContent = studentName

// document.body.append(marqueeElement)

// console.log(searchResultsContainer.children)


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
