// getting the current year and formatting it as YYYY-MM-DD
const currentyear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentyear;

document.getElementById("lastmodified").textContent = "last modified: " + document.lastModified;