// AgriTrack ZW - Weather API Module

// Open-Meteo is free to use and does not require an API key.
// If a production API needed a secret key, it should not be stored here
// because users could see it in the browser. Instead, it should be kept
// on a secure server.

const provinces = [
    {
        name: "Bulawayo",
        latitude: -20.1325,
        longitude: 28.6265
    },
    {
        name: "Harare",
        latitude: -17.8252,
        longitude: 31.0335
    },
    {
        name: "Manicaland",
        latitude: -18.9707,
        longitude: 32.6709
    },
    {
        name: "Mashonaland Central",
        latitude: -16.7640,
        longitude: 31.0794
    },
    {
        name: "Mashonaland East",
        latitude: -18.1783,
        longitude: 31.5519
    },
    {
        name: "Mashonaland West",
        latitude: -17.4851,
        longitude: 29.7889
    },
    {
        name: "Masvingo",
        latitude: -20.0637,
        longitude: 30.8277
    },
    {
        name: "Matabeleland North",
        latitude: -18.5333,
        longitude: 27.0000
    },
    {
        name: "Matabeleland South",
        latitude: -21.0500,
        longitude: 29.0000
    },
    {
        name: "Midlands",
        latitude: -19.4500,
        longitude: 29.8167
    }
];


// Get current weather for a specific location
async function getCurrentWeather(latitude, longitude) {

    try {

        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Weather request failed: ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error("Weather API error:", error);

        throw new Error(
            "Weather information failed to load. Can you please check your internet connection and try again."
        );
    }
}


// Get weather for all ten Zimbabwe provinces
async function getAllProvinceWeather() {

    try {

        const weatherRequests = provinces.map(province =>
            getCurrentWeather(
                province.latitude,
                province.longitude
            )
        );

        const weatherResults = await Promise.all(weatherRequests);

        return provinces.map((province, index) => ({
            name: province.name,
            weather: weatherResults[index]
        }));

    } catch (error) {

        console.error("Could not load province weather:", error);

        throw new Error(
            "Weather information for the provinces could not be loaded. Please check your internet connection."
        );
    }
}


// Export the functions so other JavaScript files can use them
export {
    getCurrentWeather,
    getAllProvinceWeather
};