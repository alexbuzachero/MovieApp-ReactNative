import React from "react";
import { StyleSheet, Text, View, Button, Image, FlatList } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import SegmentedControlTab from "react-native-segmented-control-tab";
import Header from "./Header";
import MovieCard from "./MovieCard";

class ListPage extends React.Component {
  state = {
    Position: 0,
    TitleResult: "Popular Movies",
    DataResult: null,
    searchEntry: null,
    mTitle: ""
  };

  handleIndexChange = async index => {
    await this.setState({
      ...this.state,
      Position: index
    });
    this.searchData(index);
  };

  // Build the structure to create the full URl requisition
  searchData = async index => {
    var url = "https://api.themoviedb.org/3/movie/";
    apiKey = "8367b1854dccedcfc9001204de735470";

    switch (index) {
      case 0:
        this.state.searchEntry = "popular";
        this.state.mTitle = `Popular Movies`;
        break;
      case 1:
        this.state.searchEntry = "top_rated";
        this.state.mTitle = `Top rated Movies`;
        break;
      case 2:
        this.state.searchEntry = "upcoming";
        this.state.mTitle = `Upcoming Movies`;
        break;
      default:
        this.state.searchEntry = "popular";
        break;
    }

    // Getting the information from the web and load the data variable
    urlRequest = `${url}${
      this.state.searchEntry
    }?api_key=${apiKey}&language=en-US&page=1`;

    const apiCall = await fetch(urlRequest);
    const data = await apiCall.json();

    this.state.DataResult = data.results;

    this.state.TitleResult = this.state.mTitle;

    this.setState({
      state: this.state
    });
  };

  // Load the list when lkoa the list screen
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.handleIndexChange(this.state.Position);
    });
  }

  // Fetching the data using MovieCard Component
  handleContent(item, index) {
    ImageURL = `http://image.tmdb.org/t/p/original`;

    if (this.state.DataResult != null) {
      if (index == 0) {
        return (
          <MovieCard
            title={item.title}
            image={ImageURL + item.poster_path}
            overview={item.overview}
          />
        );
      } else if (index == 1) {
        return (
          <MovieCard
            title={item.title}
            image={ImageURL + item.poster_path}
            overview={item.overview}
          />
        );
      } else if (index == 2) {
        return (
          <MovieCard
            title={item.title}
            image={ImageURL + item.poster_path}
            overview={item.overview}
          />
        );
      }
    } else {
      return <Text>No movies to show</Text>;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.headerStyle} title={this.state.mTitle} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SegmentedControlTab
            values={["Popular", "Top Rated", "Upcoming"]}
            selectedIndex={this.state.Position}
            onTabPress={this.handleIndexChange}
            tabsContainerStyle={styles.tabsContainerStyle}
            tabStyle={styles.tabStyle}
            borderRadius={0}
            activeTabStyle={styles.activeTabStyle}
            tabTextStyle={styles.tabTextStyle}
          />
          <Text style={styles.title}>{this.state.mTitle}</Text>
          <View style={styles.listArea}>
            {/* Using Flat List to render the Data */}
            <FlatList
              data={this.state.DataResult}
              renderItem={({ item }) => (
                <View>{this.handleContent(item, this.state.Position)}</View>
              )}
              keyExtractor={item => `${item.id}`}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default ListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerStyle: {
    flex: 1
  },
  NowPlaying: {
    color: "yellow"
  },
  listArea: {
    flex: 1,
    maxHeight: 560
  },
  tabsContainerStyle: {
    borderRadius: 0
  },
  tabStyle: {
    backgroundColor: "white",
    height: 40,
    borderColor: "black"
  },
  activeTabStyle: {
    backgroundColor: "red"
  },
  tabTextStyle: {
    color: "black"
  },
  title: {
    marginTop: 7,
    marginBottom: 7,
    fontWeight: "bold",
    fontSize: 17
  }
});
