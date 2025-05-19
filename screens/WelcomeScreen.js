import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSharedValue } from 'react-native-reanimated';
import Animated, {
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';


const WelcomeScreen = () => {

  const ring1paddding = useSharedValue(0);
  const ring2paddding = useSharedValue(0);

  const navigation =useNavigation();
  useEffect( ()=>{
    ring1paddding.value=0;
    ring2paddding.value=0;
    setTimeout(()=> ring1paddding.value= withSpring(ring1paddding.value+hp(5)),100)
    setTimeout(()=> ring2paddding.value= withSpring(ring2paddding.value+hp(5)),300)

    setTimeout(()=> navigation.navigate('Home'),2500)
  },[])
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

         {/* logo image with ring */}
       <Animated.View className="bg-white/20 rounded-full" style={{padding:ring2paddding}}>
       <Animated.View className="bg-white/20 rounded-full"style={{padding:ring1paddding}}>
          <Image
            source={require('../assets/food_logo.png')}
            style={{width:hp(20), height:hp(20)}}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punch line */}

      <View className='flex items-center space-y-2'>
        <Text style={{fontSize: hp(7)}} className="font-bold text-white tracking-widest ">
          Foody
        </Text>
        <Text style={{fontSize: hp(2)}} className="font-medium text-white tracking-widest">
          Food is always right
        </Text>
        </View>
    </View>
  );
};

export default WelcomeScreen;


