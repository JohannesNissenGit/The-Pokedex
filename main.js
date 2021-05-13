//https://pokeapi.co/
//"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png"

let PokemonArray = [];
let loadingCount = 0;
let barProgress = 0;
let Pokemondetails;
let currentPokemon;
let typeColorClass = 'green';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/ditto';
//const PokemonsList = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';



/**
 * loadAllPokemon(): fetches all pokemon data from server and puts them into PokemonArray
 */
async function loadAllPokemon() {
    for (let i = 1; i < 152; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        PokemonArray.push(responseAsJson);
        loadingCount = i;
        UpdateLoadingscreenAllPokemon();
    }
    console.log(PokemonArray);
}

/**
 * UpdateLoadingscreenAllPokemon(): displays load status of loadAllPokemon()
 */

function UpdateLoadingscreenAllPokemon() {
    if (loadingCount < 151) {

        document.getElementById('loadingStatusCount').innerHTML = '<h2>' + loadingCount + ' of 151 Pokemon loaded.</h2>';
        barProgress =  loadingCount / 151
    }
    if (loadingCount == 151) {
        document.getElementById('loadingStatusCount').innerHTML = '<h2>' + loadingCount + ' of 151 Pokemon loaded. </h2> <br> <h1> Opening Pokedex... </h1>';

        displayAllPokemon();

        setTimeout(() => {
            document.getElementById('loadingContainer').classList.add('d-none');
            document.getElementById('loadingContainer').classList.add('zminus100');
        }, 1000);
    }
}

/**
 * loadPokemon(): fetches current pokemon data from server
 */
async function loadPokemon() {
    let url = baseUrl;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    currentPokemon = responseAsJson;
    console.log(responseAsJson);
    displayCurrentPokemon(currentPokemon);

}

/**
 * displayCurrentPokemon: displays data of selected pokemon
 */
function displayCurrentPokemon(currentPokemon) {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonOrder').innerHTML = currentPokemon['order'];
    document.getElementById('pokemonImg').innerHTML = `<img src="${currentPokemon['sprites']['front_default']}" alt=""></img>`;
}

/**
 * displayAllPokemon: displays overview of all pokemon
 */
function displayAllPokemon() {
    for (let i = 0; i < PokemonArray.length; i++) {

        let name = PokemonArray[i]['name'];
        let id = PokemonArray[i]['id'];
        let img = PokemonArray[i]['sprites']['front_default'];
        BuildPokemonDetails(name, id, img);
        document.getElementById('pokemonListContainer').innerHTML += Pokemondetails;
    }
}

function BuildPokemonDetails(name, id, img) {
    Pokemondetails = `<div class="pokelistDetailsContainer ${typeColorClass}">
         <div class="pokelistTopDetails">  <b>#${id}</b> <img src="${img}" alt=""> <b>${name}</b>  <input type="checkbox" id="caught${id}" name="checkbox1" value="yes">
         <label for="checkbox1"> Caught it?</label><br> </div> 
        
         </div>`
}
