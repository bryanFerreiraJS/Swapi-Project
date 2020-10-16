const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios')

const SWAPI_URL = process.env.SWAPI_URL
const BASE_URL = process.env.BASE_URL


// Transforme un url swapi par un url du back-end
const returnCustomUrl = (url) => (`${BASE_URL}${url.split('/api').pop()}`)

// Permet d'avoir le bon comportement en fonction du type et/ou du contenu du paramètre "element"
const setCustomUrl = (element) => {
  if (element) {
    if (Array.isArray(element)) {
      let newArray = []
      element.forEach(url => {
        url = returnCustomUrl(url)
        newArray.push(url)
      })
      element = newArray
    } else {
      element = returnCustomUrl(element)
    }
  }

  return element
}

// Liste exaustive des valeurs des clés à changer 
const exaustiveList = (data) => {
  data.url = setCustomUrl(data.url)
  data.homeworld = setCustomUrl(data.homeworld)
  data.people = setCustomUrl(data.people)
  data.films = setCustomUrl(data.films)
  data.pilots = setCustomUrl(data.pilots)
  data.vehicles = setCustomUrl(data.vehicles)
  data.starships = setCustomUrl(data.starships)
  data.residents = setCustomUrl(data.residents)
  data.species = setCustomUrl(data.species)

  return data
}

const controller = {
  getAll: async (req, res) => {
    try {
      const endpoint = req.originalUrl
      let responseData = await axios.get(`${SWAPI_URL}${endpoint}`)
      responseData.data.next = setCustomUrl(responseData.data.next)
      responseData.data.previous = setCustomUrl(responseData.data.previous)
      responseData.data.results.forEach(element => {
        element = exaustiveList(element)
      });
      res.json(responseData.data)
    } catch (error) {
      res.status(500).send(error)
    }
  },

  getOne: async (req, res) => {
    try {
      const endpoint = req.originalUrl
      let responseData = await axios.get(`${SWAPI_URL}${endpoint}`)
      responseData.data = exaustiveList(responseData.data)
      res.json(responseData.data)
    } catch (error) {
      res.status(500).send(error)
    }
  },
};


module.exports = controller