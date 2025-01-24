const apiBaseUrl = 'https://swapi.dev/api/people';
let currentPage = 1;
let characters = [];
let totalPages = 1;

let loader = document.getElementById('loader');
let characterList = document.getElementById('character-list');
let pagination = document.getElementById('pagination');
let modal = document.getElementById('character-modal');
let closeModal = document.getElementById('close-modal');

function fetchCharacters(page) {
    loader.style.display = 'block';
    fetch(apiBaseUrl + '/?page=' + page)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('API server is down');
            }
            return response.json();
        })
        .then(function(data) {
            characters = data.results;
            totalPages = Math.ceil(data.count / 10);  
            displayCharacters();
            displayPagination();
        })
        .catch(function(error) {
            alert('Failed to fetch data: ' + error.message);
        })
        .finally(function() {
            loader.style.display = 'none';
        });
}

function displayCharacters() {
    characterList.innerHTML = '';
    characters.forEach(function(character) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = '<h3>' + character.name + '</h3>';
        card.onclick = function() { openModal(character); };
        characterList.appendChild(card);
    });
}

function displayPagination() {
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.onclick = function() { changePage(i); };
        pagination.appendChild(pageButton);
    }
}

function changePage(page) {
    currentPage = page;
    fetchCharacters(page);
}

function openModal(character) {
    document.getElementById('modal-name').textContent = character.name;
    document.getElementById('modal-height').textContent = character.height;
    document.getElementById('modal-mass').textContent = character.mass;
    document.getElementById('modal-date-added').textContent = new Date(character.created).toLocaleDateString();
    document.getElementById('modal-films-count').textContent = character.films.length;
    document.getElementById('modal-birth-year').textContent = character.birth_year;

    modal.style.display = 'flex';
}

closeModal.onclick = function() {
    modal.style.display = 'none';
};

fetchCharacters(currentPage);
