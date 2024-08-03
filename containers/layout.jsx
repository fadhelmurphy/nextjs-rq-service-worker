import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/Navigation';

const Layout = ({ children, pageTitle = null, pageDescription }) => {
  return (
    <div className="container">
      <Head>
        <title>{pageTitle ? `${pageTitle} | Nu Movies` : 'Home | Nu Movies'}</title>
        <meta name="description" content={pageDescription || 'Nu Movies'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>
      <Navigation />
      <main>{children}</main>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        main {
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default Layout;
