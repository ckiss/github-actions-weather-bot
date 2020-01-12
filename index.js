require('dotenv').config()
const fetch = require('node-fetch')
const Telegram = require('node-telegram-bot-api')
const bot = new Telegram(process.env.TELEGRAM_TOKEN)

const weatherToken = process.env.WEATHER_API_TOKEN

const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather')
weatherURL.searchParams.set('lat', '45.760696')
weatherURL.searchParams.set('lon', '21.226788')
weatherURL.searchParams.set('APPID', weatherToken)
weatherURL.searchParams.set('units', 'metric')

const generateWeatherMessage = weatherData => `Vremea in ${weatherData.name}: ${weatherData.weather[0].description}. Temperatura curenta este ${weatherData.main.temp}, cu o temperatura minima de ${weatherData.main.temp_min} si o maxima de ${weatherData.main.temp_max}`

const getWeatherData = async () => {
    const resp = await fetch(weatherURL.toString())

    const body = await resp.json()
    return body
}

const main = async () => {
    const weatherData = await getWeatherData()
    const weatherString = generateWeatherMessage(weatherData)

    bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString)
    console.log('weatherData: ', weatherString)
}

main ()