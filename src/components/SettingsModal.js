import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import TemperatureUnitsModal from "./TemperatureUnitsModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWeatherContext } from "../hooks/useWeather";

const SettingsModal = ({ visible, onClose }) => {
  const { container, optionWrapper, closeButton, optionTitleText, optionText } =
    styles;
  const [isUnitsModalVisible, setIsUnitsModalVisible] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState("metric");

  useEffect(() => {
    const loadTemperatureUnit = async () => {
      try {
        const savedUnit = await AsyncStorage.getItem("temperatureUnit");
        if (savedUnit !== null) {
          setTemperatureUnit(savedUnit);
        }
      } catch (error) {
        console.error("Error loading temperature unit:", error);
      }
    };

    loadTemperatureUnit();
  }, []);

  const handleUnitsPress = () => {
    setIsUnitsModalVisible(true);
  };

  const handleCloseUnitsModal = () => {
    setIsUnitsModalVisible(false);
  };

  const { setChangedUnit } = useWeatherContext();

  const handleGetTemperatureUnit = async (unit) => {
    try {
      setTemperatureUnit(unit);
      await AsyncStorage.setItem("temperatureUnit", unit);
      await setChangedUnit(unit);
      handleCloseUnitsModal();
    } catch (error) {
      console.error("Error saving temperature unit:", error);
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      presentationStyle={"fullScreen"}
    >
      <View style={container}>
        <TouchableOpacity style={closeButton} onPress={onClose}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={closeButton} onPress={handleUnitsPress}>
          <View style={optionWrapper}>
            <Text style={optionTitleText}>Temperature units</Text>
            <Text style={[optionTitleText, optionText]}>
              {temperatureUnit === "metric" ? "Celsius" : "Fahrenheit"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TemperatureUnitsModal
        visible={isUnitsModalVisible}
        onClose={handleCloseUnitsModal}
        handleChangeUnit={handleGetTemperatureUnit}
        temperatureUnit={temperatureUnit}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    top: 10,
  },
  optionWrapper: {
    marginTop: 30,
  },
  optionTitleText: {
    fontSize: 15,
  },
  optionText: {
    color: "grey",
  },
});

export default SettingsModal;
