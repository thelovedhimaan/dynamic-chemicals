import React from 'react';
import Helmet from 'react-helmet';

const SEO_DATA = {
  description:
    'Industrial, water-treatment, descaling, housekeeping, and construction chemical products from Dynamic Chemicals in Ambala Cantt.',
  title: 'Dynamic Chemicals | Industrial and Water-Treatment Solutions',
  author: 'Dynamic Chemicals',
  keywords: [
    'industrial chemicals',
    'water treatment chemicals',
    'descaling chemicals',
    'housekeeping chemicals',
    'Ambala Cantt',
  ],
};

const SEO = () => {
  return (
    <Helmet>
      <meta property="og:title" content={SEO_DATA.title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={SEO_DATA.description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={SEO_DATA.title} />
      <meta name="twitter:description" content={SEO_DATA.description} />

      <meta name="description" content={SEO_DATA.description} />
      <meta name="keywords" content={SEO_DATA.keywords.join(', ')} />
      <meta name="author" content={SEO_DATA.author} />
      <title>{SEO_DATA.title}</title>
      <html lang="en" />
    </Helmet>
  );
};

export default SEO;
