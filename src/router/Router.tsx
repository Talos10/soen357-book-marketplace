import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Home,
} from '../pages';
import Guard from './Guard';
import { Container } from '../components';

export default function Router() {

  return (
    <Switch>
      <Guard allowIf={true} path="/" redirect="/home" exact />
      <>
        <Container>
          {/* Home */}
          <Guard path="/home" allowIf={true} component={Home} exact />
        </Container>
      </>
    </Switch>
  );
}
