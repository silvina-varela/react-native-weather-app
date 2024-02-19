import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Counter = () => {
  const { container, title } = styles;

  const [count, setCount] = useState(0);
  return (
    <View style={container}>
      <Text style={title}>{`count: ${count}`}</Text>
      <Button
        color="red"
        title="Increase"
        onPress={() => {
          setCount(count + 1);
        }}
      />
      <Button
        color="green"
        title="Decrease"
        onPress={() => {
          setCount(count - 1);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  title: {
    alignSelf: "center",
    fontSize: 25,
    marginTop: 25,
  },
});

export default Counter;
