import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store, createStore, combineReducers, Reducer } from 'redux';
import { Route, Switch } from 'react-router-dom';
import {
  connectRouter,
  ConnectedRouter,
  RouterState
} from 'connected-react-router';
import { createBrowserHistory, History } from 'history';

interface ApplicationState {
  router: RouterState;
}

interface AppProps {
  store: Store<ApplicationState>;
  history: History;
}

function createRootReducer(history: History): Reducer<any, any> {
  return combineReducers({
    router: connectRouter(history)
  });
}

function configureStore(history: History): Store<ApplicationState> {
  return createStore(createRootReducer(history));
}

const history: History = createBrowserHistory();

const store: Store<ApplicationState> = configureStore(history);

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/roadmap" component={() => <div>roadmap</div>} />
        <Route path="/backlog" component={() => <div>backlog</div>} />
        <Route path="/sprint" component={() => <div>sprint</div>} />
        <Route path="/" component={() => <div>Not Found</div>} />
      </Switch>
    );
  }
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root')
);
