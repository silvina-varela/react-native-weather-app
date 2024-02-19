import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const SettingsModal = ({ visible, onClose }) => {
  const { container, optionWrapper, closeButton, optionTitleText, optionText } =
    styles;

  const handlePressTemperatureUnit = () => {
    console.log("alert");
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
        <TouchableOpacity
          style={closeButton}
          onPress={handlePressTemperatureUnit}
        >
          <View style={optionWrapper}>
            <Text style={optionTitleText}>Temperature units</Text>
            <Text style={[optionTitleText, optionText]}>Celsius</Text>
          </View>
        </TouchableOpacity>
      </View>
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
