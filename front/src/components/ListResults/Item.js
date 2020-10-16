import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Item = ({ 
  name
}) => (
  <Card>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
    </Card.Content>
  </Card>
);

Item.propTypes = {
  name: PropTypes.string.isRequired, 
};

export default Item;
