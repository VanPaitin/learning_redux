import React from 'react';
import { NavLink } from 'react-router-dom';

const FilterLink = ({ filter, children }) =>
  <NavLink
    exact
    to={`/${filter === 'all' ? '' : filter}`}
    activeStyle={{
      textDecoration: 'none',
      color: '#000'
    }}>
    {children}
  </NavLink>

export default () =>
  <p>
    Show:
    {'  '}
    <FilterLink filter='all'>All</FilterLink>&nbsp;&nbsp;
    <FilterLink filter='active'>Active</FilterLink>&nbsp;&nbsp;
    <FilterLink filter='completed'>Complete</FilterLink>
  </p>
