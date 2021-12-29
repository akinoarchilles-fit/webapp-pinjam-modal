import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import * as React from 'react';
import { Dimensions, Platform, StyleSheet, useColorScheme, View } from 'react-native';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import DateForm from '../components/overlay/date.overlay';
import OptionForm from '../components/overlay/modal.overlay';
import Constants from '../resources/Constants';
import AdditionalDataScreen from '../screens/AdditionalDataScreen';
import BankingDataScreen from '../screens/BankingDataScreen';
import DocumentUploadScreen from '../screens/DocumentUploadScreen';
import LandingScreen from '../screens/LandingScreen';
import LoanCalculationScreen from '../screens/LoanCalculationScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import OnlineStoreDataScreen from '../screens/OnlineStoreDataScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import PersonalDataScreen from '../screens/PersonalDataScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SuccessApplyScreen from '../screens/SuccessApply';
import TermsConditionScreen from '../screens/TermsConditionScreen';
import { RootStackParamList } from '../types';


export default function Navigation() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? Constants.PMDarkTheme : Constants.PMDefaultTheme;
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer
        theme={theme}>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const theme = useTheme();
  return (
    <View style={{backgroundColor: theme.colors.background}}>
      <View style={styles.viewport}>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={LandingScreen}  options={{headerShown: false}}/>
          <Stack.Screen name="TermsCondition" component={TermsConditionScreen} options={{headerShown: false}} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
          <Stack.Screen name="LoanCalculation" component={LoanCalculationScreen} options={{headerShown: false}} />
          <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} options={{headerShown: false}} />
          <Stack.Screen name="PersonalData" component={PersonalDataScreen} options={{headerShown: false}}/>
          <Stack.Screen name="OnlineStoreData" component={OnlineStoreDataScreen} options={{headerShown: false}}/>
          <Stack.Screen name="BankingData" component={BankingDataScreen} options={{headerShown: false}}/>
          <Stack.Screen name="AdditionalData" component={AdditionalDataScreen} options={{headerShown: false}}/>
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Success" component={SuccessApplyScreen} options={{headerShown: false}}/>
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{headerShown: false}}/>
          <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
            <Stack.Screen name="OptionForm" component={OptionForm} options={{headerShown: false}}/>
            <Stack.Screen name="DateForm" component={DateForm} options={{headerShown: false}}/>
          </Stack.Group>
        </Stack.Navigator>
      </View>
    </View>
  );
  }

const styles = StyleSheet.create({
  viewport: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: Dimensions.get('screen').width > 480 ? 480 : Dimensions.get('screen').width,
    height: Platform.OS === 'web' ? '100vh' : '100%'
  }
})