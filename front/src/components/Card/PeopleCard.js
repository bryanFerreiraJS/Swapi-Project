import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Card } from 'semantic-ui-react';

const PeopleCard = () => {
  const [data, setData] = useState({});

  const BACK_URL = process.env.REACT_APP_BACK_URL

  useEffect(() => {
    const axiosData = async () => {
      try {
        const responseItems = await axios.get(`${BACK_URL}${window.location.pathname}`);
        setData(responseItems.data)
      } catch(error) {
        console.error(error);
      }
    }
    axiosData()
  }, [BACK_URL]);

  return (
    <div id={'card-container'}>
      <Card>
        <Card.Content>
          <Card.Header>{data.name}</Card.Header>
          <Card.Meta>
          {data.gender === 'n/a' ? 'asexual' : data.gender}
          </Card.Meta>
          <Card.Description>
            <ul>
              <li>Height: {data.height / 100} m</li>
              <li>Mass: {data.mass} kg</li>
              <li>Hair Color: {(data.hair_color === 'n/a' || data.hair_color === 'none') ? "This people don't have hair" : data.hair_color}</li>
              <li>Skin Color: {data.skin_color}</li>
              <li>Eye Color: {data.eye_color}</li>
              <li>Birth Year: {data.birth_year}</li>
              <li>Homeworld: 
                <a href={data.homeworld}> Click Here</a>
              </li>
              {data.films?.length > 0 && (
                <li>
                  <ul>Film(s):
                    {data.films.map((item) => (
                      <li key={item}>
                        <a href={item}>Click Here</a>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
              {data.species?.length > 0 && (
                <li>
                  <ul>Specie(s):
                    {data.species.map((item) => (
                      <li key={item}>
                        <a href={item}>Click Here</a>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
              {data.vehicles?.length > 0 && (
                <li>
                  <ul>Vehicle(s):
                    {data.vehicles.map((item) => (
                      <li key={item}>
                        <a href={item}>Click Here</a>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
              {data.starships?.length > 0 && (
                <li>
                  <ul>Starship(s):
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
    </div>
  )
};

export default PeopleCard;