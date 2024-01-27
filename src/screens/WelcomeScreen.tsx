import {View, Text, StatusBar, Pressable} from 'react-native';
import React, {FC} from 'react';

import LottieView from 'lottie-react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import GlobalStyle from '../utils/constants/GlobalStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const WelcomeScreen: FC<Props> = ({navigation}) => {
  return (
    <View className="flex-1 items-center justify-end bg-slate-900">
      <StatusBar barStyle={'light-content'} backgroundColor={'rgb(15,23,42)'} />
      <LottieView
        source={require('../assets/animation/welcomescreen.json')}
        autoPlay
        loop
        style={{width: 300, height: 300}}
      />
      <Text
        className="text-6xl text-white -ml-10"
        style={[GlobalStyle.textExtraBold, {}]}>
        Let's Get Started
      </Text>

      <Text
        className="mt-3 text-white/80 mx-7  text-justify"
        style={[GlobalStyle.textRegular, {lineHeight: 16}]}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic vitae
        accusamus maxime ipsum ratione repellendus facere impedit voluptatem.
        Voluptatibus id
      </Text>

      <View className="mb-10 w-full px-8 mt-8">
        <Pressable
          className="bg-white py-5 rounded-2xl w-full justify-center items-center"
          onPress={() => navigation.navigate('Login')}>
          <Text className="text-slate-900" style={GlobalStyle.textSemiBold}>
            Login Now
          </Text>
        </Pressable>
        <Pressable
          className="bg-white py-5 rounded-2xl w-full justify-center items-center mt-3"
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text className="text-slate-900" style={GlobalStyle.textSemiBold}>
            Register Your Business
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WelcomeScreen;
