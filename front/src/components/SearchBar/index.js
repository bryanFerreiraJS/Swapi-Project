/* 
  Les ref permettent de mémoriser un élement du DOM réel (un peu comme ce que nous retourne getElementById) et des infos sur le composant qui l'a instancié.
  on va déclérer une ref à l'aide du hook useRef, elle sera remplie automatiquement au moment du rendu. J'y ai accès après le rendu, par exemple dans useEffect
*/
import React, { useEffect, useRef } from 'react';
// "semantic-ui" nous fourni des composants tout fait. Il nous suffit des les instancier. Ces composants sont configurables via des props (à voir dans la doc) et gère déjà des comportements
import { Input, Form, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SearchBar = ({
  doSearch,
  value,
  loading,
  changeValue,
}) => {
  // Je déclare la ref et l'initialise à null, tant que le rendu dans le dom réel n'est pas fait, il sera impossible de cibler l'élement dans le dom réel
  const inputElement = useRef(null);
  useEffect(() => {
    // après le rendu on a accès à la ref, elle contient des infos sur l'élement du dom réel + les props du composants
    // console.log('après le rendu', inputElement);
    inputElement.current.focus();
  }, []);
  // avant le rendu on n'a pas accès la ref
  // console.log('avant le rendu', inputElement);
  return (
    <Segment>
      <Form onSubmit={doSearch}>
        <Input
          value={value}
          onChange={(event) => {
            changeValue(event.target.value);
          }}
          // pour remplir la ref, on ajoute une prop ref sur le composant qui nous intéresse et on lui associe notre ref "inputElement", elle sera remplie et accessible après le rendu
          ref={inputElement}
          fluid
          loading={loading}
          icon="search"
          iconPosition="left"
          placeholder='"people/", "species/2/", ...'
        />
      </Form>
    </Segment>
  );
};

SearchBar.propTypes = {
  loading: PropTypes.bool,
  value: PropTypes.string,
  changeValue: PropTypes.func.isRequired,
  doSearch: PropTypes.func.isRequired,
};

export default SearchBar;
