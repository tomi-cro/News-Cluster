import React from 'react';
import './navbarStyle.css';

const Navbar = (props) => (   
  <ul>
    <li><a href="/">Home</a></li>
      <select value = {props.ageValue} onChange={ props.handleAgeChange }>
          <option value="true">New</option>
          <option value="false">Old</option>
      </select>
      <input type="text" onChange={event => props.onTextChange(event.target.value)}/>
      <label>
          <input
              type="checkbox"
              name="index"
              checked={props.indexValue}
              onChange={props.handlePortalChange}
          />
          Index
      </label>
      <label>
          <input
              type="checkbox"
              name="jutarnji"
              checked={props.jutarnjiValue}
              onChange={props.handlePortalChange}
          />
          Jutarnji
      </label>
      <label>
          <input
              type="checkbox"
              name="dva4Sata"
              checked={props.dva4SataValue}
              onChange={props.handlePortalChange}
          />
          24 Sata
      </label>
    </ul>
 );

export default Navbar;