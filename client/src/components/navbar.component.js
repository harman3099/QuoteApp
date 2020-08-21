import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';

export default class Navbar extends Component{

  render(){
    return(
      <nav className="navbar navbar-dark fixed-top bg-dark navbar-expand-md">
        <Link to="/" className="navbar-brand"><FontAwesomeIcon icon={faBook} /> Quote-Collection</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className=" collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Quotes</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Add new Quote</Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">New User</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

