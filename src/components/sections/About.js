import React from 'react';
import styled from 'styled-components';

import { Section, Container } from '@components/global';
import PDF from '../../CATALOG.pdf';

const About = () => (
  <Section id="about" accent>
    <StyledContainer>
      <Content>
        <Eyebrow>About the business</Eyebrow>
        <h2>Practical chemical products for day-to-day operations</h2>
        <p>
          Dynamic Chemicals supplies products across water treatment, boiler
          and cooling-tower maintenance, descaling, housekeeping, and
          construction applications.
        </p>
        <p>
          Visit us at 105 Green Park, Mahesh Nagar, Ambala Cantt., Haryana
          133001, or contact the team to discuss product requirements.
        </p>
        <CatalogueLink href={PDF} target="_blank" rel="noopener noreferrer">
          View product catalogue
        </CatalogueLink>
      </Content>
    </StyledContainer>
  </Section>
);

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  color: white;
  max-width: 780px;
  text-align: center;

  h2 {
    color: white;
    margin: 12px 0 24px;
  }

  p {
    color: white;
    font-size: 1.05rem;
    line-height: 1.8;
  }
`;

const Eyebrow = styled.p`
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const CatalogueLink = styled.a`
  border: 2px solid white;
  border-radius: 8px;
  color: white;
  display: inline-block;
  font-weight: 700;
  margin-top: 20px;
  padding: 12px 20px;
  text-decoration: none;

  &:hover,
  &:focus {
    background: white;
    color: ${props => props.theme.color.primary};
  }
`;

export default About;
