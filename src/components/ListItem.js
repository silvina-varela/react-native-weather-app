import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { weatherType } from "../utilities/weatherType";
import moment from "moment";

const ListItem = ({ dt_txt, min, max, condition }) => {
  const { item, date, temp, dateTextWrapper, tempWrapper } = styles;
  return (
    <View style={item}>
      <View style={dateTextWrapper}>
        <Text style={date}>{moment(dt_txt).format("dddd")}</Text>
      </View>
      <View style={tempWrapper}>
        <Text style={temp}>{`${Math.round(min)}° / ${Math.round(max)}°`}</Text>
        <Feather
          name={weatherType[condition]?.icon}
          size={25}
          color={"white"}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  temp: {
    color: "white",
    fontSize: 16,
    marginRight: 10,
  },
  date: {
    color: "white",
    fontSize: 16,
  },
  dateTextWrapper: {
    flexDirection: "column",
  },
  tempWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ListItem;
