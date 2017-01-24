import React from 'react';

const Landing = () =>
  <div className="landing">
    <section>
      <h1>H1 Heading is big!</h1>
      <h2>Landing</h2>
      <h3>Why not an H3?</h3>
      <p>Lab blerb goes on and on and on and on. Ok is this enough? Probably not, but ok.</p>
    </section>
    <section className="landing__buttons-section">
      <div className="landing__buttons-container">
        <button className="button button--ghost-white">Sign-In</button>
        <button className="button button--ghost-navy">Back to Classifying</button>
        <button className="button button--ghost-teal">Button</button>
      </div>
      <div className="landing__buttons-container">
        <button className="button button--full-white">Button</button>
        <button className="button button--full-teal">Button</button>
        <button className="button button--full-alert">Button</button>
      </div>
    </section>
  </div>;

export default Landing;
