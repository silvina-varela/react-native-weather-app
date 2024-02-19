import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = () => {
    const onPress = ()=>{
        console.log("press")
    }
    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={onPress}> 
            <Text style={styles.buttonText}>Hello</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
container: {
    elevation: 8,
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 5
},
buttonText: {
    fontSize: 15,
    color: "white",
    alignSelf: "center"
}
})
export default CustomButton;