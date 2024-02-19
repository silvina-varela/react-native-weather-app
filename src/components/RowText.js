import React from 'react';
import { Text, View } from 'react-native';

const RowText = ({message1, message2, message1Styles, message2Styles, containerStyles}) => {
    return (
        <View style={containerStyles}>
          <Text style={message1Styles}>{message1}</Text>
          <Text style={message2Styles}>{message2}</Text>
        </View>
    );
};

export default RowText;