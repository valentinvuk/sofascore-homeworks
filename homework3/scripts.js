let page = 0;
let numOfPokePerSite = 0;
let favPoke = [];

const pokePerSite = () => window.innerHeight / 96 - 1;

const fetchPokemons = async function (offset) {
  await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${numOfPokePerSite}&offset=${
      offset * numOfPokePerSite
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      data.results.map((pokemon) => {
        //console.log(pokemon);
        showPokemon(pokemon);
      });
    })
    .catch((err) => console.log("error"));
};

const showPokemon = async (pokemon) => {
  await fetch(pokemon.url)
    .then((res) => res.json())
    .then((pokeInfo) => {
      let div = document.createElement("div");
      let page = document.getElementById("poke-wrapper");
      div.className = `pokemon-container ${pokeInfo.types[0].type.name}`;
      div.id = pokeInfo.name;
      div.innerHTML = `<div class="img-wrapper"><img src="${pokeInfo.sprites.front_default}" alt="${pokeInfo.name}"></div><h3>${pokeInfo.name}</h3><p><b>Main type</b>: <span>${pokeInfo.types[0].type.name}</span></p><p><b>XP</b>: <span>${pokeInfo.base_experience}</span></p><button id="info-${pokeInfo.name}" class="delete-button" 
      >Info</button><button onclick="removePokemon(${pokeInfo.name})" class="delete-button">Delete</button>`;
      setTimeout(() => {
        let info = document.getElementById(`info-${pokeInfo.name}`);
        //console.log(info);
        info.addEventListener("click", () => infoPokemon(pokeInfo));
      }, 100);
      page.appendChild(div);
    });
};

const infoPokemon = async function (pokeInfo) {
  console.log(pokeInfo);
  let infoDiv = document.createElement("div");
  infoDiv.className = "info-modal";
  infoDiv.id = "modal";
  infoDiv.innerHTML = `<div class="info-container ${
    pokeInfo.types[0].type.name
  }">
  <div class="info-row"><img src="${pokeInfo.sprites.front_default}" alt="${
    pokeInfo.name
  }">
  <h1>${
    pokeInfo.name
  }<br /><span><b>Character: </b><span id="description">Loading...</span></span><br /><span><b>Type:</b> ${
    pokeInfo.types[0].type.name
  }${
    pokeInfo.types.length > 1 ? ", " + pokeInfo.types[1].type.name : ""
  }</span></h1><button id="removeModal">X</button></div>
  <div class="info-row divider"><h2>Stats</h2></div>
  <div class="info-row content"><h3><b>HP:</b> ${
    pokeInfo.stats[0].base_stat
  }</h3><h3><b>Attack:</b> ${
    pokeInfo.stats[1].base_stat
  }</h3><h3><b>Defense:</b> ${
    pokeInfo.stats[2].base_stat
  }</h3><h3><b>Speed:</b> ${pokeInfo.stats[3].base_stat}</h3></div>
  <div class="info-row favorites"><h2 id="favoriteButton">Add to favourites</h2></div>
  </div>`;
  setTimeout(() => {
    let remove = document.getElementById(`removeModal`);
    remove.addEventListener("click", () => removeModal());
    let favorite = document.getElementById("favoriteButton");
    favorite.addEventListener("click", () => {
      favPoke.push(pokeInfo);
    });
  }, 100);
  document.body.prepend(infoDiv);
  await fetch(
    `https://pokeapi.co/api/v2/characteristic/${
      pokeInfo.id > 30 ? parseInt(pokeInfo.id % 30, (radix = 10)) : pokeInfo.id
    }/`
  )
    .then((res) => res.json())
    .then((data) => {
      let spanDesc = document.getElementById("description");
      spanDesc.textContent = data.descriptions[2].description;
    });
};

const favoriteList = (pokeName) => {
  console.log(pokeName);
};

const removeModal = () => {
  document.getElementById("modal").remove();
};

const removePokemon = (div) => {
  let id = div.id;
  let pokemonToDelete = document.getElementById(id);
  pokemonToDelete.remove();
  console.log("removed " + id);
};

const onPageClick = (move) => {
  if (move === 0) {
    if (page > 0) {
      page -= 1;
      document.querySelectorAll(".pokemon-container").forEach((e) => {
        e.classList.add("fade-out");
        setTimeout(() => e.remove(), 500);
      });
      setTimeout(() => fetchPokemons(page), 500);
    }
  } else {
    page += 1;
    document.querySelectorAll(".pokemon-container").forEach((e) => {
      e.classList.add("fade-out");
      setTimeout(() => e.remove(), 500);
    });
    setTimeout(() => fetchPokemons(page), 500);
  }
};

const searchPokemon = async (pokemon) => {
  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then((res) => res.json())
    .then((data) => {
      infoPokemon(data);
    });
};

setTimeout(() => {
  let search = document.getElementById("search-button");
  search.addEventListener("click", () => {
    let value = "" + document.getElementById("searchPokemon").value;
    searchPokemon(value.toLowerCase());
  });
  let enterInput = document.getElementById("searchPokemon");
  enterInput.addEventListener("keyup", () => {
    if (event.keyCode === 13) search.click();
  });
  let favoriteButton = document.getElementById("favorite-button");
  favoriteButton.addEventListener("click", () => {
    document.querySelectorAll(".pokemon-container").forEach((e) => {
      e.classList.add("fade-out");
      setTimeout(() => e.remove(), 500);
    });
    favPoke.map((pokeInfo) => {
      let div = document.createElement("div");
      let page = document.getElementById("poke-wrapper");
      div.className = `pokemon-container ${pokeInfo.types[0].type.name}`;
      div.id = pokeInfo.name;
      div.innerHTML = `<div class="img-wrapper"><img src="${pokeInfo.sprites.front_default}" alt="${pokeInfo.name}"></div><h3>${pokeInfo.name}</h3><p><b>Main type</b>: <span>${pokeInfo.types[0].type.name}</span></p><p><b>XP</b>: <span>${pokeInfo.base_experience}</span></p><button id="info-${pokeInfo.name}" class="delete-button" 
        >Info</button><button onclick="removePokemon(${pokeInfo.name})" class="delete-button">Delete</button>`;
      setTimeout(() => {
        let info = document.getElementById(`info-${pokeInfo.name}`);
        //console.log(info);
        info.addEventListener("click", () => infoPokemon(pokeInfo));
      }, 100);
      page.appendChild(div);
    });
  });
}, 100);

numOfPokePerSite = pokePerSite();
fetchPokemons(page);
