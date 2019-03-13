import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
// import { Container, Content, Left, Right, Icon } from "native-base";
import Header from "./Header";

class NowPlaying extends React.Component {
  state = {
    Poster: null,
    Name: null,
    Popularity: null,
    ReleaseDate: null,
    Overview: null
  };

  getData = async event => {
    var url = "https://api.themoviedb.org/3";
    apiKey = "8367b1854dccedcfc9001204de735470";

    urlRequest = `${url}/movie/now_playing?api_key=${apiKey}`;

    const apiCall = await fetch(urlRequest);
    const data = await apiCall.json();

    //     Randomizing the movies to show
    let qtdMovies = data.results.length;
    let random = Math.floor(Math.random() * qtdMovies);

    //     Grabing the data and setting the state variables
    this.state.Poster = `http://image.tmdb.org/t/p/original${
      data.results[random].poster_path
    }`;
    this.state.Name = data.results[random].original_title;
    this.state.Popularity = data.results[random].popularity;
    this.state.ReleaseDate = data.results[random].release_date;
    this.state.Overview = data.results[random].overview;

    this.setState({
      state: this.state
    });
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.getData();
    });
  }

  render() {
    return (
      <View>
        <Header style={styles.headerStyle} title="Now Playing" />
        {this.state.Poster && (
          <View style={styles.container}>
            <Image style={styles.Image} source={{ uri: this.state.Poster }} />
            <Text style={styles.Title}>{this.state.Name}</Text>
            <Text>Popularity: {this.state.Popularity}</Text>
            <Text>Release Date: {this.state.ReleaseDate}</Text>
            <Text style={styles.Overview}>{this.state.Overview}</Text>
          </View>
        )}
      </View>
    );
  }
}

export default NowPlaying;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  Image: {
    width: 200,
    height: 270
  },
  Title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic"
  },
  Overview: {
    marginTop: 15
  }
});
