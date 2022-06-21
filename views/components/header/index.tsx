import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from 'views/routes';
import './styles.scss';

export const Header: React.FC = () => {
  return (
    <header id={'header-component'}>
      <div className="d-flex justify-content-between align-center container">
        <h2>JobsNow</h2>
        <ul className="d-flex link-container">
          {routes
            .filter((v) => v.displayedInHeader)
            .map(({ name, url }, index) => (
              <li className="link" key={index}>
                <NavLink className={(navData) => (navData.isActive ? 'active' : '')} to={url}>
                  {name}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </header>
  );
};
