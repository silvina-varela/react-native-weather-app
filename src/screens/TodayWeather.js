import React, { useEffect, useState, createContext, useContext } from "react";
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { weatherType } from "../utilities/weatherType";
import SettingsModal from "../components/SettingsModal";

const TodayWeather = ({ weatherData, city }) => {
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().getHours();
      let time;

      if (currentTime >= 5 && currentTime < 17) {
        time = "morning";
      } else if (currentTime >= 17 && currentTime < 20) {
        time = "afternoon";
      } else {
        time = "night";
      }

      setTimeOfDay(time);
    };

    updateTime(); // Call the function once to update the time immediately

    // Update the time every minute (adjust as needed)
    const intervalId = setInterval(updateTime, 60000);

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const imageURL = {
    morning: require("../../assets/day-bg.jpg"),
    afternoon: require("../../assets/sunset-bg.jpg"),
    night: require("../../assets/night-bg.jpg"),
  };

  const {
    main: { temp, feels_like, temp_max, temp_min, humidity },
    weather,
  } = weatherData;

  const weatherCondition = weather[0]?.main;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSettingsPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const {
    container,
    mainWrapper,
    mainTextWrapper,
    imageLayout,
    cityStyle,
    descriptionStyle,
    secondaryTextWrapper,
    secondaryText,
    columnStyle,
    mainTemp,
    secondaryTemp,
    cityWrapper,
    rowWrapper,
  } = styles;
  return (
    <View style={container}>
      <ImageBackground source={imageURL[timeOfDay]} style={imageLayout}>
        <View style={cityWrapper}>
          <Text style={cityStyle}>{city.name}</Text>
          <TouchableOpacity onPress={handleSettingsPress}>
            <Feather name="settings" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={mainWrapper}>
          <Feather
            name={weatherType[weatherCondition]?.icon}
            size={50}
            color="white"
            style={mainTemp}
          />
          <View style={mainTextWrapper}>
            <Text style={mainTemp}>{Math.round(temp)}°</Text>
            <View style={columnStyle}>
              <Text style={secondaryTemp}>{Math.round(temp_max)}°</Text>
              <Text style={secondaryTemp}>{Math.round(temp_min)}°</Text>
            </View>
          </View>
          <View style={secondaryTextWrapper}>
            <Text style={[secondaryText, descriptionStyle]}>
              {weather[0]?.description}
            </Text>
            <Text
              style={secondaryText}
            >{`RealFeel ${Math.round(feels_like)}°`}</Text>
          </View>
        </View>
      </ImageBackground>
      <SettingsModal
        visible={isModalVisible}
        onClose={handleCloseModal}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainWrapper: {
    flex: 2,
    marginTop: 32,
    alignItems: "center",
  },
  imageLayout: {
    flex: 1,
  },
  mainTemp: {
    fontSize: 48,
    color: "white",
  },
  secondaryTemp: {
    fontSize: 15,
    color: "lightblue",
  },
  secondaryText: {
    fontSize: 15,
    color: "white",
    lineHeight: 25,
  },
  descriptionStyle: {
    textTransform: "capitalize",
  },
  mainTextWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  secondaryTextWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  rowWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 10,
  },
  columnStyle: {
    flexDirection: "column",
    marginLeft: 10,
  },
  cityStyle: {
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    fontSize: 20,
  },
  cityWrapper: {
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default TodayWeather;
