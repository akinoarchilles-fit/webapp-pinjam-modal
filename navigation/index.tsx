import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Dimensions, StyleSheet, useColorScheme, View } from 'react-native';
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
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Daftar' }} />
          <Stack.Screen name="LoanCalculation" component={LoanCalculationScreen} options={{ title: 'Tentukan Nilai & Tenor Pinjaman' }} />
          <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} options={{ title: 'Unggah Dokumen' }} />
          <Stack.Screen name="PersonalData" component={PersonalDataScreen} options={{ title: 'isi Data Diri' }} />
          <Stack.Screen name="OnlineStoreData" component={OnlineStoreDataScreen} options={{ title: 'Isi Data Toko Online' }} />
          <Stack.Screen name="BankingData" component={BankingDataScreen} options={{ title: 'Isi Data Rekening Pribadi' }} />
          <Stack.Screen name="AdditionalData" component={AdditionalDataScreen} options={{ title: 'Isi Data Keterangan Tambahan' }} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} options={{ title: 'Verifikasi OTP' }} />
          <Stack.Screen name="Success" component={SuccessApplyScreen} options={{headerShown: false}}/>
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          <Stack.Group  screenOptions={{ presentation: 'modal' }}>
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
    width: Dimensions.get('screen').width > 600 ? 480 : Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  }
})