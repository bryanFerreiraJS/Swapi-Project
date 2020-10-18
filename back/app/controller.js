const axios = require('axios')

const SWAPI_URL = process.env.SWAPI_URL
const FRONT_URL = process.env.FRONT_URL
const BACK_URL = process.env.BACK_URL


// Transforme un url swapi en url front-end ou back-end
const returnCustomUrl = (url, frontOrBackUrl) => (`${frontOrBackUrl}${url.split('/api').pop()}`)

// Permet d'avoir le bon comportement en fonction du type et/ou du contenu du paramètre "element"
const setCustomUrl = (element, frontOrBackUrl) => {
  if (element) {
    if (Array.isArray(element)) {
      let newArray = []
      element.forEach(url => {
        url = returnCustomUrl(url, frontOrBackUrl)
        newArray.push(url)
      })
      element = newArray
    } else {
      element = returnCustomUrl(element, frontOrBackUrl)
    }
  }

  return element
}

// Liste exaustive des valeurs des clés à changer 
const exaustiveList = (data, frontOrBackUrl) => {
  data.url = setCustomUrl(data.url, frontOrBackUrl)
  data.homeworld = setCustomUrl(data.homeworld, frontOrBackUrl)
  data.people = setCustomUrl(data.people, frontOrBackUrl)
  data.characters = setCustomUrl(data.characters, frontOrBackUrl)
  data.planets = setCustomUrl(data.planets, frontOrBackUrl)
  data.films = setCustomUrl(data.films, frontOrBackUrl)
  data.pilots = setCustomUrl(data.pilots, frontOrBackUrl)
  data.vehicles = setCustomUrl(data.vehicles, frontOrBackUrl)
  data.starships = setCustomUrl(data.starships, frontOrBackUrl)
  data.residents = setCustomUrl(data.residents, frontOrBackUrl)
  data.species = setCustomUrl(data.species, frontOrBackUrl)

  return data
}

const controller = {
  getAll: async (req, res) => {
    try {
      const endpoint = req.originalUrl
      let responseData = await axios.get(`${SWAPI_URL}${endpoint}`)
      responseData.data.next = setCustomUrl(responseData.data.next, BACK_URL)
      responseData.data.previous = setCustomUrl(responseData.data.previous, BACK_URL)
      responseData.data.results.forEach(element => {
        element = exaustiveList(element, FRONT_URL)
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
      responseData.data = exaustiveList(responseData.data, FRONT_URL)
      res.json(responseData.data)
    } catch (error) {
      res.status(500).send(error)
    }
  },
};


module.exports = controller