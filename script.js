const pokemonRequested = 1025;
var pokedex = {};

window.onload = async function() {
    for (let i = 1; i <= pokemonRequested; i++) {
        await getPokemon(i);

        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").append(pokemon);
    }
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonTypes = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];
    let pokemonWeight = pokemon["weight"];
    let pokemonHeight = pokemon["height"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    console.log(pokemonDesc);

    let flavorTextEntry = pokemonDesc["flavor_text_entries"].find(entry => entry.language.name === "en");
    let pokemonDescText = flavorTextEntry ? flavorTextEntry["flavor_text"] : "No description available";

    pokedex[num] = {
        "name": pokemonName,
        "img": pokemonImg,
        "types": pokemonTypes,
        "desc": pokemonDescText,
        "weight": pokemonWeight,
        "height": pokemonHeight
    };
}

function updatePokemon() {
    const pokemon = pokedex[this.id];

    document.getElementById("pokemon-img").src = pokemon["img"];

    // Clears the Types in the box 
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    // Updates the types shown
    let types = pokemon["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]);
        typesDiv.append(type);
    }

    // Update the description
    document.getElementById("pokemon-description").innerText = pokemon["desc"];

    // Update weight/height boxes
    document.getElementById("pokemon-weight").innerText = `${pokemon["weight"] / 10} kg`; // Convert to kg
    document.getElementById("pokemon-height").innerText = `${pokemon["height"] / 10} m`;  // Convert to meters
}
