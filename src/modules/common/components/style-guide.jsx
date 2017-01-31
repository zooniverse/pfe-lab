import React from 'react';

import SiteNav from './site-nav';
import SiteFooter from './site-footer';

const StyleGuide = () =>
  <div>
    <header className="layout__header">
      <SiteNav />
    </header>
    <main className="layout__main">
      <div className="style-guide">
        <section>
          <h1>H1 Heading is big!</h1>
          <h2>Here is H2, just for you.</h2>
          <h3>Why not an H3?</h3>
          <p>Paragraph blerb goes on and on and on and on. Ok is this enough? Probably not, but oh well.</p>
        </section>
        <section className="style-guide__buttons-section">
          <div className="style-guide__buttons-container">
            <button className="button button--ghost-white">Sign-In</button>
            <button className="button button--ghost-navy">Back to Classifying</button>
            <button className="button button--ghost-teal">Button</button>
          </div>
          <div className="style-guide__buttons-container">
            <button className="button button--full-white">Button</button>
            <button className="button button--full-teal">Button</button>
            <button className="button button--full-alert">Button</button>
          </div>
        </section>
      </div>
    </main>
    <SiteFooter />
  </div>;

export default StyleGuide;
