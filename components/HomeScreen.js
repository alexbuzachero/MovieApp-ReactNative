import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import NowPlaying from "./NowPlaying";
import Search from "./SearchPage";
import Lists from "./ListPage";

// Using TabNavigator to change between the 3 main pages
const homeNavigator = createBottomTabNavigator(
  {
    NowPlaying: NowPlaying,
    Search: Search,
    Lists: Lists
  },
  {
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "black",
      labelStyle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 15
      },
      style: {
        backgroundColor: "red",
        fontSize: 20,
        justifyContent: "flex-start"
      }
    }
  }
);

export default createAppContainer(homeNavigator);
