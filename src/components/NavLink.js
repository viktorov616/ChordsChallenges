import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function NavLink(props) {
  const link = (props.currentPage === props.linkPath)
    ? <p className="nav-link  nav-link--active">{props.linkName}</p>
    : <Link to={props.linkPath} className="nav-link">{props.linkName}</Link>;
  return (
    link
  );
}

NavLink.propTypes = {
  currentPage: PropTypes.string.isRequired,
  linkPath: PropTypes.string.isRequired,
  linkName: PropTypes.string.isRequired,
};
