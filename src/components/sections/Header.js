import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import { Container } from '@components/global';

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        art_build: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "build" }
        ) {
          childImageSharp {
            fluid(maxWidth: 1400) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <HeaderWrapper id="home">
        <Container>
          <Grid>
            <Art>
              <Img
                alt="Dynamic Chemicals product range"
                fluid={data.art_build.childImageSharp.fluid}
              />
            </Art>
            <Text>
              <Eyebrow>Industrial and commercial chemical solutions</Eyebrow>
              <h1>Dynamic Chemicals</h1>
              <Lead>
                Products for water treatment, boiler and cooling-tower care,
                descaling, housekeeping, construction, and routine industrial
                maintenance.
              </Lead>
              <Actions>
                <PrimaryLink href="#products">Explore products</PrimaryLink>
                <SecondaryLink href="#contact">Contact us</SecondaryLink>
              </Actions>
            </Text>
          </Grid>
        </Container>
      </HeaderWrapper>
    )}
  />
);

const HeaderWrapper = styled.header`
  background-color: ${props => props.theme.color.primary};
  padding: 120px 0 72px;

  @media (max-width: ${props => props.theme.screen.md}) {
    padding: 120px 0 56px;
  }
`;

const Art = styled.figure`
  width: 90%;
  margin: 0;

  > div {
    width: 100%;
    border-radius: 32px;
    box-shadow: rgba(0, 0, 0, 0.22) 0 24px 48px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  grid-gap: 64px;

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    grid-gap: 48px;

    > ${Art} {
      order: 2;
    }
  }
`;

const Text = styled.div`
  color: white;

  h1 {
    color: white;
    font-size: clamp(2.6rem, 6vw, 4.5rem);
    line-height: 1.05;
    margin: 12px 0 24px;
  }
`;

const Eyebrow = styled.p`
  font-weight: 700;
  letter-spacing: 0.08em;
  margin: 0;
  text-transform: uppercase;
`;

const Lead = styled.p`
  color: white;
  font-size: 1.2rem;
  line-height: 1.7;
  max-width: 620px;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
`;

const PrimaryLink = styled(AnchorLink)`
  background: white;
  border: 2px solid white;
  border-radius: 8px;
  color: ${props => props.theme.color.primary};
  font-weight: 700;
  padding: 12px 20px;
  text-decoration: none;
`;

const SecondaryLink = styled(PrimaryLink)`
  background: transparent;
  color: white;
`;

export default Header;
