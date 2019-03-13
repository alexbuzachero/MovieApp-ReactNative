import React, { Component } from "react";
import { AppRegistry, Text, View, StyleSheet } from "react-native";

export default class Header extends Component {
  // constructor(props){
  //     super(props);
  //     this.state = {
  //         name:'Brad',
  //         showName: true,
  //         message: this.props.message
  //     }
  // }

  // static defaultProps = {
  //     message: 'Hi There'
  // }

  render() {
    return (
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>React Native Movie App</Text>
        <Text style={styles.headerSection}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerWrapper: {
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: "red",
    alignItems: "center"
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold"
  },
  headerSection: {
    color: "white",
    fontSize: 20,
    fontStyle: "italic"
  }
});

AppRegistry.registerComponent("Header", () => Header);
