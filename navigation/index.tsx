import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import * as React from 'react';
import { Dimensions, Platform, StyleSheet, useColorScheme, View } from 'react-native';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import { Provider } from 'react-redux';
import DateForm from '../components/overlay/date.overlay';
import DeviceInfoOverlay from '../components/overlay/deviceinfo.overlay';
import ImagePreviewOverlay from '../components/overlay/imagepreview.overlay';
import OptionForm from '../components/overlay/modal.overlay';
import UploadGuideModal from '../components/overlay/uploadguide.overlay';
import PaperComponent from '../components/paper';
import Constants from '../resources/Constants';
import Fonts from '../resources/Fonts';
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
import store from '../store/store';
import { RootStackParamList } from '../types';

export default function Navigation() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? Constants.PMDarkTheme : Constants.PMDefaultTheme;
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer
          theme={theme}>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();
enum ScreenStack {
  TermsCondition = 'Syarat dan Ketentuan',
  Register = 'Isi Data Registrasi',
  LoanCalculation = 'Tentukan Nilai & Tenor Pinjaman',
  DocumentUpload = 'Unggah Dokumen',
  PersonalData = 'Isi Data Diri',
  OnlineStoreData = 'Isi Data Toko Online',
  BankingData = 'Isi Data Rekening Pribadi',
  AdditionalData = 'Isi Data Keterangan Tambahan',
  OTPVerification = 'Verifikasi OTP',
  UploadGuide = 'Perhatian',
}

function RootNavigator() {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <View style={styles.viewport}>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TermsCondition" component={TermsConditionScreen} options={{ header: () => (<PaperComponent.Appbar hideLeftComponent title={ScreenStack.TermsCondition} />) }} />
          <Stack.Screen name="LoanCalculation" component={LoanCalculationScreen} options={{ header: () => (<PaperComponent.Appbar hideLeftComponent title={ScreenStack.LoanCalculation} />) }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ header: () => (<PaperComponent.Appbar hideLeftComponent title={ScreenStack.Register} />) }} />
          <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} options={{ header: () => (<PaperComponent.Appbar hideLeftComponent title={ScreenStack.DocumentUpload} />) }} />
          <Stack.Screen name="PersonalData" component={PersonalDataScreen} options={{ header: () => (<PaperComponent.Appbar hideLeftComponent title={ScreenStack.PersonalData} />) }} />
          <Stack.Screen name="OnlineStoreData" component={OnlineStoreDataScreen} options={{ header: () => (<PaperComponent.Appbar hideLeftComponent title={ScreenStack.OnlineStoreData} />) }} />
          <Stack.Screen name="BankingData" component={BankingDataScreen} options={{ header: () => (<PaperComponent.Appbar hideLeftComponent title={ScreenStack.BankingData} />) }} />
          <Stack.Screen name="AdditionalData" component={AdditionalDataScreen} options={{ header: () => (<PaperComponent.Appbar hideLeftComponent title={ScreenStack.AdditionalData} />) }} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} options={{ header: () => (<PaperComponent.Appbar hideLeftComponent title={ScreenStack.OTPVerification} />) }} />
          <Stack.Screen name="Success" component={SuccessApplyScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ headerShown: false }} />
          <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
            <Stack.Screen name="OptionForm" component={OptionForm} options={{ headerShown: false }} />
            <Stack.Screen name="DateForm" component={DateForm} options={{ headerShown: false }} />
            <Stack.Screen name="UploadGuideOverlay" component={UploadGuideModal} options={{ headerShown: false }} />
            <Stack.Screen name="ImagePreviewOverlay" component={ImagePreviewOverlay} options={{ header: () => (<PaperComponent.Appbar type='modal' appbarStyle={{ borderBottomWidth: 0 }} />) }} />
            <Stack.Screen name="DeviceInfoOverlay" component={DeviceInfoOverlay} options={{ header: () => (<PaperComponent.Appbar type='modal' appbarStyle={{ borderBottomWidth: 0 }} />) }} />
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Fonts.semiBold,
  },
})