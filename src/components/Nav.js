import React, { PropTypes } from 'react';

import NavLink from './NavLink';

export default function Nav(props) {
  return (
    <ul className="nav">
      { props.nav.map(link => (<li key={link.linkPath} className="nav__item">
        <NavLink
          linkPath={link.linkPath}
          linkName={link.linkName}
          currentPage={props.currentPage}
        />
      </li>)) }
    </ul>
  );
}

Nav.propTypes = {
  nav: PropTypes.array.isRequired,
  currentPage: PropTypes.string.isRequired,
};
