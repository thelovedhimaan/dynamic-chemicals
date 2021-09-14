import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Section, Container } from '@components/global';
import ExternalLink from '@common/ExternalLink';

import GithubIcon from '@static/icons/github.svg';
import InstagramIcon from '@static/icons/instagram.svg';
import TwitterIcon from '@static/icons/twitter.svg';

const SOCIAL = [
  {
    icon: GithubIcon,
    link: 'https://github.com/ajayns/gatsby-absurd',
  },
  {
    icon: InstagramIcon,
    link: 'https://instagram.com/ajay_ns',
  },
  {
    icon: TwitterIcon,
    link: 'https://twitter.com/ajayns08',
  },
];

const Contact = () => (
  <StaticQuery
    query={graphql`
      query {
        art_pot: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "customers_pot" }
        ) {
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <React.Fragment id="#contact">
        {/* <Art>
          <Img
            fluid={data.art_pot.childImageSharp.fluid}
            style={{ width: 480, maxWidth: '100%', marginBottom: -16 }}
          />
        </Art> */}
        <FooterWrapper id="contact">
          <h2
            style={{ textAlign: 'center', fontWeight: '800', color: 'white' }}
          >
            CONTACT
          </h2>
          <br />
          <br />
          <StyledContainer>
            <Copyright style={{ color: 'white' }}>
              <h2 style={{ fontSize: '30px' }}>Dynamic Chemicals</h2>
              <br />
              <br />

              <div>
                FEEL FREE TO CONTACT ON ANY OF THE FOLLOWING PLATFROMS :{' '}
              </div>
              <br />

              <div className="Cards">
                <p style={{ margin: '20px' }}>
                  {' '}
                  <a target="_blank" href="tel:+919996777453">
                    {' '}
                    <button
                      className="offset"
                      style={{
                        height: '70px',
                        width: '300px',
                        textDecoration: 'none',
                        fontSize: '16px',
                      }}
                    >
                      {' '}
                      <span style={{ color: 'white' }}>
                        Contact : 9996777453
                      </span>
                    </button>
                  </a>
                </p>
                <p style={{ margin: '20px' }}>
                  {' '}
                  <a
                    target="_blank"
                    href="https://api.whatsapp.com/send?phone=+919996777453&text="
                  >
                    <button
                      className="offset"
                      style={{
                        height: '70px',
                        width: '300px',
                        textDecoration: 'none',
                        fontSize: '16px',
                      }}
                    >
                      {' '}
                      <span style={{ color: 'white' }}>
                        {' '}
                        WhatsApp : 9996777453
                      </span>
                    </button>
                  </a>
                </p>
                <p style={{ margin: '20px' }}>
                  {' '}
                  <a
                    target="_blank"
                    href="mailto:thedynamicchemicals@gmail.com"
                  >
                    <button
                      className="offset"
                      style={{
                        height: '70px',
                        width: '300px',
                        textDecoration: 'none',
                        fontSize: '16px',
                      }}
                    >
                      {' '}
                      <span style={{ color: 'white' }}>
                        {' '}
                        thedynamicchemicals@gmail.com
                      </span>
                    </button>
                  </a>
                </p>
              </div>
            </Copyright>
            <SocialIcons>
              {/* {SOCIAL.map(({ icon, link }) => (
                <ExternalLink key={link} href={link}>
                  <img src={icon} alt="link" />
                </ExternalLink>
              ))} */}
            </SocialIcons>
          </StyledContainer>
        </FooterWrapper>
      </React.Fragment>
    )}
  />
);

const SocialIcons = styled.div`
  display: flex;

  img {
    margin: 0 8px;
    width: 24px;
    height: 24px;
  }

  @media (max-width: ${props => props.theme.screen.sm}) {
    margin-top: 40px;
  }
`;

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.color.primary};
  padding: 32px 0;
`;

const Copyright = styled.div`
  font-family: ${props => props.theme.font.secondary};
  ${props => props.theme.font_size.small};
  color: ${props => props.theme.color.black.regular};

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Art = styled.figure`
  display: flex;
  justify-content: center;
  margin: 0;
  margin-top: 48px;
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${props => props.theme.screen.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

export default Contact;
