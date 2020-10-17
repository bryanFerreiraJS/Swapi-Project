import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Card } from 'semantic-ui-react';

const PeopleCard = () => {
  const [data, setData] = useState({});

  const BACK_URL = process.env.REACT_APP_BACK_URL

  const fetchData = async () => {
    try {
      const responseItems = await axios.get(`${BACK_URL}${window.location.pathname}`);
      setData(responseItems.data)
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
    console.log(data)
  }, []);

  return (
    <Card>
      <div onClick={() => console.log(data)}>Test</div>
      <Card.Content>
        <Card.Header>{data.name}</Card.Header>
        <Card.Meta>
          {data.gender}
        </Card.Meta>
        <Card.Description>
          <ul>
            <li>Height: {data.height / 100} m</li>
            <li>Mass: {data.mass} kg</li>
            <li>Hair Color: {data.hair_color}</li>
            <li>Skin Color: {data.skin_color}</li>
            <li>Eye Color: {data.eye_color}</li>
            <li>Birth Year: {data.birth_year}</li>
            <li>Homeworld: {data.homeworld}</li>
            {data.films && (
              <li>
                <ul>Films:
                  {data.films.map((item) => (
                    <li key={item}>
                      <a href={item}>Click Here</a>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {data.species && (
              <li>
                <ul>Species:
                  {data.species.map((item) => (
                    <li key={item}>
                      <a href={item}>Click Here</a>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {data.vehicles && (
              <li>
                <ul>Vehicles:
                  {data.vehicles.map((item) => (
                    <li key={item}>
                      <a href={item}>Click Here</a>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {data.starships && (
              <li>
                <ul>Starships:
                  {data.starships.map((item) => (
                    <li key={item}>
                      <a href={item}>Click Here</a>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </Card.Description>
      </Card.Content>
    </Card>
  )
};

export default PeopleCard;