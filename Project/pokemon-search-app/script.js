const pokemonID = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const spriteContainer = document.getElementById("sprite-container");
const types = document.getElementById("types");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const catchPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
    );
    const data = await res.json();

    // Set Pokémon info
    pokemonName.textContent = `${data.name[0].toUpperCase()}${data.name.slice(
      1
    )}`;
    pokemonID.innerHTML = `NO. ${data.id}`;
    weight.innerHTML = `WI: ${data.weight}`;
    height.innerHTML = `HI: ${data.height}`;
    spriteContainer.innerHTML = `
        <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
      `;

    // Set stats
    hp.innerHTML = `<span class="hp-text">HP</span>${data.stats[0].base_stat}`;
    attack.innerHTML = `<span>Attack: </span>${data.stats[1].base_stat}`;
    defense.innerHTML = `<span>Defense: </span>${data.stats[2].base_stat}`;
    specialAttack.innerHTML = `<span>Sp. Attack: </span>${data.stats[3].base_stat}`;
    specialDefense.innerHTML = `<span>SP. Defense: </span>${data.stats[4].base_stat}`;
    speed.innerHTML = `<span>Speed: </span>${data.stats[5].base_stat}`;

    // Set types
    types.innerHTML = data.types
      .map(
        (obj) => `${obj.type.name[0].toUpperCase()}${obj.type.name.slice(1)}`
      )
      .join("/");
  } catch (err) {
    resetDisplay();
    console.log(err);
  }
};

const resetDisplay = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  // reset stats
  pokemonName.textContent = "";
  pokemonID.innerHTML = "";
  types.innerHTML = "";
  height.innerHTML = "";
  weight.innerHTML = "";
  hp.innerHTML = "";
  attack.innerHTML = "";
  defense.innerHTML = "";
  specialAttack.innerHTML = "";
  specialDefense.innerHTML = "";
  speed.innerHTML = "";
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  catchPokemon();
});
