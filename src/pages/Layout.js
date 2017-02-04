import React, { PropTypes } from 'react';

export default function Layout(props) {
  return (
    <div>
      { React.cloneElement(props.children, { ...props }) }
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};
