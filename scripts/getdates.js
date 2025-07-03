// Select the elements
const yearSpan = document.querySelector("#currentyear");
const lastMod = document.querySelector("#lastModified");

// Get current year using Date object
const today = new Date();
yearSpan.textContent = today.getFullYear(); // Dynamically displays the copyright year

// Get last modified date of the document
lastMod.textContent = `Last Modified: ${document.lastModified}`;
