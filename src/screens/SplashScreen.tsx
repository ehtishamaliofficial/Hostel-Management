import {View, Text, StatusBar, Image} from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
    <View className="flex-1 bg-slate-900 justify-center items-center">
      <StatusBar barStyle="light-content" backgroundColor="rgb(15,23,42)" />

      <Image
        source={require('../assets/png/logo.png')}
        tintColor={'white'}
        className="w-40 h-40"
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
