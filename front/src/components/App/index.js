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

  const returnCustomUrl = (url) => (`http://localhost:3030/${url.split('/api/').pop()}`)

  const doSearch = async () => {
    try {
      let id = 1
      const url = `http://localhost:3030/${newSearchValue}`
      setLoading(true);
      setCurrentUrl(url);
      const responseItems = await axios.get(url);
      setNextUrl(returnCustomUrl(responseItems.data.next))
      responseItems.data.results.forEach(element => {
        element.id = id++;
      });
      setPostId(id)
      setPosts(responseItems.data.results)
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
    const responseItems = await axios.get(nextUrl);
    setNextUrl(returnCustomUrl(responseItems.data.next))
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
        <Button onClick={nextPage}>Load More</Button>
      )}
    </div>
  );
};

// == Export
export default App;
