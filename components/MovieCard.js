import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

const ListItem = props => (
  <View style={styles.Container}>
    <Image style={styles.Image} source={{ uri: props.image }} />
    <View style={styles.Content}>
      <Text style={styles.title}>{props.title}</Text>
      <Text>{props.overview}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center"
  },
  Content: {
    flexDirection: "column",
    paddingLeft: 5,
    paddingRight: 5,
    width: 280
  },
  title: {
    fontWeight: "bold"
  },
  Image: {
    width: 70,
    height: 100
  }
});

export default ListItem;
