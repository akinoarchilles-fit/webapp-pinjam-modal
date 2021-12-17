import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Dimensions, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import Constants from '../resources/Constants';
import ApplyPartnerLoanFormScreen from '../screens/ApplyPartnerLoanForm';
import LandingScreen from '../screens/LandingScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SuccessApplyScreen from '../screens/SuccessApply';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? Constants.PMDarkTheme : Constants.PMDefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <View style={styles.viewport}>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={LandingScreen} options={{ title: 'Pinjam Modal!' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Daftar' }} />
        <Stack.Screen name="Apply" component={ApplyPartnerLoanFormScreen} options={{ title: 'Isi Data' }} />
        <Stack.Screen name="Success" component={SuccessApplyScreen} options={{headerShown: false}}/>
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          
        </Stack.Group>
      </Stack.Navigator>
    </View>
  );
  }

const styles = StyleSheet.create({
  viewport: {
    // justifyContent: 'center',
    // alignSelf: 'center',
    maxWidth: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  }
})