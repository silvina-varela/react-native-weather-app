import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/components/Tabs";
import { useGetWeather } from "./src/hooks/useGetWeather";
import ErrorItem from "./src/components/ErrorItem";
const App = () => {
  const [loading, error, weather] = useGetWeather();

  if (weather && weather.list && !loading) {
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

export default App;
