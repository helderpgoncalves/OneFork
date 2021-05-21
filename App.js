import React from "react";
import RootStackContainer from "./navigation/routes";
import { setTopLevelNavigator } from "./utils";

const App = () => {
  return (
    <RootStackContainer
      ref={(navigatorRef) => {
        setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};

export default App;
