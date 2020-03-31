const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryFolder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryFolder))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Daniel Torkura',
        year: '1999'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Daniel Torkura',
        year: '1029'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Daniel Torkura',
        year: '2009'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    const address = req.query.address

        geocode(address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
              return res.send({
                  error: error
                //   error only
              })
            }
              forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                  return res.send({
                      error: error
                  })
                }
                res.send({
                    location,
                    forecast: forecastData,
                    address
                
              })
          })
   
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Daniel Torkura',
        year: '2001',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Daniel Torkura',
        year: '2012',
        error: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port.)
})