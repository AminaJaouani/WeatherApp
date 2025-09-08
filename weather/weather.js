const request = require('request')

var getWeather = (lat,lon, callback) => {
request ({
    url : `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
    json: true 
    }, (error, response, body) => {
        if (error){
            callback("Unable to connect weather server")
        }
        else if (body.error === true){
            callback("unable to find temp")
        }
        else if (response.statusCode === 200) {
            callback(undefined,{
                temperature: body.current_weather.temperature
                }
            )
        }
    }
) 
}

module.exports.getWeather = getWeather