const request = require('request')

var geocodeAddress = (address, city, callback)=>{
    var encodedAdress = encodeURIComponent(address)
    var encodedCity = encodeURIComponent(city)

    request({
    url: `https://nominatim.openstreetmap.org/search?street=${encodedAdress}&city=${encodedCity}&format=json`,
    headers: {
        //in between brackets, please add your own email
        "User-Agent": "my-weather-app/1.0 ()"
    },
    json: true
}, (error, response, body) => {
    if ( error) {
        callback("Unable to connect to geoloserver")
    }
    else if(!body[0]){
        callback("Unable to find that address")
    }
    else if ( response.statusCode === 200) {
        callback(undefined, {
            latitude : body[0].lat,
            longitude : body[0].lon
        })
    }
})
}

module.exports.geocodeAddress = geocodeAddress