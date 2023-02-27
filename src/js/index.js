const URL = 'https://pokeapi.co/api/v2/pokemon/'

function newCard(data, wrapper) {
    // Creating HTML Elements
    const card = document.createElement('div');
    const card__container = document.createElement('div')
    const card__title = document.createElement('h1');
    const card__types = document.createElement('div');
    const card__image = document.createElement('img');
    // Adding Data to HTML Elements
    card__title.innerText = data.name;
    card__types.innerText = 'type';
    card__image.src = data.sprites.front_default;
    // Styling HTML elements
    card.className = 'flex justify-between border-2 p-3';
    card__title.className = 'text-3xl';
    card__types.className = 'text-xl font-light';
    //Structuring HTML Elements
    card__container.append(card__title);
    card__container.append(card__types);
    card.append(card__container);
    card.append(card__image);
    wrapper.append(card);
}

async function getBatch(url) {
    const page_request = await fetch(url).then(res => res.json());
    const batch = [];
    for (let i = 0; i < page_request.results.length; ++i) {
        batch.push(fetch(page_request.results[i].url).then(res=>res.json()));
    }
    const data = await Promise.all(batch);

    for (let i = 0; i < data.length; ++i) {
        newCard(data[i], document.querySelector('#Pokedex'));
    }
}

getBatch(URL);