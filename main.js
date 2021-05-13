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

    if (PokemonArray.length < 1){
    for (let i = 1; i < 152; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        PokemonArray.push(responseAsJson);
        loadingCount = i;
        UpdateLoadingscreenAllPokemon();
    }
}
    console.log(PokemonArray);
}

/**
 * UpdateLoadingscreenAllPokemon(): displays load status of loadAllPokemon()
 */

function UpdateLoadingscreenAllPokemon() {
    if (loadingCount < 151) {

        document.getElementById('loadingStatusCount').innerHTML = '<h2>' + loadingCount + ' of 151 Pokemon loaded.</h2>';
        barProgress = loadingCount / 151
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
 * loadPokemon(): gets current pokemon data from PokemonArray
 */
function loadPokemon(i) {
    currentPokemon = PokemonArray[i-1];
    let name = currentPokemon['name'];
    let id = currentPokemon['id'];
    let img = currentPokemon['sprites']['front_default'];
    let height = currentPokemon['height']/10 + ' m' ;
    let weight = currentPokemon['weight']/10 + ' kg';
    let types = currentPokemon['types'] ;
    let hp = currentPokemon['stats'][0]['base_stat'] ;
    let atk = currentPokemon['stats'][1]['base_stat'] ;
    let def = currentPokemon['stats'][2]['base_stat'] ;
    let spd = currentPokemon['stats'][5]['base_stat'] ;

    BuildcurrentPokemon(name, id, img, height, weight, types, hp, atk, def, spd);
    displayCurrentPokemon(currentPokemon);


}

/**
 * displayCurrentPokemon: displays data of selected pokemon
 */
function displayCurrentPokemon(currentPokemon) {
    document.getElementById('pokedexEntryContainer').classList.remove('d-none');
    document.getElementById('pokedexEntryContainer').classList.remove('zminus100');
    document.getElementById('pokedexEntryContainer').classList.add('z10');
   
    console.log('html needed');
}

/**
 * CloseCurrentPokemon: hides displayed data of selected pokemon
 */
function CloseCurrentPokemon() {
    document.getElementById('pokedexEntryContainer').classList.add('d-none');
    document.getElementById('pokedexEntryContainer').classList.add('zminus100');
    document.getElementById('pokedexEntryContainer').classList.remove('z10');
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

/**
 * Buildfunctions: Build HTML pieces to display all / current pokemon
 * @param {string} name 
 * @param {number} id 
 * @param {url} img 
 */

function BuildPokemonDetails(name, id, img) {
    Pokemondetails = `<div class="pokelistDetailsContainer ${typeColorClass}">
         <div class="pokelistTopDetails" onclick="loadPokemon(${id})">  <b>#${id}</b> <img src="${img}" alt=""> <b>${name}</b>  
         </div>
         <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
  <label class="form-check-label" for="flexSwitchCheckDefault">Caught it?</label> </div>
         `
}

function BuildcurrentPokemon(name, id, img, height, weight, types, hp, atk, def, spd) {
document.getElementById('pokedexEntry').innerHTML = `
    <img src="${img}" alt="">
    <h1>${name}</h1>
    <div> <p> type1 type2 type3 </p></div>
    <div class="d-flex">
        <div>${height} <br>height</div>
        <div>${weight} <br>weight</div>
    </div>
    <h2>Base Stats</h2>
    <div class="d-flex">HP <div>${hp}</div></div>
    <div class="d-flex">ATK <div>${atk}</div></div>
    <div class="d-flex">DEF <div>${def}</div></div>
    <div class="d-flex">SPD <div>${spd}</div></div>
</div>`
}