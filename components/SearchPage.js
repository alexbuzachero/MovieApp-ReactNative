import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SegmentedControlIOS,
  TextInput,
  SectionList,
  FlatList,
  Image
} from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import SegmentedControlTab from "react-native-segmented-control-tab";
import Header from "./Header";
import MovieCard from "./MovieCard";

class SearchPage extends React.Component {
  state = {
    Position: 1,
    searchEntryData: null,
    searchText: "",
    searchEntry: "movie",
    searchTitle: "Movie",
    subtitle: ""
  };

  handleIndexChange = async index => {
    await this.setState({
      ...this.state,
      Position: index
    });
    if (this.state.searchText != "") {
      this.searchData(index);
    }
  };

  // Build the structure to create the full URl requisition
  searchData = async index => {
    var url = "https://api.themoviedb.org/3/search/";
    apiKey = "8367b1854dccedcfc9001204de735470";

    switch (index) {
      case 0:
        this.state.searchEntry = "movie";
        this.state.searchTitle = "Movie";
        this.state.subtitle = `Movie results for ${this.state.searchText}:`;
        break;
      case 1:
        this.state.searchEntry = "person";
        this.state.searchTitle = "Person";
        this.state.subtitle = `${
          this.state.searchText
        } is in the following movies:`;
        break;
      case 2:
        this.state.searchEntry = "tv";
        this.state.searchTitle = "TV";
        this.state.subtitle = `TV Show results for ${this.state.searchText}:`;
        break;
      default:
        this.state.searchEntry = "movie";
        this.state.searchTitle = "Movie";
        break;
    }

    // Getting the information from the web and load the data variable
    urlRequest = `${url}${
      this.state.searchEntry
    }?api_key=${apiKey}&language=en-US&query=${this.state.searchText}`;

    const apiCall = await fetch(urlRequest);
    const data = await apiCall.json();

    this.state.searchEntryData = data.results;

    this.setState({
      state: this.state
    });
  };

  // Fetching the data using MovieCard Component
  handleContent(item, index) {
    ImageURL = `http://image.tmdb.org/t/p/original`;

    if (this.state.searchEntryData != null) {
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
            title={item.known_for[0].title}
            image={ImageURL + item.known_for[0].poster_path}
            overview={item.known_for[0].overview}
          />
        );
      } else if (index == 2) {
        return (
          <MovieCard
            title={item.name}
            image={ImageURL + item.poster_path}
            overview={item.overview}
          />
        );
      }
    } else {
      return <Text>No movies to show</Text>;
    }
  }
  handleTextFieldSearch = async => {
    this.getSearchResults(this.state.Position);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          style={styles.headerStyle}
          title={this.state.searchTitle + " Search"}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SegmentedControlTab
            values={["Movies", "People", "TV Show"]}
            selectedIndex={this.state.Position}
            onTabPress={this.handleIndexChange}
            tabsContainerStyle={styles.tabsContainerStyle}
            tabStyle={styles.tabStyle}
            borderRadius={0}
            activeTabStyle={styles.activeTabStyle}
            tabTextStyle={styles.tabTextStyle}
          />
          <View style={styles.searchBackground}>
            <TextInput
              style={styles.searchBar}
              onChangeText={searchText => this.setState({ searchText })}
              placeholder="Type your search here"
              enablesReturnKeyAutomatically={true}
              returnKeyType="search"
            />
          </View>

          <Text style={styles.title}>{this.state.subtitle}</Text>
          <View style={styles.listArea}>
            {/* Using Flat List to render the Data */}
            <FlatList
              data={this.state.searchEntryData}
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

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  headerStyle: {
    flex: 1
  },
  listArea: {
    flex: 1,
    maxHeight: 560
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    height: 35,
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    width: 250,
    backgroundColor: "white"
  },
  searchBackground: {
    backgroundColor: "#F34444",
    width: "100%",
    alignItems: "center"
  },
  title: {
    marginTop: 7,
    fontWeight: "bold",
    fontSize: 17
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
  }
});
