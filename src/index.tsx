import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory, History } from 'history';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'semantic-ui-css/semantic.min.css';
import Header from './pages/Header';
import Backlog from './pages/Backlog';
import Index from './pages/Index';
import Error from './pages/Error';
import { INIT_ROOT_STATE, RootContext } from './context';
import Coplay from './pages/Coplay';
import tranlations from './translations';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: ['en', 'zh'],
  resources: tranlations
});

const history: History = createBrowserHistory();

const pathSet: Set<string> = new Set<string>()
  .add('/roadmap')
  .add('/backlog')
  .add('/sprint')
  .add('/');

interface AppProps {
  history: History;
}

const App: React.FC<AppProps> = (props) => {
  const [rootState, setRootState] = React.useState(INIT_ROOT_STATE);
  const value = { rootState, setRootState };

  const pathname: string = props.history.location.pathname;

  return (
    <RootContext.Provider value={value}>
      <BrowserRouter>
        <Error />
        {rootState.user === null ? (
          <Index />
        ) : (
          <div>
            <Header />
            <Switch>
              <Route
                path="/roadmap"
                component={() => <div>Not Implemented</div>}
              />
              <Route path="/backlog" component={() => <Backlog />} />
              <Route
                path="/sprint"
                component={() => <div>Not Implemented</div>}
              />
              <Route path="/" component={() => <Coplay />} />
            </Switch>
          </div>
        )}
      </BrowserRouter>
    </RootContext.Provider>
  );
};

ReactDOM.render(<App history={history} />, document.getElementById('root'));
