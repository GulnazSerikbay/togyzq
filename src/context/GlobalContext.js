import { createContext, useReducer } from 'react';
import reducer from './Reducer';

const initialState = {
  username: `Player 1`,
};

const GlobalContext = createContext(initialState);

function ContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUsername = (username) => {
    dispatch({
      type: 'SET_USERNAME',
      payload: username,
    });
  };

  
  return (
    <GlobalContext.Provider value={{ state, setUsername }}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export { ContextProvider, GlobalContext };