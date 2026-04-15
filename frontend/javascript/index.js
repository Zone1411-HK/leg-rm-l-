let movies = [];

document.addEventListener('DOMContentLoaded', () => {
    generate();
    document.getElementById('gorm').addEventListener('change', details);
});

async function generate() {
    const response = await GetMethodFetch('/api/movies');
    movies = response.movies;
    const select = document.getElementById('gorm');

    for (const movie of movies) {
        const option = document.createElement('option');
        option.innerText = movie.title;
        option.value = movie.id;

        select.appendChild(option);
    }
}

function details() {
    let div = document.getElementById('remszletek');

    let j = 0;
    while (this.value != movies[j].id) {
        j++;
    }

    div.innerText = `Rendező: ${movies[j].director}\nÉv: ${movies[j].release_year}\nMűfaj: ${movies[j].genre}\nRating: ${movies[j].rating}`;
}

async function GetMethodFetch(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GET hiba: ${response.status} ( ${response.statusText} )`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`GET hiba: ${error.message}`);
    }
}
