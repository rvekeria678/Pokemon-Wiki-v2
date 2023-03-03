const URL = 'https://pokeapi.co/api/v2/pokemon/'

const search = document.querySelector('#search');
const input = document.querySelector('#input');

const next = document.querySelectorAll('.next');
const prev = document.querySelectorAll('.prev');

const back = document.querySelector('#back');
const pokemon__content = document.querySelector('#Pokedex');

const main__content = document.querySelector('#MainContent');
const side__content = document.querySelector('#SideContent');

side__content.style.display = 'none';

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

input.addEventListener('keypress', (event)=>{
    if (event.key == 'Enter'){
        search.click();
    }
});

input.addEventListener("click", (event)=>{
    input.placeholder = 'Pokémon Name / ID"';
    input.select();
});

search.addEventListener('click', (event)=>{
    getPokemon(`${URL}${input.value.toLowerCase()}`).then(data=>{
        generateSidePage(data);
        main__content.style.display = 'none';
        side__content.removeAttribute("style");
        input.innerText = '';
    });
});

next.forEach(el=>{
    el.addEventListener('click',(event)=>{
        pokemon__content.innerText = '';
        getBatch(next_url);
    });
});
prev.forEach(el=>{
    el.addEventListener('click', (event)=>{
        pokemon__content.innerText = '';
        getBatch(prev_url);
    });
});

back.addEventListener('click', (event)=>{
    side__content.style.display = 'none';
    main__content.removeAttribute("style");
});

function newCard(data, wrapper) {
    // Creating HTML Elements
    const card = document.createElement('div');
    const card__container = document.createElement('div')
    const card__title = document.createElement('h1');
    const card__types = document.createElement('div');
    const card__image = document.createElement('img');
    const card__more = document.createElement('h1');
    // Adding Data to HTML Elements
    card__title.innerText = data.name + ' #' + data.id.toString().padStart(4,'0');
    data.types.forEach((types)=>{
        const type = document.createElement('div');
        type.innerText = types.type.name;
        type.className = 'mr-3 my-2 border px-3 py-1 rounded-full w-auto text-center text-white font-semibold ' + type__colors[type.innerText];
        card__types.append(type);
    });
    card__image.src = data.sprites.front_default;

    // Side Content Handler
    card__more.innerText = 'Read More';
    card.addEventListener('click', (event)=> {
        side__content.removeAttribute("style");
        main__content.style.display = 'none';
        generateSidePage(data);
    });
    // Styling HTML elements
    card.className = 'flex justify-between shadow rounded-2xl m-3 p-4 bg-white md:hover:bg-indigo-400 duration-300 cursor-pointer';
    card__title.className = 'text-3xl font-Phudu';
    card__types.className = 'text-xl font-light flex';
    card__more.className = 'text-lg font-bold font-Phudu text-white invisible';
    card.addEventListener('mouseenter', (event)=> {
        card__more.classList.remove('invisible');
        card__title.classList.add('md:text-white');
        card__image.classList.add('md:animate-bounce');
    });
    card.addEventListener('mouseleave', (event)=> {
        card__more.classList.add('invisible');
        card__title.classList.remove('md:text-white');
        card__image.classList.remove('md:animate-bounce');
 
    });
    card__image.className = 'h-32';
    //Structuring HTML Elements
    card__container.append(card__title);
    card__container.append(card__types);
    card__container.append(card__more);
    card.append(card__container);
    card.append(card__image);
    wrapper.append(card);
}

function generateSidePage(data) {
    console.log(data);
    const side__image = document.querySelector('#side--img');
    const side__title = document.querySelector('#side--title');
    const side__type = document.querySelector("#side--type");
    const side__stats = document.querySelector('#side--stats');
    const weight = document.querySelector('#weight');
    const height = document.querySelector('#height');

    side__type.innerText = '';
    side__stats.innerText = '';

    side__image.src = data.sprites.front_default;
    side__title.innerText = data.name;

    data.types.forEach((types)=>{
        const type = document.createElement('div');
        type.innerText = types.type.name;
        type.className = 'my-2 border px-6 py-2 font-semibold rounded-full text-center text-white font-semibold ' + type__colors[type.innerText];
        side__type.append(type);
    })

    data.stats.forEach((stats)=>{
        const stat = document.createElement('li');
        const stat_name = document.createElement('h2');
        const stat_value = document.createElement('h2');
        stat_name.innerText = stats.stat.name;
        stat_value.innerText = stats.base_stat;
        stat.className = 'flex justify-between text-white font-semibold font-Phudu w-1/2 text-xl mx-auto';
        stat.append(stat_name);
        stat.append(stat_value);
        side__stats.append(stat);
    });

    weight.innerText = 'weight: ' + data.weight + 'kg';
    height.innerText = 'height: ' + data.height + 'm';
}

async function getBatch(url) {
    const page_request = await fetch(url).then(res => res.json());
    next_url = page_request.next;
    prev_url = page_request.previous;
    buttonHandler(next_url, next);
    buttonHandler(prev_url, prev);
    const batch = [];

    page_request.results.forEach((r)=>{
        batch.push(fetch(r.url).then(res=>res.json()));
    });
    const data = await Promise.all(batch);

    data.forEach((d)=>{
        newCard(d, document.querySelector('#Pokedex'));
    });
}

async function getPokemon(url) {
    return await fetch(url).then(res => res.json());
}

function buttonHandler(url, btn) {
    if (url === null) {
        btn.forEach(el=>{
            el.disabled = true;
            el.classList.add('opacity-50');
        });
    } else {
        btn.forEach(el=>{
            el.disabled = false;
            el.classList.remove('opacity-50');
        });
    }
}

getBatch(URL);