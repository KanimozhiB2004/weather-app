document.getElementById('getWeatherButton').addEventListener('click', async function() {
    const city = document.getElementById('cityInput').value;

    const apiKey = '7d5e74e7b112e34001dc87b79a2fc7c3'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
    try {
        const myurl = await fetch(url);  
        const details = await myurl.json(); 
        console.log(details)
   
        if (details.cod === '404'
            
        ){ 
        
            document.getElementById('weatherResult').innerHTML = `
                <h2>City not found!</h2>
                <p>Temperature: 0°C</p>
                <p>Weather: N/A</p>
                <p> <img src="humidity.png" alt="" />Humidity: 0%</p>
                <p><img src="wind.png" alt="" />Wind Speed: 0 m/s</p>
            `;
        } else {
            const weather = details.weather[0].main;
            let emoji = '';

            
            switch(weather) {
                case 'Clear':
                    emoji = '☀️';  
                    break;
                case 'Clouds':
                    emoji = '☁️';  
                    break;
                case 'Rain':
                    emoji = '🌧️';  
                    break;
                case 'Snow':
                    emoji = '❄️';  
                    break;
                case 'Thunderstorm':
                    emoji = '⛈️';  
                    break;
                case 'Drizzle':
                    emoji = '🌦️';  
                    break;
                case 'Mist':
                case 'Fog':
                    emoji = '🌫️';  
                    break;
                default:
                    emoji = '🌡️';  
            }

            
            document.getElementById('weatherResult').innerHTML = `
                <h2>${details.name}, ${details.sys.country}</h2>
                <p>${emoji} ${weather}</p>
                <p>Temperature: ${details.main.temp}°C</p>
                <p><img src="humidity.png" alt="" />Humidity: ${details.main.humidity}%</p>
                <p> <img src="wind.png" alt="" />Wind Speed: ${details.wind.speed} m/s</p>
            `;
            
        }
        // document.getElementById('cityInput').value="";
    } catch (error) {
        // Handle any errors network failures
        document.getElementById('weatherResult').innerHTML = `
            <h2>Error fetching weather data!</h2>
            <p>Temperature: 0°C</p>
            <p>Weather: N/A</p>
            <p>Humidity: 0%</p>
            <p>Wind Speed: 0 m/s</p>
        `;
    }
});