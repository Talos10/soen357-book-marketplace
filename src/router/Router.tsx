import { Route, Switch } from 'react-router-dom';
import {
  Login,
  SearchPage,
  AdvancedSearch,
  BookInfo,
  Sell,
  UserSettings
} from '../pages';
import Guard from './Guard';
import { Container } from '../components';

export default function Router() {

  return (
    <Switch>
      <Guard path="/" allowIf={true} component={Login}  redirect="/search" exact />
      <>
        <Container>
          {/* Search */}
          <Guard path="/search" allowIf={true} component={SearchPage} exact />
          <Guard path="/search/book-info/:id" allowIf={true} component={BookInfo} exact />

          {/* User Settings */}
          <Guard path="/settings" allowIf={true} component={UserSettings} exact />

          {/* Advanced Search */}
          <Guard path="/advanced-search" allowIf={true} component={AdvancedSearch} exact />

          {/* Sell Books */}
          <Guard path="/sell" allowIf={true} component={Sell} exact />
        </Container>
      </>
    </Switch>
  );
}
