import React from "react";
import Main from "./src/components/Main";
import { WeatherProvider } from "./src/hooks/useWeather";

const App = () => {


 return(
  <WeatherProvider>
    <Main/>
  </WeatherProvider>
 )
};



export default App;
