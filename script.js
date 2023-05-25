// Получить все элементы, с которыми будем работать
const input = document.querySelector('#find-book');
const addButton = document.querySelector('#add-book');
const bookList = document.querySelector('#book-list ul');
const authorFilter = document.querySelector('#author-filter');
const genreFilter = document.querySelector('#genre-filter');
const applyFiltersButton = document.querySelector('#filters button');
const findBookButton = document.querySelector('#find-book');


// Функция для добавления книги в массив и на страницу
function addBookToLibrary() {
    const title = prompt('Введите название книги:');
    const author = prompt('Введите автора книги:');
    const genre = prompt('Введите жанр книги:');
    const newBook = {title, author, genre};
    // Добавляем объект в общий массив и приравниваем фильтрующую выборку новому массиву, что снимет фильтрацию
    originalLibrary.push(newBook);
    myLibrary = originalLibrary.slice();
    render();
    // Сохраняем новый массив в локальное хранилище
    saveState();
}

// Функция для удаления книги из массива и со страницы
function removeBookFromLibrary(index) {
    // Одновременно удаляем объект из общего массива данных и из фильтрующей выборки
    originalLibrary.splice(index, 1);
    myLibrary.splice(index, 1);
    render();
    // Сохраняем новый массив в локальное хранилище
    saveState();
}

// Функция для отображения всех книг на странице
function render() {
    bookList.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const li = document.createElement('li');
        const title = document.createElement('h3');
        const author = document.createElement('p');
        const genre = document.createElement('p');
        const removeButton = document.createElement('button');

        title.textContent = book.title;
        author.textContent = book.author;
        genre.textContent = book.genre;
        removeButton.textContent = 'Удалить';

        removeButton.addEventListener('click', () => removeBookFromLibrary(index));

        li.appendChild(title);
        li.appendChild(author);
        li.appendChild(genre);
        li.appendChild(removeButton);

        bookList.appendChild(li);
    });
}

function applyFilters() {
    const authorFilterValue = authorFilter.value.toLowerCase();
    const genreFilterValue = genreFilter.value.toLowerCase();
    let searchResult = [];
    if (authorFilterValue.trim() === '' && genreFilterValue.trim() === '') {
        // Если введена пустая строка, отображаем все книги
        searchResult = originalLibrary;
    } else {
        // Применяем фильтры к исходному массиву
        searchResult = originalLibrary.filter(book => book.author.toLowerCase().includes(authorFilterValue) && book.genre.toLowerCase().includes(genreFilterValue));
    }
    // Сохраняем результат фильтрации в myLibrary
    myLibrary = searchResult;
    render();
}

// Тестовые данные книг
const exampleData = [
    {
        title: 'Мастер и Маргарита',
        author: 'Михаил Булгаков',
        genre: 'Роман'
    },
    {
        title: '1984',
        author: 'Джордж Оруэлл',
        genre: 'Роман'
    },
    {
        title: 'Преступление и наказание',
        author: 'Федор Достоевский',
        genre: 'Роман'
    },
    {
        title: 'Маленький принц',
        author: 'Антуан де Сент-Экзюпери',
        genre: 'Философский роман'
    }
];
// Создаем переменную для исходного массива
// Если в локальном хранилище имеются данные, загружаем их, иначе тестовые данные
let originalLibrary = loadState() ?? exampleData;
// Копируем массив для дальнейшей работы
let myLibrary = originalLibrary.slice();


// Функция для поиска книги по названию
function findBook() {
    const searchQuery = input.value.toLowerCase();
    let searchRes = [];
    if (searchQuery.trim() === '') {
        // если введена пустая строка, отображаем все книги
        searchRes = originalLibrary;
    } else {
        searchRes = originalLibrary.filter(book => book.title.toLowerCase().includes(searchQuery));
    }
    myLibrary = searchRes;
    render();
}

function loadState() {
    // Получение данных из локального хранилища
    const savedData = localStorage.getItem('data')
    // Если данные присутствуют, спарсить строку JSON вернуть их в виде массива, иначе false
    return savedData ? JSON.parse(savedData) : null;
}
function saveState() {
    // Преобразуем массив в string JSON и записываем в локальное хранилище
    localStorage.setItem('data', JSON.stringify(originalLibrary));
}

// Назначить обработчики событий на кнопки
addButton.addEventListener('click', addBookToLibrary);
applyFiltersButton.addEventListener('click', applyFilters);
//findBookButton.addEventListener('click', findBook);

render(); // вызов функции для отображения книг на странице

   