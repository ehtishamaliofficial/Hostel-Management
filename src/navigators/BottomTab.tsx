import {View, Text, Touchable, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  HomeIcon as HomeOutlineIcon,
  UserCircleIcon as UserCircleIconOutline,
  BellIcon as BellIconOutline,
  CircleStackIcon as CircleStackIconOutline,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeSolidIcon,
  UserCircleIcon as UserCircleIconSolid,
  BellIcon as BellIconSolid,
  CircleStackIcon as CircleStackIconSolid,
} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          height: hp('9%'),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon(props) {
            if (props.focused) {
              return (
                <HomeSolidIcon
                  strokeWidth={2.5}
                  color={'orange'}
                  height={30}
                  width={30}
                />
              );
            }

            return (
              <HomeOutlineIcon
                strokeWidth={2.5}
                color={'white'}
                height={30}
                width={30}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={Home}
        options={{
          tabBarIcon(props) {
            if (props.focused) {
              return (
                <CircleStackIconSolid
                  strokeWidth={2.5}
                  color={'orange'}
                  height={30}
                  width={30}
                />
              );
            }

            return (
              <CircleStackIconOutline
                strokeWidth={2.5}
                color={'white'}
                height={30}
                width={30}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Add Karcha"
        component={Home}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              className="-mt-7"
              onPress={() => {
                navigation.navigate('AddKarcha');
              }}>
              <View className="bg-white p-1 rounded-full">
                <View
                  style={{
                    backgroundColor: 'orange',
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    +
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Home}
        options={{
          tabBarIcon(props) {
            if (props.focused) {
              return (
                <BellIconSolid
                  strokeWidth={2.5}
                  color={'orange'}
                  height={30}
                  width={30}
                />
              );
            }

            return (
              <BellIconOutline
                strokeWidth={2.5}
                color={'white'}
                height={30}
                width={30}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon(props) {
            if (props.focused) {
              return (
                <UserCircleIconSolid
                  strokeWidth={2.5}
                  color={'orange'}
                  height={30}
                  width={30}
                />
              );
            }

            return (
              <UserCircleIconOutline
                strokeWidth={2.5}
                color={'white'}
                height={30}
                width={30}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
