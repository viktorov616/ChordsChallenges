import React, { PropTypes } from 'react';

import Nav from '../components/Nav';

export default function Layout(props) {
  const nav = [{
    linkPath: '/',
    linkName: 'Challenges',
  }, {
    linkPath: '/manage-challenges',
    linkName: 'Manage Challenges',
  }];

  return (
    <div className="layout">
      <Nav
        nav={nav}
        currentPage={props.location.pathname}
      />
      { React.cloneElement(props.children, { ...props }) }
    </div>
  );
}

Layout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};
