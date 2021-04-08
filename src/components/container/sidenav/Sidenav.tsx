import { Dispatch, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {
  Home,
  Widgets,
  SupervisorAccount,
  CalendarToday,
  Build,
  Timeline,
  QueryBuilder,
  CollectionsBookmark
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
        <div className={styles.SidenavLogo}>Book Marketplace</div>

        <div className="Sidenav__button">
          <Button
            color={location.pathname.indexOf('home') === 0 ? 'primary' : 'default'}
            component={Link}
            to="/home">
            <Home style={{ paddingRight: 16 }} />
            Home
          </Button>
        </div>

          <div className="Sidenav__button">
            <Button
              color={location.pathname.indexOf('/admin') === 0 ? 'primary' : 'default'}
              component={Link}
              to="/admin">
              <SupervisorAccount style={{ paddingRight: 16 }} />
              User Settings
            </Button>
          </div>

        <div className="Sidenav__button">
          <Button
            color={location.pathname.indexOf('/accounting') === 0 ? 'primary' : 'default'}
            component={Link}
            to="/accounting">
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
