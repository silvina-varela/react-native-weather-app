import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Tabs";
import ErrorItem from "./ErrorItem";
import { useWeatherContext } from "../hooks/useWeather";

const Main = () => {
  const { loading, error, weather } = useWeatherContext();

  if (weather && weather?.list && !loading) {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Tabs weather={weather} />
        </NavigationContainer>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.container}>
        {error ? (
          <ErrorItem />
        ) : (
          <ActivityIndicator size={"large"} color={"blue"} />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default Main;
