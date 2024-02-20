import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

const TemperatureUnitsModal = ({
  visible,
  onClose,
  temperatureUnit,
  handleChangeUnit,
}) => {
  const [checked, setChecked] = useState(temperatureUnit);

  const handleConfirmUnit = () => {
    handleChangeUnit(checked);
  };

  const { backdrop, modal, title, buttonsWrapper, buttonStyle } = styles;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={backdrop}>
        <View style={modal}>
          <Text style={title}>Select Unit</Text>
          <RadioButton.Group
            onValueChange={(value) => setChecked(value)}
            value={checked}
          >
            <RadioButton.Item label="Celsius" value="metric" />
            <RadioButton.Item label="Fahrenheit" value="imperial" />
          </RadioButton.Group>
          <View style={buttonsWrapper}>
            <TouchableOpacity onPress={handleConfirmUnit}>
              <Text style={buttonStyle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonsWrapper: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
  buttonStyle: { color: "blue", fontSize: 16 },
});
export default TemperatureUnitsModal;
