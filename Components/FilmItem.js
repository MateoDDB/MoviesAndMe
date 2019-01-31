// Components/FilmItem.js
import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import {getImageFromApi} from '../API/TMDBApi'


class FilmItem extends React.Component {
  render() {
    const {film, _displayDetailForFilm} = this.props
    return (
      <TouchableOpacity
      onPress={() => (displayDetailForFilm(film.id))}
      style={styles.main_container}>
        <Image
        style={styles.main_image}
        source={{uri: getImageFromApi(film.poster_path)}}
        ></Image>
        <View style={styles.main_text}>
          <View style={styles.main_text_vote}>
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.main_vote}>{film.vote_average}</Text>
          </View>
          <View style={styles.content_description}>
            <Text style={styles.main_description} numberOfLines={4}>{film.overview}</Text>
          </View>
          <View style={styles.content_sorti}>
            <Text style={styles.main_sorti}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  main_image: {
    width: 120,
    height: 180,
    margin: 5
  },
  main_text: {
    flex: 1,
    flexDirection: 'column',
    padding: 5
  },
  main_text_vote: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30
  },
  title_text: {
    flex:1,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: 'bold',
  },
  main_vote: {
    fontSize: 20,
    opacity: 0.8,
  },
  content_description: {
    flex: 7,
    justifyContent: 'center',
  },
  main_description: {
    fontSize: 16
  },
  content_sorti: {
    flex: 1,
    alignItems: 'flex-end'
  },
  main_sorti: {
    fontSize: 14
  },
})

export default FilmItem
