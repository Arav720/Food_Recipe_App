import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './navigation'; // should NOT include NavigationContainer inside
import "./global.css";
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}
