// Warning: findDOMNode is deprecated in StrictMode when using react-bootstrap Navbar
// warning when clicking hamburger button
import React from 'react';
import './adminnavbar.scss';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import camera from '../../shared/images/kamera.png';



interface IAdminNavBarProps {
  onReload(): void;
  onLogIn(): void;
}



class AdminNavBar extends React.Component<IAdminNavBarProps, {}> {
  

  
  render(){

    return (
      
      <Navbar expand="lg" className="mynav">
        <Navbar.Brand className="logo"><img src={camera} alt="logotype"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/admin" className="nav-link" onClick={this.props.onReload}>Admin</Link>
            <Link to="/" className="nav-link">Shop</Link> 
          </Nav>
        <span onClick={this.props.onLogIn} className="logout">Log out</span>
        </Navbar.Collapse>
      </Navbar>

    );
  }
}

  
export default AdminNavBar;

