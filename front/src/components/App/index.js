// == Import npm
import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'

// == Import
import ListResults from '../ListResults'
import SearchBar from '../SearchBar'
import Message from '../Message'

// == Composant
const App = () => {
  const [newSearchValue, setNewSearchValue] = useState('')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [nextUrl, setNextUrl] = useState('')
  const [postId, setPostId] = useState()
  const [message, setMessage] = useState('Welcome, young padawan.')
  const [hasError, setHasError] = useState(false)
  const [messageVisible, setMessageVisible] = useState(true)

  const BACK_URL = process.env.REACT_APP_BACK_URL

  // Permet à doSearch d'adopter le bon comportement en fonction du endpoint entré par l'utilisateur en retournant le nombre de slash qu'elle comporte.
  const slashCounter = (string) => {
    let counter = 0

    for (let char of string) {
      if (char === '/') {
        counter++
      }
    }

    return counter
  }

  const displayMessage = (messageToDisplay) => {
    setMessageVisible(true)
    setMessage(messageToDisplay)
  }

  const reset = () => {
    setHasError(false)
    displayMessage('Please wait, your request is being processed...')
    setLoading(true)
  }

  // Charge des éléments via le champ de recherche.
  const doSearch = async () => {
    try {
      reset()
      let id = 1
      const url = `${BACK_URL}/${newSearchValue}`
      if (slashCounter(newSearchValue) === 1) {
        let responseItems = await axios.get(url)
        setNextUrl(responseItems.data.next)
        responseItems.data.results.forEach(element => {
          element.id = id++
        })
        setPostId(id)
        setPosts(responseItems.data.results)
        displayMessage('Request successfully completed.')
      } else if (slashCounter(newSearchValue) === 2) {
        // Si la requête échoue, nous passons dans le "catch" avant la redirection.
        await axios.get(url)
        window.location = newSearchValue
      } else {
        throw  Object.assign(
          new Error('Incorret user input'),
          { response: 
            { status: 400 }
          }
       )
      }
    } catch(error) {
      console.error(error)
      setHasError(true)
      if (error.response.status === 400)
        displayMessage('You made a typing error. Check and patch it before retry.')
      else if (error.response.status === 404)
        displayMessage(`${error.message}, padawan. Check and patch your potential typing error before retry.`)
      else
        displayMessage(`${error.message}, padawan. Please, retry later.`)
    } finally {
      setLoading(false)
    }
  }

  // Charge de nouveaux éléments.
  const nextPage = async () => {
    try {
      let id = postId
      let responseItems = await axios.get(nextUrl)
      setNextUrl(responseItems.data.next)
      responseItems.data.results.forEach(element => {
        element.id = id++
      })
      setPostId(id)
      setPosts(prevState => [...prevState, ...responseItems.data.results])
    } catch(error) {
      console.error(error)
      displayMessage(error.message)
      setHasError(true)
    }
  }

  return (
    <div id={'app'}>
      <SearchBar
        doSearch={doSearch}
        value={newSearchValue}
        changeValue={setNewSearchValue}
        loading={loading}
      />
      {messageVisible && (
        <Message
          hasError={hasError}
          content={message}
          setMessageVisible={setMessageVisible}
        />
      )}
      <ListResults items={posts} />
      {nextUrl && (
        <div id='button-container'>
          <Button onClick={nextPage}>Load More</Button>
        </div>
      )}
    </div>
  )
}

// == Export
export default App
