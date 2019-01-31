import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      title: "Recherche"
    }
  },
  FilmDetail: {
    screen: FilmDetailScreen
  }
})

export default createAppContainer(SearchStackNavigator)
