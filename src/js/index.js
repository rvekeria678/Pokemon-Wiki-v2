const URL = 'https://pokeapi.co/api/v2/pokemon/'

const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const pokemon__content = document.querySelector('#Pokedex');

let next_url = '', prev_url = '';

const type__colors = {
    normal: 'bg-normal',
    fire: 'bg-fire',
    water: 'bg-water',
    electric: 'bg-electric',
    grass: 'bg-grass',
    ice: 'bg-ice',
    fighting: 'bg-fighting',
    poison: 'bg-poison',
    ground: 'bg-ground',
    flying: 'bg-flying',
    psychic: 'bg-psychic',
    bug: 'bg-bug',
    rock: 'bg-rock',
    ghost: 'bg-ghost',
    dragon: 'bg-dragon',
    dark: 'bg-dark',
    steel: 'bg-steel',
    fairy: 'bg-fairy'
}

next.addEventListener('click', (event)=>{
    pokemon__content.innerText = '';
    getBatch(next_url);
});

prev.addEventListener('click', (event)=>{
    pokemon__content.innerText = '';
    getBatch(prev_url);
});

function newCard(data, wrapper) {
    // Creating HTML Elements
    const card = document.createElement('div');
    const card__container = document.createElement('div')
    const card__title = document.createElement('h1');
    const card__types = document.createElement('div');
    const card__image = document.createElement('img');
    const card__more = document.createElement('a');
    // Adding Data to HTML Elements
    card__title.innerText = data.name + ' #' + data.id.toString().padStart(4,'0');
    for (let i = 0; i < data.types.length; ++i) {
        const type = document.createElement('div');
        type.innerText = data.types[i].type.name;
        type.className = 'mr-3 my-2 border px-3 py-1 rounded-full w-auto text-center text-white font-semibold ' + type__colors[type.innerText];
        card__types.append(type);
    }
    card__image.src = data.sprites.front_default;
    card__more.innerText = 'Read More';
    // Styling HTML elements
    card.className = 'flex justify-between shadow rounded-2xl m-3 p-4 bg-white';
    card__title.className = 'text-3xl font-Phudu';
    card__types.className = 'text-xl font-light flex';
    card__more.className = 'text-sm md:hover:text-yellow-500 cursor-pointer';
    card__image.className = 'h-32';
    //Structuring HTML Elements
    card__container.append(card__title);
    card__container.append(card__types);
    card__container.append(card__more);
    card.append(card__container);
    card.append(card__image);
    wrapper.append(card);
}

async function getBatch(url) {
    const page_request = await fetch(url).then(res => res.json());
    next_url = page_request.next;
    prev_url = page_request.previous;
    buttonHandler(next_url, next);
    buttonHandler(prev_url, prev);
    const batch = [];
    for (let i = 0; i < page_request.results.length; ++i) {
        batch.push(fetch(page_request.results[i].url).then(res=>res.json()));
    }
    const data = await Promise.all(batch);

    for (let i = 0; i < data.length; ++i) {
        newCard(data[i], document.querySelector('#Pokedex'));
    }
}

function buttonHandler(url, btn) {
    if (url === null) {
        btn.disabled = true;
        btn.classList.add('opacity-50');
    } else {
        btn.disabled = false;
        btn.classList.remove('opacity-50');
    }
}

getBatch(URL);