import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Card from '../common/FaqItem/Card';
import { Section, Container } from '@components/global';
import D1 from '../../images/art/D1.png';
import D2 from '../../images/art/D2.png';
import D3 from '../../images/art/D3.png';
import D4 from '../../images/art/D4.png';
import D5 from '../../images/art/D5.png';
import D6 from '../../images/art/D6.png';
import D7 from '../../images/art/D7.png';
import D8 from '../../images/art/D8.png';
import D9 from '../../images/art/D9.png';
import D10 from '../../images/art/D10.png';
const Products = () => (
  <StaticQuery
    query={graphql`
      query {
        art_fast: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "fast" }
        ) {
          childImageSharp {
            fluid(maxWidth: 760) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }

        art_learn: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "learn_yourself" }
        ) {
          childImageSharp {
            fluid(maxWidth: 760) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        art_construction: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "construction" }
        ) {
          childImageSharp {
            fluid(maxWidth: 760) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }

        art_ideas: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "ideas" }
        ) {
          childImageSharp {
            fluid(maxWidth: 760) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        art_house: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "house" }
        ) {
          childImageSharp {
            fluid(maxWidth: 1260) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        art_industry: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "industry" }
        ) {
          childImageSharp {
            fluid(maxWidth: 760) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <Section id="products/services">
        <h2 style={{ textAlign: 'center', fontWeight: '800', width: '95%' }}>
          PRODUCTS / SERVICES
        </h2>
        <Container>
          <Grid2>
            <div>
              <h2 style={{ marginTop: '40px' }}>All Housekeeping Products</h2>
              <div>
                {' '}
                Cleaning and hygiene are the basic requirement of each and every
                office, Restaurent and manufacturing concerns. Dynamic Chemicals
                is playing a great role in providing quality products for all
                types of cleaning purposes. This company takes advance moves for
                developing quality products for cleaning.
                <br />
                The Dynamic Chemicals produces different types of chemicals and
                machinery for this purpose. <br /> <br />
                Dynamic Chemicals list are described below from D1, D2, D3 .....
                D9 is the next section with details :
              </div>{' '}
              <br />
              <p>
                <div className="Cards">
                  {FAQS.map(({ title, content, image }) => (
                    <Card title={title} key={title} image={image}>
                      {content()}
                    </Card>
                  ))}
                </div>
              </p>
            </div>
            <div>
              In the above discussed paragraph, we have fully described the
              different types of chemicals produced by Dynamic Chemicals in
              which we have deeply described the uses and purpose of the given
              product. And there are different types of cleaners for multiple
              users.
            </div>
            {/* <Art>
              <Img
                className="images"
                fluid={data.art_house.childImageSharp.fluid}
              />
            </Art> */}
          </Grid2>
          <Grid inverse>
            <Art>
              <Img
                className="images"
                fluid={data.art_industry.childImageSharp.fluid}
              />
            </Art>
            <div>
              <h2>Industrial Water Treatment</h2>
              <p>
                <ul>
                  <li>Softening</li>
                  <li>De alkalisation</li>
                  <li>Demineralisation</li>
                  <li>Mixed Bed resin</li>
                  <li>Nuclear Industry</li>
                </ul>
              </p>
            </div>
          </Grid>

          <Grid>
            <div>
              <h2>Water Treatment Chemicals</h2>
              <p>
                <ul>
                  <li>Cooling Tower Treatment</li>
                  <li>Boiler Water Treatment</li>
                  <li>RO Membrane Treatment</li>
                  <li>Polyelectrolytes</li>
                  <li>Efficient Microbes</li>
                  <li>Fuel Additives and Fireside Chemical</li>
                </ul>
              </p>
            </div>
            <Art>
              <Img
                className="images"
                fluid={data.art_fast.childImageSharp.fluid}
              />
            </Art>
          </Grid>
          <Grid inverse>
            <Art>
              <Img
                className="images"
                fluid={data.art_construction.childImageSharp.fluid}
              />
            </Art>
            <div>
              <h2>Construction Chemicals</h2>
              <p>
                <ul>
                  <li>Concrete Admixtures</li>
                  <li>Surface Treatment</li>
                  <li>Water Proofing</li>
                  <li>Sealants</li>
                  <li>Hardener</li>
                </ul>
              </p>
            </div>
          </Grid>

          <Grid>
            <div>
              <h2>Ion Exchange Resins</h2>
              <p>
                <ul>
                  <li>Groundwater Purification</li>
                  <li>Adsorbent Resin</li>
                  <li>Chelating Resin</li>
                  <li>Wastewater Treatment Resin</li>
                  <li>Resin for other Potential</li>
                  <li>Applications</li>
                </ul>
              </p>
            </div>
            <Art>
              <Img
                className="images"
                fluid={data.art_learn.childImageSharp.fluid}
              />
            </Art>
          </Grid>
        </Container>
      </Section>
    )}
  />
);

const FAQS = [
  {
    title: 'D1/ Bathroom Cleanses',
    image: D1,
    content: () => (
      <>
        The chemical is specially developed for cleaning and sanitizing, of
        Bathrooms which is very helpful in gremoving existing stain on sinks,
        tub tiles and floor cleanings The scented products do not contain any
        abrasive or bleach. It is safe for bathroom fittings , marbles and
        granites.
      </>
    ),
  },
  {
    title: 'D2/ All Purpose Cleaner ',
    image: D2,
    content: () => (
      <>
        This is a one man army for all types of stains as it acn be used for
        cleaning all types of strong and easy stains from all types of surfaces
        whether it is from floor, glass and other hard surfaces. This product is
        of great quality.
      </>
    ),
  },
  {
    title: 'D3/ Glass Cleaner',
    image: D3,
    content: () => (
      <>
        This is one of the the best glass cleaners that helps in cleaning glass
        and leaves no spot on fingers removes oily soils from the glass planes.
        It is very fast and easy to use.
      </>
    ),
  },
  {
    title: 'D4 / Furniture cleaner',
    image: D4,
    content: () => (
      <>
        Furniture cleaner is the basic requirement for any office for cleaning
        the furniture. And D4 is one of the best furniture cleaners that helps
        in increasing the wooden life and leaves a lustrous shine on furniture.
        The usage of furniture cleaner is very easy & simple to use.
      </>
    ),
  },
  {
    title: ' D5 / Air fresher ',
    image: D5,
    content: () => (
      <>
        Air fresher is the requirement of each office and Dynamic produces all
        types of liquid for the completion of one's need. The freshener provides
        a soothing smell that lasts for a long duration. It features a
        delightful floral perfume that rides off bad odor and refreshes the
        place with Sweet - smelling air.
      </>
    ),
  },
  {
    title: ' D6/ Toilet bowl Cleaner',
    image: D6,
    content: () => (
      <>
        Dynamic is also producing toilet bowl cleaner which is very hard and
        helps in removing the limescale build-up. Squeeze bottle helps in the
        fast and easy application of this toilet cleaner on the dark stains on
        toilet rims . And the shape of the bottle is as good as it can pour
        toilet cleaner to the uneasy places in the toilet seats.
      </>
    ),
  },

  {
    title: 'D7/ Floor Cleaner concentrated',
    image: D7,
    content: () => (
      <>
        The D7 floor cleaner concentrate is very useful for cleaning the
        stagnent stain of grease and oils on floors and surfaces. The liquid
        chemical can be used for harsh cleaning of hard surfaces and machinery
        parts.
      </>
    ),
  },
  {
    title: 'D8/ Kettle Descaler ',
    image: D8,
    content: () => (
      <>
        This is one of the best cleaners that are very much helpful in cleaning
        all types of dishes and can remove all the stains from the dish without
        Rubbing and scrubbing the surfaces. This is one of the cleaners that can
        be used to remove stains that are for a long duration on Crockery and
        Kettles.
      </>
    ),
  },

  {
    title: 'D9/ Removal of hard stains from bathroom walls and fittings',
    image: D9,
    content: () => (
      <>
        This is the only chemical that can remove stains of water from bathroom
        walls and fittings. The chemical is specially developed for cleaning all
        sink tub, tiles and other fittings. The usage of these cleaning agents
        is very simple, here we can directly pour on the surface and clean the
        spot of the stagnant water on walls.
      </>
    ),
  },
  // {
  //   title: 'Dynamic chemicals list with its uses:',
  //   content: () => <></>,
  // },
  // {
  //   title: ' Conclusion',
  //   content: () => <></>,
  // },
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 40px;
  text-align: right;
  align-items: center;
  justify-items: center;
  margin: 24px 0;
    border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color:#002C67;
  color:white;
  padding: 40px;

  ${props =>
    props.inverse &&
    `
    text-align: left;
    grid-template-columns: 2fr 3fr;
  `}

  h2 {
    margin-bottom: 16px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    margin-bottom: 96px;
    padding: 20px;
    &:last-child {
      margin-bottom: 24px;
    }

    ${props =>
      props.inverse &&
      `
        ${Art} {
          order: 2;
        }
    `}
  
`;

const Grid2 = styled.div`
  display: grid;
  grid-gap: 40px;
  align-items: center;
  justify-items: center;
  margin: 24px 0;
    border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color:#002C67;
  color:white;
  padding: 40px;

  ${props =>
    props.inverse &&
    `
    text-align: left;
  `}

  h2 {
    margin-bottom: 16px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    text-align: left;
    margin-bottom: 96px;
    padding: 20px;
    &:last-child {
      margin-bottom: 24px;
    }

    ${props =>
      props.inverse &&
      `
        ${Art} {
          order: 2;
        }
    `}
  
`;

const Art = styled.figure`
  margin: 0;
  border-radius: 50%;
  max-width: 380px;
  width: 100%;
`;

export default Products;
