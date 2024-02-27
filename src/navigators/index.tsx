import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import BottomTab from './BottomTab';
import AddKarcha from '../screens/AddKarcha';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import GlobalStyle from '../utils/constants/GlobalStyle';

const Stack = createNativeStackNavigator();

const Navigators = () => {
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen name="Tab" component={BottomTab} />
          <Stack.Screen
            name="AddKarcha"
            component={AddKarcha}
            options={{
              headerShown: true,
              title: 'Add Record',
              headerShadowVisible: false,
              headerTitleStyle: {
                ...GlobalStyle.textBold,
              },
            }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default Navigators;
