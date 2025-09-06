const request = require('request')
const yargs = require("yargs");

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


request({
    url: `https://nominatim.openstreetmap.org/search?street=${encodedAdress}&city=${encodedCity}&format=json`,
    headers: {
        "User-Agent": "my-weather-app/1.0 (aminajaouani@icloud.com)"
    },
    json: true
}, (error, response, body) => {
    if ( error) {
        console.log("Unable to connect to server")
    }
    else if(!body[0]){
        console.log("Unable to find that address")
    }
    else if ( response.statusCode === 200) {
        console.log(`latitude ${body[0].lat}`);
        console.log(`longitude ${body[0].lon}`);   
    }
     
})