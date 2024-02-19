import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import ListItem from "../components/ListItem";
import { getForecast } from "../utilities/getForecast";

const UpcomingWeather = ({ weatherData }) => {
  const renderItem = ({ item }) => {
    return (
      <ListItem
        condition={item.condition}
        dt_txt={item.dt_txt}
        min={item.lowestTemp}
        max={item.highestTemp}
      />
    );
  };

  const { container } = styles;

  const [forecastData, setForecastData] = useState();

  useEffect(() => {
    const forecast = getForecast(weatherData);
    setForecastData(forecast);
  }, []);

  return (
    <SafeAreaView style={container}>
      <FlatList
        data={forecastData}
        renderItem={renderItem}
        keyExtractor={(item) => item.dt_txt}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "royalblue",
    justifyContent: "center",
    paddingTop: 40,
  },
});

export default UpcomingWeather;
