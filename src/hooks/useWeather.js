import React, { useEffect, useState, createContext, useContext } from "react";
import * as Location from "expo-location";
import { WEATHER_API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WeatherContext = createContext();

const useWeather = () => {
    const [loading, setLoading] = useState(true);
    const [lat, setLat] = useState([]);
    const [lon, setLon] = useState([]);
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState([]);
    const [changedUnit, setChangedUnit] = useState("metric");
  
    const loadTemperatureUnit = async () => {
        try {
          const savedUnit = await AsyncStorage.getItem("temperatureUnit");
          if (savedUnit !== null) {
            return savedUnit
          }
        } catch (error) {
          console.error("Error loading temperature unit:", error);
        }
      };
  
      const fetchWeatherData = async () => {
        try {
          const unit = await loadTemperatureUnit();
          const response = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${unit || "metric"}`
          );
          const data = await response.json();
          setWeather(data);
        } catch (error) {
          setError("Could not fetch weather");
        } finally {
          setLoading(false);
        }
      };
      useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setError("Permission to access location was denied");
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setLat(location.coords.latitude);
          setLon(location.coords.longitude);
    
          await fetchWeatherData();
        })();
      }, [lat, lon]);
    
      useEffect(() => {
        fetchWeatherData();
      }, [changedUnit]);

  return {
    loading, error, weather, setChangedUnit, changedUnit
  };
};

export const WeatherProvider = ({ children }) => {
  const weather = useWeather();

  return (
    <WeatherContext.Provider value={weather}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  return useContext(WeatherContext);
};

export default useWeather;
