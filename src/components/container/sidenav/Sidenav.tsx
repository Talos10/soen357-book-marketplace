import React, { Dispatch, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {
  SupervisorAccount,
  CollectionsBookmark,
  Search
} from '@material-ui/icons';

import styles from './Sidenav.module.css';
import './Sidenav.scss';

interface Props {
  showSidenav: boolean;
  toggleSidenav: Dispatch<boolean>;
}

export default function Sidenav({ showSidenav, toggleSidenav }: Props) {
  const location = useLocation();

  // When the page changes, we want the sidenav to close.
  useEffect(() => {
    toggleSidenav(false);
  }, [location, toggleSidenav]);

  return (
    <aside className={`Sidenav ${styles.Sidenav} ${showSidenav ? styles.sidenavOpen : ''}`}>
      <nav>
        <div className={styles.SidenavLogo}>University Book Bazaar</div>

        <div className="Sidenav__button">
          <Button
            color={location.pathname.indexOf('/search') === 0 ? 'primary' : 'default'}
            component={Link}
            to="/search">
            <Search style={{ paddingRight: 16 }} />
            Search
          </Button>
        </div>

          <div className="Sidenav__button">
            <Button
              color={location.pathname.indexOf('/settings') === 0 ? 'primary' : 'default'}
              component={Link}
              to="/settings">
              <SupervisorAccount style={{ paddingRight: 16 }} />
              User Settings
            </Button>
          </div>

        <div className="Sidenav__button">
          <Button
            color={location.pathname.indexOf('/sell') === 0 ? 'primary' : 'default'}
            component={Link}
            to="/sell">
            <CollectionsBookmark style={{ paddingRight: 16 }} />
            Sell
          </Button>
        </div>
      </nav>

      {showSidenav && (
        <button
          onClick={() => toggleSidenav(!showSidenav)}
          className={`SidenavShadow ${styles.SidenavShadow}`}
        />
      )}
    </aside>
  );
}
