const request = require('request')

const forecast = (latitude, longtitude, callback) => {

    const forecastReq = {
        url: '/forecast/3f97247baee14e35b65e44616d980fbf/' + latitude + ',' + longtitude,
        baseUrl: 'https://api.darksky.net',
        qs: {
            lang: 'pl',
            units: 'si'
        },
        json: true
    }

    request(forecastReq, (error, {body} = {}) => {
        if (error) {
            callback('Ni ma połączenia z pogodynką.', undefined)
        } else if (body.error) {
            callback('Ni można znaleź pogody dla tego miejsca.', undefined)
        } else {
            const message = body.currently.summary + ', ' + Math.round(body.currently.temperature) + '°C, ' + (body.currently.precipProbability * 100) + '% szans na opady.'
            callback(undefined, message)
        }
    })

}

module.exports = forecast
