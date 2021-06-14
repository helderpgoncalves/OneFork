import React from "react";
import { Provider } from 'react-redux';
import RootStackContainer from "./navigation/routes";
import { setTopLevelNavigator } from "./services/utils";

import store from "./services/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <RootStackContainer
        ref={(navigatorRef) => {
          setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
};

export default App;
