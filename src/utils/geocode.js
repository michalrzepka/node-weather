const request = require('request')

const geocode = (address, callback) => {

    const geocodeReq = {
        url: encodeURIComponent(address) + '.json',
        baseUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
        language: 'pl-PL',
        qs: {
            limit: 3,
            access_token: 'pk.eyJ1IjoibXJ6OTAiLCJhIjoiY2s1azljNHZkMGF1dDNkbGJ4eWs5N2RnaCJ9.Xsx6Tx6RlahToSQ6prEfhw',
        },
        json: true
    }

    request(geocodeReq, (error, {body} = {}) => {
        if (error) {
            callback('Ni ma połączenia z bazą miejsc.', undefined)
        } else if (body.features.length === 0) {
            callback('Ni można znaleźć takego miejsca.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                name: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

