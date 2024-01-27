import {View, Text, Pressable} from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/constants/GlobalStyle';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../redux/slices/auth.slice';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(AuthActions.logout());
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Text>ProfileScreen</Text>

      <Pressable
        className="bg-red-500 p-3 rounded-lg w-[80%] justify-center items-center"
        onPress={handleLogout}>
        <Text
          style={GlobalStyle.textSemiBold}
          className="uppercase text-white ">
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
