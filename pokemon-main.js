
const poke_container = document.getElementById('poke_container');
const pokemons_number = 150;
const colors = {
	fire: '#C00505',
	grass: '#39C01E',
	electric: '#EEFF02',
	water: '#2B87CE',
	ground: '#644715',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#C028AC',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#CECE5C',
	fighting: '#E6E0D4',
	normal: '#87ABCE'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	pokemonEl.style.backgroundColor = color;

    //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png
	const pokeInnerHTML = `
        <div class="img-container" >
			<div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel" data-bs="4000">
				<div class="carousel-inner" >
					<div class="carousel-item active" >
						<img class="d-block w-100" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
							pokemon.id
							}.png" alt="${name}" />
					</div>
					<div class="carousel-item">
						<img class="d-block w-100" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
											pokemon.id
											}.png" alt="${name}" />
					</div>
					<div class="carousel-item">
						<img class="d-block w-100" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
											pokemon.id
											}.png" alt="${name}">
					</div>
				</div>	
			</div>
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

fetchPokemons();

