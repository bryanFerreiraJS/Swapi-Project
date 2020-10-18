// == Import npm
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

// == Import
import Header from '../Header';
import ListResults from '../ListResults';
import SearchBar from '../SearchBar';

// == Composant
const App = () => {
  const [newSearchValue, setNewSearchValue] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [nextUrl, setNextUrl] = useState('');
  const [postId, setPostId] = useState();

  const BACK_URL = process.env.REACT_APP_BACK_URL

  const slashCounter = (string) => {
    let counter = 0

    for (let char of string) {
      if (char === '/') {
        counter++
      }
    }

    return counter
  }

  const doSearch = async () => {
    try {
      if (slashCounter(newSearchValue) === 1) {
        let id = 1
        const url = `${BACK_URL}/${newSearchValue}`
        setLoading(true);
        setCurrentUrl(url);
        let responseItems = await axios.get(url);
        setNextUrl(responseItems.data.next)
        responseItems.data.results.forEach(element => {
          element.id = id++;
        });
        setPostId(id)
        setPosts(responseItems.data.results)
      } else if (slashCounter(newSearchValue) === 2) {
        window.location = newSearchValue
      }
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const nextPage = async () => {
    try {
      let id = postId
      setCurrentUrl(nextUrl)
      let responseItems = await axios.get(nextUrl);
      setNextUrl(responseItems.data.next)
      responseItems.data.results.forEach(element => {
        element.id = id++;
      });
      setPostId(id)
      setPosts(prevState => [...prevState, ...responseItems.data.results])
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Header />
      <SearchBar
        doSearch={doSearch}
        value={newSearchValue}
        changeValue={setNewSearchValue}
        loading={loading}
      />
      <ListResults items={posts} />
      {currentUrl && (
        <div id='button-container'>
          <Button onClick={nextPage}>Load More</Button>
        </div>
      )}
    </div>
  );
};

// == Export
export default App;
