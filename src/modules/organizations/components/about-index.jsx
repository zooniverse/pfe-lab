import React from 'react';
import { Link } from 'react-router';

const EditAbout = ({ children, navItems, params }) =>
  <div>
    <nav>
      <ul>
        {navItems.map(item =>
          <li key={item.label}>
            <Link to={`/organizations/${params.id}/about/${item.to}`}>
              {item.label}
            </Link>
          </li>,
        )}
      </ul>
    </nav>
    <p>
      In this section:<br />
      Header 1 will appear <strong>orange</strong>.<br />
      Headers 2 - 6 and hyperlinks will appear <strong>dark-blue</strong>.
    </p>
    <div>
      {children}
    </div>
  </div>;

EditAbout.propTypes = {
  children: React.PropTypes.node,
  navItems: React.PropTypes.arrayOf(React.PropTypes.object),
  params: React.PropTypes.shape({ id: React.PropTypes.string }),
};

EditAbout.defaultProps = {
  navItems: [
    { to: 'team', label: 'Team' },
    { to: 'results', label: 'Results' },
    { to: 'education', label: 'Education' },
  ],
};

export default EditAbout;
