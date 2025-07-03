import React from "react";

type AppState = {
  mode: string;
  lm: string;
  fullBox: boolean;
};

const initialState: AppState = {
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  lm: localStorage.getItem("lm") ? localStorage.getItem("lm")! : "en",
  fullBox: false
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
};
type Action =
  | { type: "SWITCH_MODE" }
  | { type: "SWITCH_LANGUAGE_MODE" }
  | { type: "SET_FULLBOX_ON" }
  | { type: "SET_FULLBOX_OFF" }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SWITCH_MODE":
      localStorage.setItem("mode", state.mode === "dark" ? "light" : "dark");
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" };
    case "SWITCH_LANGUAGE_MODE":
      // Lógica para cambiar el modo de idioma (en o es)
      localStorage.setItem("lm", state.lm === "en" ? "es" : "en");
      return {
        ...state,
        lm: state.lm === "en" ? "es" : "en",
      };
    case "SET_FULLBOX_ON":
      return { ...state, fullBox: true };
    case "SET_FULLBOX_OFF":
      return { ...state, fullBox: false };

    default:
      return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
});
function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  );
  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
