import React from 'react';

import Layout from '@common/Layout';
import Navbar from '@common/Navbar';

import Header from '@sections/Header';
import About from '@sections/About';
import Products from '@sections/Products';
import Images from '@sections/Images';
import Faq from '@sections/Faq';
import Contact from '@sections/Contact';

const IndexPage = () => (
  <Layout>
    <Navbar />
    <Header />
    <Products />
    <About />
    {/* <Images /> */}
    <Faq />
    <Contact />
  </Layout>
);

export default IndexPage;
