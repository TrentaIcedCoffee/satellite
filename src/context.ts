import * as React from 'react';

interface Error {
  uuid: string;
  message: string;
}

interface User {
  uuid: string;
  username: string;
}

interface RootState {
  readonly errors: Error[];
  readonly user: any | null;
}

export const INIT_ROOT_STATE: RootState = {
  errors: [],
  user: null
};

export const RootContext = React.createContext({
  rootState: INIT_ROOT_STATE,
  setRootState: (rootState: RootState) => {}
});
