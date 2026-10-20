import React, { Component } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollspy from 'react-scrollspy';

import { Container } from '@components/global';
import {
  Nav,
  NavItem,
  Brand,
  StyledContainer,
  NavListWrapper,
  MobileMenu,
  Mobile,
} from './style';

import { ReactComponent as MenuIcon } from '@static/icons/menu.svg';

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Products & Services', id: 'products' },
  { label: 'About', id: 'about' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contact', id: 'contact' },
];

class Navbar extends Component {
  state = {
    mobileMenuOpen: false,
  };

  toggleMobileMenu = () => {
    this.setState(prevState => ({ mobileMenuOpen: !prevState.mobileMenuOpen }));
  };

  closeMobileMenu = () => {
    if (this.state.mobileMenuOpen) {
      this.setState({ mobileMenuOpen: false });
    }
  };

  getNavAnchorLink = item => (
    <AnchorLink href={`#${item.id}`} onClick={this.closeMobileMenu}>
      {item.label}
    </AnchorLink>
  );

  getNavList = ({ mobile = false }) => (
    <NavListWrapper  mobile={mobile}>
      <Scrollspy
        items={NAV_ITEMS.map(item => item.id)}
        currentClassName="active"
        mobile={mobile}
        offset={-64}
      >
        {NAV_ITEMS.map(navItem => (
          <NavItem key={navItem.id}>{this.getNavAnchorLink(navItem)}</NavItem>
        ))}
      </Scrollspy>
    </NavListWrapper>
  );

  render() {
    const { mobileMenuOpen } = this.state;

    return (
      <Nav {...this.props}>
        <StyledContainer>
          <AnchorLink href="#home" onClick={this.closeMobileMenu}>
            <Brand>Dynamic Chemicals</Brand>
          </AnchorLink>
          <Mobile>
            <button
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation"
              onClick={this.toggleMobileMenu}
              style={{ color: 'white' }}
            >
              <MenuIcon />
            </button>
          </Mobile>

          <Mobile  hide >{this.getNavList({})}</Mobile>
        </StyledContainer>
        <Mobile>
          {mobileMenuOpen && (
            <MobileMenu>
              <Container >{this.getNavList({ mobile: true })}</Container>
            </MobileMenu>
          )}
        </Mobile>
      </Nav>
    );
  }
}

export default Navbar;
