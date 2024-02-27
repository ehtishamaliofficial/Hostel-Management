import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from 'react-native-heroicons/outline';
import GlobalStyle from '../../utils/constants/GlobalStyle';
import {FormikProps} from 'formik';

type Props = {
  loading: boolean;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  Formik: FormikProps<LoginFormValues>;
};

const LoginForm: React.FC<Props> = ({
  loading,
  showPassword,
  setShowPassword,
  Formik,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View className="flex-1 bg-white relative">
      <Image
        source={require('../../assets/jpg/login.jpeg')}
        resizeMode="cover"
        blurRadius={40}
        className="absolute w-full h-full"
      />
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}>
          <ActivityIndicator size="large" color={'#fff'} />
        </View>
      )}

      <View
        className="bg-slate-900 justify-center items-center rounded-b-2xl relative"
        style={{height: hp(40)}}>
        <LottieView
          source={require('../../assets/animation/login.json')}
          autoPlay
          loop
          style={{width: 300, height: 300}}
        />

        <Pressable
          onPress={() => navigation.goBack()}
          className="absolute top-3 left-3 p-2 justify-center items-center bg-orange-900 rounded-tl-2xl rounded-br-2xl">
          <ArrowLeftIcon
            size={wp(5)}
            color={'white'}
            onPress={() => navigation.goBack()}
            strokeWidth={2.5}
          />
        </Pressable>
      </View>

      <View className="flex-1 px-4 mt-4">
        <Text className="text-4xl text-slate-900" style={GlobalStyle.textBold}>
          Login
        </Text>
        <Text className="text-base" style={GlobalStyle.textRegular}>
          Please enter your credentials
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: hp(2),
          }}>
          <View className="mt-8 space-y-4">
            <View className="space-y-2 ">
              <Text
                style={GlobalStyle.textSemiBold}
                className="pl-1 text-slate-900">
                Phone Number or Email
              </Text>
              <View
                className={`border border-gray-400 px-2 rounded justify-center" ${
                  Formik.touched.usernameOrPhoneNumber &&
                  Formik.errors.usernameOrPhoneNumber
                    ? 'border-red-500'
                    : ''
                }`}>
                <TextInput
                  placeholder="Enter your phone number or email"
                  style={GlobalStyle.textSemiBold}
                  autoCapitalize="none"
                  id="usernameOrPhoneNumber"
                  onChangeText={e =>
                    Formik.setFieldValue('usernameOrPhoneNumber', e)
                  }
                  onBlur={Formik.handleBlur('usernameOrPhoneNumber')}
                  value={Formik.values.usernameOrPhoneNumber}
                />
              </View>
              {Formik.touched.usernameOrPhoneNumber &&
                Formik.errors.usernameOrPhoneNumber && (
                  <Text
                    style={GlobalStyle.textRegular}
                    className="text-red-500 text-xs ml-0.5 ">
                    {Formik.errors.usernameOrPhoneNumber}
                  </Text>
                )}
            </View>

            <View className="space-y-2">
              <Text
                style={GlobalStyle.textSemiBold}
                className="pl-1 text-slate-900">
                Password
              </Text>
              <View
                className={`border border-gray-400 px-2 rounded justify-center items-center flex-row ${
                  Formik.touched.password && Formik.errors.password
                    ? 'border-red-500'
                    : ''
                } `}>
                <TextInput
                  placeholder="************"
                  style={GlobalStyle.textRegular}
                  className="flex-1"
                  secureTextEntry={showPassword}
                  autoCapitalize="none"
                  id="password"
                  onChangeText={e => Formik.setFieldValue('password', e)}
                  onBlur={Formik.handleBlur('password')}
                  value={Formik.values.password}
                />
                {showPassword ? (
                  <EyeSlashIcon
                    size={hp(3)}
                    color={'black'}
                    onPress={() => setShowPassword(!showPassword)}
                    strokeWidth={2.5}
                  />
                ) : (
                  <EyeIcon
                    size={hp(3)}
                    color={'black'}
                    onPress={() => setShowPassword(!showPassword)}
                    strokeWidth={2.5}
                  />
                )}
              </View>

              {Formik.touched.password && Formik.errors.password && (
                <Text
                  style={GlobalStyle.textRegular}
                  className="text-red-500 text-xs ml-0.5 ">
                  {Formik.errors.password}
                </Text>
              )}
            </View>

            <Pressable
              className="bg-slate-900 py-5 rounded-2xl w-full justify-center items-center mt-3"
              onPress={() => Formik.handleSubmit()}>
              <Text className="text-white" style={GlobalStyle.textSemiBold}>
                Login
              </Text>
            </Pressable>
          </View>

          <View className="py-2  justify-end items-center">
            <View className="flex-row items-center ">
              <Text className="text-slate-500 flex-row items-center h-6">
                Don't have an account?{' '}
              </Text>
              <Pressable
                onPress={() => navigation.navigate('Register')}
                className="-mt-1">
                <Text
                  className="text-slate-900 text-lg"
                  style={GlobalStyle.textSemiBold}>
                  Register
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LoginForm;
