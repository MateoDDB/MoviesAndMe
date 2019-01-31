import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
// Components/Search.js
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'

class Search extends React.Component {

  constructor(props){
    super(props)
    this.page = 0
    this.totalPages = 0
    this.state = {
      films: [],
      isLoading: false
    }
    this.searchedText = ""
  }

  _loadFilms() {
    this.setState({ isLoading: true })
    if (this.searchedText.length > 0){
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films: [ ...this.state.films, ...data.results ],
          isLoading: false
        })
      })
    }
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
        <ActivityIndicator size= 'large' />
        </View>
      )
    }
  }
  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: []
    }, () => {
      this._loadFilms()
    })
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("Buttons", { idFilm: idFilm })
  }

  render() {
    console.log("RENDER");
    return (
      <View style={styles.main_contener}>
        <TextInput onSubmitEditing={() => this._loadFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder="Titre du film"/>
        <Button style={{height: 50}} title='Rechercher' onPress={()=> this._searchFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          onEndReachThreashold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              this._loadFilms()
            }
          }}
          renderItem={({item}) => <FilmItem film={item} _displayDetailForFilm={this._displayDetailForFilm}/>}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_contener: {
    flex: 1
  },
  textinput: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
