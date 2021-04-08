import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Home,
} from '../pages';
import Guard from './Guard';
import { Container } from '../components';
import { useAuth } from '../contexts/Auth';

export default function Router() {
  const auth = useAuth();

  return (
    <Switch>
      <Guard path="/" component={Login} redirect="/home" exact />
      <>
        <Container>
          {/* Home */}
          <Guard path="/home" component={Home} exact />
        </Container>
      </>
    </Switch>
  );
}
