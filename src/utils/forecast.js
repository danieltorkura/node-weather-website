const request = require("request")



const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/24c50f78e52a380148054a77ef0524cd/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true}, (error, {body }) => {
        if (error) {
            callback('Cannot find weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, "It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.") 
        }
    })
}

module.exports = forecast;      