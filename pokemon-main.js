
const poke_container = document.getElementById('poke_container');
const pokemons_number = 150;
const colors = {
	fire: '#FF0000',
	grass: '#399B37',
	electric: '#EEFF02',
	water: '#2B87CE',
	ground: '#644715',
	rock: '#d5d5d4',
	fairy: '#F7B9DC',
	poison: '#C028AC',
	bug: '#15D755',
	dragon: '#00FFF6',
	psychic: '#C682B3',
	flying: '#CECE5C',
	fighting: '#CD8F5E',
	normal: '#F8E4C4'
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
						<img class="d-block w-100" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
							pokemon.id
							}.png" alt="${name}" />
		</div>
		
        <div class="info">
            <span class="number">#${pokemon.id
								.toString()
								.padStart(3, '0')}
			</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

fetchPokemons();

