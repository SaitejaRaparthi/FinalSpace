// let characters = JSON.parse(localStorage.getItem("finalSpaceCharacters")) || [];

// Show active section based on hash
function showSection() {
  const sections = document.querySelectorAll(".section");
  const hash = location.hash || "#home";

  sections.forEach((section) => {
    section.classList.remove("active");
    if (section.id === hash.slice(1)) {
      section.classList.add("active");
    }
  });

  if (hash === "#characters") {
    let characters =
      JSON.parse(localStorage.getItem("finalSpaceCharacters")) || [];
    displayCharacters(characters);
  }
}

// Display characters in grid
function displayCharacters(characters) {
  const grid = document.getElementById("charactersGrid");

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.className = "character-card";

    card.innerHTML = `
            <img src="${character.img_url}" alt="${
      character.name
    }" class="character-image" 
                onerror="this.src='https://via.placeholder.com/300x400?text=Image+Not+Found'">
            <div class="character-info">
                <h3 class="character-name">${character.name}</h3>
                <p class="character-details">Species: ${character.species}</p>
                <p class="character-details">Origin: ${
                  character.origin || "Unknown"
                }</p>
               <p class="character-details">Status: ${character.status}</p>
            </div>
        `;

    grid.appendChild(card);
  });
}

// Event listeners
addEventListener("hashchange", showSection);
addEventListener("load", showSection);
