// script.js

// Data film - bisa kamu ganti dengan data dari API atau database
const films = [
    {
        title: "Avengers: Endgame",
        description: "The Avengers assemble to reverse the damage caused by Thanos in the previous film.",
        imageUrl: "https://example.com/avengers.jpg",
        watchLink: "https://www.example.com/avengers-endgame"
    },
    {
        title: "The Lion King",
        description: "A young lion prince flees his kingdom only to learn the true meaning of responsibility.",
        imageUrl: "https://example.com/lion-king.jpg",
        watchLink: "https://www.example.com/the-lion-king"
    },
    {
        title: "Spider-Man: No Way Home",
        description: "Spider-Man's identity is revealed, causing a crisis that sends him on a multi-dimensional adventure.",
        imageUrl: "https://example.com/spiderman.jpg",
        watchLink: "https://www.example.com/spiderman-no-way-home"
    },
    {
        title: "Inception",
        description: "A thief who enters the dreams of others to steal secrets from their subconscious is given a chance to have his criminal record erased.",
        imageUrl: "https://example.com/inception.jpg",
        watchLink: "https://www.example.com/inception"
    }
];

const apiBaseUrl = "https://xvidapi.com/api.php";
let pageLimit = 12;

async function get_AV(page=1,category=0){
    const url = `${apiBaseUrl}/provide/vod?ac=detail&t=${category}&pagesize=${pageLimit}&pg=${page}&at=json`
    try {
        window.document.body.style.cursor = 'wait';
        const response = await fetch(url);

        const data = await response.json();
        displayAV(data.list,'film-list');

        const button_container = document.getElementById('next-prev-button');
        const cat = document.getElementById('category-select').value;
        button_container.innerHTML = `
                <button onclick="get_AV(${page-1},${cat})" style="padding: 5px; padding-left: 20px; padding-right: 20px;">Previous</button>
                <label style="font-size:12px">page : ${data.page} / ${data.pagecount}</label>
                <button onclick="get_AV(${page+1},${cat})" style="padding: 5px; padding-left: 20px; padding-right: 20px;">Next</button>
                <br>
                <div style="width:100%; text-align: right">
                    <button onclick="gotoPage()" style="padding: 5px; padding-left: 20px; padding-right: 20px; margin-top:10px;">goto</button>
                    <input id="gotoNumber" type="number" style="padding:5px; width:60px" value=${page}><label style="font-size:12px"> of ${data.pagecount} page
                </div>`
    } catch (error) {
        console.error("Error fetching search results:", error);
    } finally {
        window.document.body.style.cursor = 'default';
    }
}


function gotoPage(){
    const goto = document.getElementById('gotoNumber').value;
    const category = document.getElementById('category-select').value;
    get_AV(goto,category);
}

function displayAV(AV_Films, gridId){
    const filmList = document.getElementById(gridId);
    filmList.innerHTML = ''; // Clear the current content

    AV_Films.forEach(film => {
        const filmCard = document.createElement('div');
        filmCard.classList.add('film-card');

        filmCard.innerHTML = `
            <img src="${film.thumb_url}" alt="">
            <div class="card-content">
                <h3>${film.name}</h3>
                <p><b>Cast : </b>${film.actor} <br> <b>Year :</b> ${film.year} <br> <b>duration :</b> ${film.time} <br> <b>quality :</b> ${film.quality}</p>
                <a href="${film.episodes.server_data.Full.link_embed}" target="_blank">Tonton Sekarang</a>
            </div>
        `;

        filmList.appendChild(filmCard);
    });

}

// Fungsi untuk menampilkan film dalam bentuk card
function displayFilms(films) {
    const filmList = document.getElementById('film-list');
    filmList.innerHTML = ''; // Clear the current content

    films.forEach(film => {
        const filmCard = document.createElement('div');
        filmCard.classList.add('film-card');

        filmCard.innerHTML = `
            <img src="${film.imageUrl}" alt="${film.title}">
            <div class="card-content">
                <h3>${film.title}</h3>
                <p>${film.description}</p>
                <a href="${film.watchLink}" target="_blank">Tonton Sekarang</a>
            </div>
        `;

        filmList.appendChild(filmCard);
    });
}

// Fungsi pencarian film
function searchFilm() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredFilms = films.filter(film => 
        film.title.toLowerCase().includes(query) || 
        film.description.toLowerCase().includes(query)
    );
    displayFilms(filteredFilms);
}

// Tampilkan film ketika halaman dimuat
window.onload = function() {
    get_AV(1);
};

function filterFilmCategory() {
    const category = document.getElementById('category-select').value;

    get_AV(1,category);
}
