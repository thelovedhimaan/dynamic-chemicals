import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Section, Container } from '@components/global';
import ExternalLink from '@common/ExternalLink';
import PDF from '../../CATALOG.pdf';
import { ReactComponent as AirbnbLogo } from '@images/logos/airbnb.svg';
import { ReactComponent as AppleMusicLogo } from '@images/logos/apple-music.svg';
import { ReactComponent as CokeLogo } from '@images/logos/coca-cola.svg';
import { ReactComponent as NodeLogo } from '@images/logos/nodejs.svg';
import { ReactComponent as NikeLogo } from '@images/logos/nike.svg';
import { ReactComponent as InstagramLogo } from '@images/logos/instagram.svg';

const LOGOS = [
  {
    logo: AirbnbLogo,
    link: 'https://airbnb.io',
  },
  {
    logo: AppleMusicLogo,
    link: 'https://www.apple.com/in/music/',
  },
  {
    logo: CokeLogo,
    link: 'https://coca-cola.com',
  },
  {
    logo: NodeLogo,
    link: 'https://nodejs.org',
  },
  {
    logo: NikeLogo,
    link: 'https://nike.com',
  },
  {
    logo: InstagramLogo,
    link: 'https://instagram.com',
  },
];

const UsedBy = () => (
  <StaticQuery
    query={graphql`
      query {
        art_story: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "tell_story" }
        ) {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <Section id="about" accent>
        <h2 style={{ textAlign: 'center', fontWeight: '800', color: 'white' }}>
          ABOUT
        </h2>
        <StyledContainer>
          <div style={{ color: 'white' }}>
            <br />
            <h3>
              We Deal with Industrial chemicals, Specialist in water treatment,
              Field regular user boiler chemical, D-scaling chemicals, Cooling
              tower water body, STP and fireside chemicals, Interlocking and
              floor tiles hardener & All housekeeping cleaning chemicals and
              materials.
            </h3>
            <br />
            105 Green Park, Mahesh Nagar, Ambala Cantt. (HR) 133001
            <p
              style={{ color: 'white', textAlign: 'center', marginTop: '30px' }}
            >
              <StyledExternalLink target="_blank" href={PDF}>
                {' '}
                <button
                  className="offset"
                  style={{
                    height: '80px',
                    width: '85%',
                    textDecoration: 'none',
                    fontSize: '18px',
                    padding: '15px',
                  }}
                >
                  <span style={{ color: 'white' }}>
                    Download PDF for more details &nbsp;&#x2794;
                  </span>
                </button>{' '}
              </StyledExternalLink>
            </p>
          </div>

          <Art>
            {/* <Img  fluid={data.art_story.childImageSharp.fluid} /> */}
          </Art>
        </StyledContainer>
      </Section>
    )}
  />
);

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 64px;
  justify-items: center;
  margin-top: 96px;

  a {
    svg {
      width: 100%;
    }
  }

  @media (max-width: ${props => props.theme.screen.sm}) {
    grid-template-columns: 1fr;
  }
`;
const StyledExternalLink = styled(ExternalLink)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.color.black.regular};
  }
`;
const StyledContainer = styled(Container)`
  display: flex;
  justify-content: flex-end;
  position: relative;

  @media (max-width: ${props => props.theme.screen.md}) {
    justify-content: center;
  }
`;

const Art = styled.figure`
  width: 600px;
  position: absolute;
  top: -12%;
  right: 50%;

  @media (max-width: ${props => props.theme.screen.lg}) {
    top: 0;
    right: 65%;
    width: 500px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    display: none;
  }
`;

export default UsedBy;
