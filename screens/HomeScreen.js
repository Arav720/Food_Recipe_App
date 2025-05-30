import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView
} from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';

import Categories from '../components/Categories';
import Recipes from '../components/Recipes';

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Chicken');
  const [meals, setMeals] = useState([]);

  // 1) fetch and filter categories once
  const getCategories = async () => {
    try {
      const response = await axios.get(
        'https://themealdb.com/api/json/v1/1/categories.php'
      );
      if (response?.data?.categories) {
        const filtered = response.data.categories.filter(
          cat =>
            cat.strCategory !== 'Beef' &&
            cat.strCategory !== 'Lamb' &&
            cat.strCategory !== 'Pork'
        );
        setCategories(filtered);
      }
    } catch (err) {
      console.log('getCategories error:', err.message);
    }
  };

  // 2) fetch meals every time activeCategory changes
  const getRecipes = async category => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response?.data?.meals) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log('getRecipes error:', err.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // whenever user taps a category chip...
  useEffect(() => {
    if (activeCategory) {
      getRecipes(activeCategory);
    }
  }, [activeCategory]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar + bell */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require('../assets/avatar.png')}
            style={{ width: hp(5.5), height: hp(5) }}
          />
          <BellIcon size={hp(4)} color="grey" />
        </View>

        {/* greeting */}
        <View className="mx-4 space-y-2 mb-2">
          <Text
            className="text-neutral-600"
            style={{ fontSize: hp(1.7) }}
          >
            Hello Arav!
          </Text>
          <Text
            className="font-semibold text-neutral-600"
            style={{ fontSize: hp(3.8) }}
          >
            Make your own food
          </Text>
          <Text
            className="font-semibold text-neutral-600"
            style={{ fontSize: hp(3.8) }}
          >
            stay at
            <Text className="text-amber-400"> home</Text>
          </Text>
        </View>

        {/* search */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="gray"
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            style={{ fontSize: hp(1.7) }}
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color="grey"
            />
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

        {/* recipe grid */}
        <View>
          <Recipes categories={categories} meals={meals} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});
