const yargs = require("yargs");
const axios = require("axios")

const weather = require("./weather/weather")

const geocode = require('./geocode/geocode')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true 
        },
        c: {
            demand: false,
            alias: 'city',
            describe: 'City to fetch weather for',
            string: true 
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAdress = encodeURIComponent(argv.a)
var encodedCity = encodeURIComponent(argv.c)

var geocodeURL= `https://nominatim.openstreetmap.org/search?street=${encodedAdress}&city=${encodedCity}&format=json`

axios.get(geocodeURL).then((response)=> {
    if (response.data.length === 0){
        throw new Error('Unable to find that address')
    }
    var lat = response.data[0].lat
    var lon = response.data[0].lon
    var weatherURL= `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    return axios.get(weatherURL)
}).then((response)=> {
    var temperature = response.data.current_weather.temperature
    console.log(`it's ${temperature}°C`)
    
}).catch((e)=>{
    if (e.code === 'ENOTFOUND'){
        console.log('Unable to connect to api server')
    }
    else {
        console.log(e.message)
    }
    
})