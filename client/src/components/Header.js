import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key={0}>
            <a href="/auth/google">Login With Google</a>
          </li>,
          <li key={1}>
            <a href="/auth/facebook">Login With Facebook</a>
          </li>
        ];
      default:
        return [
          <li key={2}>
            <Payments />
          </li>,
          <li key={3} style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key={4}>
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  renderMobileContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <NavItem href="/auth/google">Login With Google</NavItem>,
          <NavItem href="/auth/google">Login With Facebook</NavItem>
        ];
      default:
        return [
          <NavItem>
            <Payments />
          </NavItem>,
          <NavItem style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </NavItem>,
          <NavItem href="/api/logout">Logout</NavItem>
        ];
    }
  }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper #006064 cyan darken-4">
            <Link
              to={this.props.auth ? '/surveys' : '/'}
              className="brand-logo"
            >
              Emaily
            </Link>
            <ul className="right hide-on-med-and-down">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
      </div>
    );
    // return (
    //   <Navbar brand="Emaily" right>
    //     {this.renderMobileContent()}
    //   </Navbar>
    // );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
