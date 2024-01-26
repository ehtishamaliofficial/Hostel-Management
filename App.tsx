import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigators from './src/navigators';
import SplashScreen from './src/screens/SplashScreen';
import {ToastProvider} from 'react-native-toast-notifications';
import {
  CheckIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from 'react-native-heroicons/outline';
import GlobalStyle from './src/utils/constants/GlobalStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppIsReady(true);
    }, 2000);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastProvider
          placement="top"
          duration={5000}
          animationType="slide-in"
          animationDuration={250}
          successColor="green"
          dangerColor="red"
          warningColor="orange"
          normalColor="gray"
          icon={
            <ExclamationCircleIcon
              color={'white'}
              height={18}
              width={18}
              strokeWidth={2}
            />
          }
          successIcon={
            <CheckIcon color={'white'} height={18} width={18} strokeWidth={2} />
          }
          dangerIcon={
            <XMarkIcon color={'white'} height={18} width={18} strokeWidth={2} />
          }
          warningIcon={
            <ExclamationCircleIcon
              color={'white'}
              height={18}
              width={18}
              strokeWidth={2}
            />
          }
          textStyle={{
            fontSize: hp(1.8),
            ...GlobalStyle.textMedium,
          }}
          swipeEnabled={true}>
          <NavigationContainer>
            {appIsReady ? <Navigators /> : <SplashScreen />}
          </NavigationContainer>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
