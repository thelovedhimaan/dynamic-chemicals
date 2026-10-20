import React from 'react';
import styled from 'styled-components';

import { Container } from '@components/global';

const CONTACT_METHODS = [
  { label: 'Call', value: '+91 99967 77453', href: 'tel:+919996777453' },
  {
    label: 'WhatsApp',
    value: '+91 99967 77453',
    href: 'https://wa.me/919996777453',
  },
  {
    label: 'Email',
    value: 'thedynamicchemicals@gmail.com',
    href: 'mailto:thedynamicchemicals@gmail.com',
  },
];

const Contact = () => (
  <FooterWrapper id="contact">
    <StyledContainer>
      <Intro>
        <Eyebrow>Contact</Eyebrow>
        <h2>Tell us what your operation needs</h2>
        <p>
          Reach Dynamic Chemicals by phone, WhatsApp, or email for product and
          catalogue enquiries.
        </p>
      </Intro>
      <ContactGrid>
        {CONTACT_METHODS.map(method => (
          <ContactLink
            href={method.href}
            key={method.label}
            rel={method.href.startsWith('http') ? 'noopener noreferrer' : null}
            target={method.href.startsWith('http') ? '_blank' : null}
          >
            <span>{method.label}</span>
            <strong>{method.value}</strong>
          </ContactLink>
        ))}
      </ContactGrid>
    </StyledContainer>
  </FooterWrapper>
);

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.color.primary};
  color: white;
  padding: 72px 0;
`;

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 48px;
  align-items: start;

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
  }
`;

const Intro = styled.div`
  h2,
  p {
    color: white;
  }

  h2 {
    margin: 12px 0 20px;
  }
`;

const Eyebrow = styled.p`
  font-weight: 700;
  letter-spacing: 0.08em;
  margin: 0;
  text-transform: uppercase;
`;

const ContactGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const ContactLink = styled.a`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 10px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  justify-content: space-between;
  padding: 18px 20px;
  text-decoration: none;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.16);
  }

  span {
    opacity: 0.78;
  }
`;

export default Contact;
