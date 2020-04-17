import React from 'react';
import './nopage.scss';
import '../../shared/styles/buttonclasses.scss';
import tape from '../../shared/images/frulle.gif';
import { Link } from 'react-router-dom';


class NoPage extends React.Component {
  
  
  render(){

    return (
      <div className="nopage">

        
        <h1>404 - Page not found</h1>

        <Link to="/" className="go-home-link"><span className="shop-btn movie-shop-button">Go back Home</span></Link>

        <div className="nopage-image"><img src={tape} alt="reel of film"></img></div>
    
        
      </div>
    );
  } 
}

export default NoPage;