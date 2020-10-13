const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios')

const BASE_URL = process.env.BASE_URL

const controller = {
  getAll: async (req, res) => {
    try {
      const endpoint = req.originalUrl
      const responseData = await axios.get(`${BASE_URL}${endpoint}/`)
      res.json(responseData.data)
    } catch (error) {
      res.status(500).send(error)
    }
  },

  getOne: async (req, res) => {
    try {
      const endpoint = req.originalUrl
      const responseData = await axios.get(`${BASE_URL}${endpoint}/`)
      res.json(responseData.data)
    } catch (error) {
      res.status(500).send(error)
    }
  },
};


module.exports = controller