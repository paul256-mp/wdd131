// Function to calculate wind chill
function calculateWindChill(temp, windSpeed) {
  return 35.74 + 0.6215 * temp - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temp * Math.pow(windSpeed, 0.16);
}

// Function to update footer with current year and last modified date
function updateFooter() {
  const currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;

  const lastModified = document.lastModified;
  document.getElementById('last-modified').textContent = lastModified;
}

// Function to update weather information
function updateWeather() {
  const temperature = 78; // Static temperature value in °F
  const windSpeed = 5; // Static wind speed value in mph

  // Display temperature and wind speed
  document.getElementById('temperature').textContent = temperature;
  document.getElementById('wind-speed').textContent = windSpeed;

  // Calculate and display wind chill if conditions are met
  let windChill = "N/A";

  if (temperature <= 50 && windSpeed > 3) {
    const calculatedWindChill = calculateWindChill(temperature, windSpeed);
    windChill = `${Math.round(calculatedWindChill)}°F`;
  }

  document.getElementById('wind-chill').textContent = windChill;
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  updateFooter();
  updateWeather();
});