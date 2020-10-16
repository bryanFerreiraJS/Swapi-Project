import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Item = ({ 
  name, 
  height, 
  mass,
  hair_color,
  skin_color,
  eye_color,
  gender
}) => (
  <Card>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>
        {gender}
      </Card.Meta>
      <Card.Description>
        <ul>
          <li>Height: {height / 100} m</li>
          <li>Mass: {mass} kg</li>
          <li>Hair Color: {hair_color}</li>
          <li>Skin Color: {skin_color}</li>
          <li>Eye Color: {eye_color}</li>
        </ul>
      </Card.Description>
    </Card.Content>
  </Card>
);

Item.propTypes = {
  name: PropTypes.string.isRequired, 
  height: PropTypes.string.isRequired,
  mass: PropTypes.string.isRequired,
  hair_color: PropTypes.string.isRequired,
  skin_color: PropTypes.string.isRequired,
  eye_color: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};

export default Item;
