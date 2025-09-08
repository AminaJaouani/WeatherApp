const yargs = require("yargs");

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

geocode.geocodeAddress(argv.a,argv.c, (errorMessage, result) => {
    if (errorMessage){
        console.log(errorMessage)
    }
    else {
        weather.getWeather(result.latitude, result.longitude, (errorMessage, weatherResult) => {
            if (errorMessage){
                console.log(errorMessage)
            }
            else {
                console.log(`It's currently ${weatherResult.temperature}°C`)
            }
        })
    }
})
