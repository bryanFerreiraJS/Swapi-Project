import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Item from './Item';

const ListResults = ({ items }) => (
  <Card.Group itemsPerRow={3} doubling>
    {items.map((item) => (
      <Item key={item.id} {...item} />
    ))}
  </Card.Group>
);

ListResults.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default ListResults;