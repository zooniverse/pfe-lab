import React from 'react';

const Landing = () =>
  <div className="content-section">
    <section>
      <h1>H1 Heading is big!</h1>
      <h2>Landing</h2>
      <h3>Why not an H3?</h3>
      <p>Lab blerb goes on and on and on and on. Ok is this enough? Probably not, but ok.</p>
    </section>
    <section style={{ background: '#CBCCCB' }}>
      <div style={{ padding: '50px' }}>
        <button className="button button--ghost-white">Sign-In</button>
        <div style={{ marginTop: '50px' }} />
        <button className="button button--ghost-navy">Back to Classifying</button>
        <div style={{ marginTop: '50px' }} />
        <button className="button button--ghost-teal">Button</button>
        <div style={{ marginTop: '50px' }} />
        <button className="button button--full-white">Button</button>
        <div style={{ marginTop: '50px' }} />
        <button className="button button--full-teal">Button</button>
        <div style={{ marginTop: '50px' }} />
        <button className="button button--full-alert">Button</button>
      </div>
    </section>
  </div>;

export default Landing;
