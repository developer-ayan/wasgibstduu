import React from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import Feather from 'react-native-vector-icons/Feather';

export default function Ads() {

  return (
    <ScrollView style={{ flex: 1, }}>
      <View style={styles.MainView}>
        {/* icon back */}
        <View>
          <Text style={styles.IconView}><Feather name='arrow-left' style={styles.BackIcon} size={25} /></Text>
          <Text style={styles.CreateAd}>Create Ad</Text>
          <Text style={styles.Advertisments}>Create new advertisement</Text>
        </View>
        <View style={styles.Categories}>
          <Text style={styles.CategoriesHeading}>CATEGORY</Text>
          <TextInput placeholder='Select a category' style={styles.Input} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.AdTitle}>AD TITLE</Text>
          <TextInput style={styles.Input} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.AdTitle}>DISCRIPTION</Text>
          <TextInput style={styles.Input} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.AdTitle}>PRICE</Text>
          <TextInput style={styles.Input} />
        </View>
        <View style={{ marginTop: 20, marginBottom: 40 }}>
          <Text style={styles.AdTitle}>CITY</Text>
          <TextInput placeholder='Select City' style={styles.Input} />
        </View>
      </View>

    </ScrollView >
  )
}


const styles = StyleSheet.create({
  MainView: {
    paddingLeft: 13,
    paddingRight: 13,
    backgroundColor: 'white'
  },
  IconView: {
    marginTop: 10
  },
  BackIcon: {
    color: 'black'
  },
  CreateAd: {
    marginTop: 10,
    color: 'black',
    fontSize: 25
  },
  Advertisments: {
    marginTop: 5,
    color: '#b1b1b1',
    fontWeight: 'bold'
  },
  Categories: {
    marginTop: 30
  },
  CategoriesHeading: {
    color: '#8B8B8B',
    marginBottom: 5,
    fontSize: 13,
    opacity: 0.7,
    fontWeight: 'bold'
  },
  Input: {
    padding: 15,
    backgroundColor: '#f7f7f7',
    fontWeight: 'bold',
    opacity: 0.7,
    color: '#ababab',
    fontSize: 15,
    fontFamily: 'Roboto'
  },
  AdTitle: {
    color: '#8B8B8B',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 13,
    opacity: 0.7
  }

})
