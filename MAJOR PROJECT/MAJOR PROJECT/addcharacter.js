// document.addEventListener('DOMContentLoaded', function() {
//     const characterForm = document.getElementById('characterForm');
//     document.getElementById('characterForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Get form values
//     const newCharacter = {
//         name: document.getElementById('name').value,
//         species: document.getElementById('species').value,
//         origin: document.getElementById('origin').value,
//         status: document.getElementById('status').value,
//         img_url: document.getElementById('img_url').value
//     };

//     // Store in localStorage (since we don't have a backend)
//     let characters = JSON.parse(localStorage.getItem('finalSpaceCharacters') || '[]');
//     characters.push(newCharacter);
//     localStorage.setItem("response",JSON.stringify(characters))

//     // Show success message
//     alert('Character added successfully!');

//     // Reset form
//     this.reset();

//     // Redirect to characters page
//     location.href = 'index.html#characters';
//  });

//     // Check if the form exists before adding the event listener
//     if (characterForm) {
//         characterForm.addEventListener('submit', function(event) {
//             event.preventDefault();

//             // Add error handling for form fields
//             const formFields = {
//                 name: document.getElementById('name'),
//                 species: document.getElementById('species'),
//                 origin: document.getElementById('origin'),
//                 status: document.getElementById('status'),
//                 img_url: document.getElementById('img_url')
//             };

//             // Validate that all fields exist
//             for (const [key, element] of Object.entries(formFields)) {
//                 if (!element) {
//                     console.error(`Missing form field: ${key}`);
//                     alert(`Error: ${key} field not found in the form`);
//                     return;
//                 }
//             }

//             // Get form values
//             const newCharacter = {
//                 name: formFields.name.value,
//                 species: formFields.species.value,
//                 origin: formFields.origin.value,
//                 status: formFields.status.value,
//                 img_url: formFields.img_url.value
//             };

//             try {
//                 // Store in localStorage
//                 let characters = JSON.parse(localStorage.getItem('finalSpaceCharacters') || '[]');
//                 characters.push(newCharacter);
//                 localStorage.setItem('finalSpaceCharacters', JSON.stringify(characters));

//                 // Show success message
//                 alert('Character added successfully!');

//                 // Reset form
//                 this.reset();

//                 // Redirect to characters page
//                 location.href = 'index.html#characters';
//             } catch (error) {
//                 console.error('Error saving character:', error);
//                 alert('Error saving character. Please try again.');
//             }
//         });
//     } else {
//         console.error('Character form not found');
//     }
// });
const formEl = document.getElementById("characterForm");

// Fetch characters from API
async function fetchCharacters() {
  const loadingElement = document.getElementById("loading");
  const gridElement = document.getElementById("charactersGrid");

  try {
    loadingElement.style.display = "block";
    gridElement.innerHTML = "";

    const finalSpaceCharacters = await fetch(
      "https://finalspaceapi.com/api/v0/character/"
    );
    const characters = await finalSpaceCharacters.json();

    loadingElement.style.display = "none";

    localStorage.setItem("finalSpaceCharacters", JSON.stringify(characters));

    // displayCharacters(characters);
  } catch (error) {
    loadingElement.textContent =
      "Error loading characters. Please try again later.";
    console.error("Error fetching characters:", error);
  }
}

let characters = JSON.parse(localStorage.getItem("finalSpaceCharacters")) || [];

// if (!Array.isArray(storedRecipe)) {
//   storedRecipe = [];
// }

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelectorAll("input");

  const obj = {};

  for (let items of input) {
    obj[items.name] = items.value;
    obj["id"] = characters.length + 1;
  }
  console.log("obj", obj);

  characters.push(obj);

  localStorage.setItem("finalSpaceCharacters", JSON.stringify(characters));

  formEl.reset();
});
