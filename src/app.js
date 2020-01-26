const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewPath)
app.use(express.static(publicDirectoryPath))

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        header: 'Pogodo',
        title: 'Pogodo',
        name: 'MRZ'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        header: 'Info',
        title: 'Info',
        name: 'MRZ'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        header: 'Pomocz',
        title: 'Pomocz',
        name: 'MRZ'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'Podej miejsce, kaj mom szukać!'
        })
    }

    geocode(address, (error, {latitude, longtitude, name} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longtitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address,
                location: name,
                forecast: data
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        header: '404',
        message: 'Ni ma pomocy',
        name: 'MRZ'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        header: '404',
        header: 'Ni ma strony',
        name: 'MRZ'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
}) 
