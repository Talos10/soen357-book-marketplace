import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Home,
  AdvancedSearch,
  Sell
} from '../pages';
import Guard from './Guard';
import { Container } from '../components';

export default function Router() {

  return (
    <Switch>
      <Guard path="/" allowIf={true} component={Login}  redirect="/home" exact />
      <>
        <Container>
          {/* Home */}
          <Guard path="/home" allowIf={true} component={Home} exact />

          {/* Advanced Search */}
          <Guard path="/advanced-search" allowIf={true} component={AdvancedSearch} exact />

          {/* Sell Books */}
          <Guard path="/sell" allowIf={true} component={Sell} exact />
        </Container>
      </>
    </Switch>
  );
}
