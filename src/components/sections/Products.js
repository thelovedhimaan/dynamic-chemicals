import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Section, Container } from '@components/global';

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
          sourceInstanceName: { eq:"art" }
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
      <Section id="products/services" >
           <h2 style={{textAlign:'center',fontWeight:'800'}}>PRODUCTS / SERVICES</h2>
        <Container>
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
              <Img className='images' fluid={data.art_fast.childImageSharp.fluid} />
            </Art>
          </Grid>
          <Grid inverse>
            <Art>
              <Img className='images' fluid={data.art_industry.childImageSharp.fluid} />
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
              <Img className='images' fluid={data.art_learn.childImageSharp.fluid} />
            </Art>
          </Grid>
          <Grid inverse>
          <Art >
              <Img className='images' fluid={data.art_construction.childImageSharp.fluid} />
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
          <Grid >
            <div>
              <h2>All Housekeeping Products</h2>
              <p>
               <ul>
                 <li>Toilet Cleaner</li>
                 <li>Air Freshners</li>
                 <li>Liquid Hand Soap</li>
                 <li>Dish Wash</li>
                 <li>Phenyl</li>
                 <li>Glass Cleaner </li>
               </ul>
              </p>
            </div>
            <Art>
              <Img className='images' fluid={data.art_house.childImageSharp.fluid} />
            </Art>
          </Grid>
          
        </Container>
      </Section>
    )}
  />
);

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 40px;
  text-align: right;
  align-items: center;
  justify-items: center;
  margin: 24px 0;
  // border: 3px solid #354EB4;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  
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
  border-radius:50%;
  max-width: 380px;
  width: 100%;
`;

export default Products;
