import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories'  // make sure your path is correct!

export default function HomeScreen() {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('Chicken')

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      if (response?.data?.categories) {
        // Filter out Beef and Lamb
        const filtered = response.data.categories.filter(
          cat => cat.strCategory !== 'Beef' && cat.strCategory !== 'Lamb'&&cat.strCategory !== 'Pork'
        )
        setCategories(filtered)
      }
    } catch (err) {
      console.log('error:', err.message)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require('../assets/avatar.png')}
            style={{ width: hp(5.5), height: hp(5) }}
          />
          <BellIcon size={hp(4)} color="grey" />
        </View>

        {/* greetings */}
        <View className="mx-4 space-y-2 mb-2">
          <Text className="text-neutral-600" style={{ fontSize: hp(1.7) }}>
            Hello Arav!
          </Text>
          <Text className="font-semibold text-neutral-600" style={{ fontSize: hp(3.8) }}>
            Make your own food
          </Text>
          <Text className="font-semibold text-neutral-600" style={{ fontSize: hp(3.8) }}>
            Stay at
            <Text className="text-amber-400"> home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="gray"
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            style={{ fontSize: hp(1.7) }}
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="grey" />
          </View>
        </View>

        {/* categories */}
        {categories.length > 0 && (
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}

        {/* recipe list */}
        {/* You can render your recipes here */}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
