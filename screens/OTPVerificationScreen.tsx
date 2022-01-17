
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, useTheme, Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PaperComponent from '../components/paper';
import { setFormData } from '../store/actions/AdditionalData.action';
import { confirmOTP, getOTP, nextHandler } from '../store/actions/OTPVerification.action';
import { selectApplyErrorMessage, selectFormData, selectFormStep, selectLoadingForm, selectOTPVerified, selectSuccessApply } from '../store/selectors/form.selector';


function OTPVerificationScreen({
  isOTPVerified,
  loadingForm,
  formData,
  currentStep,
  applyErrorMessage,
  getOTPRequest,
  verifyOTP,
  setFormData,
  nextHandler
}) {
  const navigation = useNavigation();
  const theme = useTheme();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const onNextPress = async(data: any) => {
    verifyOTP(formData[0].email, data.otp)
  }

  React.useEffect(() => {
    getOTPRequest(formData[0].email)
  }, [])

  React.useEffect(() => {
    if(isOTPVerified) {
      nextHandler({otp: getValues('otp')}, formData, currentStep)
      navigation.navigate('Success');
    }
  }, [isOTPVerified])

  return (
    <View style={styles.main}>
      {
        loadingForm ? <View style={{marginTop: 20}}><ActivityIndicator/></View> : (
          <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
            <View style={[styles.container, { borderColor: theme.colors.surface }]}>
              <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

              <View style={styles.formContainer}>
                <PaperComponent.Headline>Masukkan Kode Verifikasi</PaperComponent.Headline>
                <PaperComponent.Subheading style={{textAlign: 'center'}}>Kode verifikasi telah dikirim melalui SMS ke nomor handphone Anda</PaperComponent.Subheading>
                <View style={styles.formField}>
                  <Controller
                    name='otp'
                    control={control}
                    rules={{ required: true }}
                    defaultValue=''
                    render={({ field: { onChange, value } }) => (
                      <PaperComponent.Input
                        inputStyle={{textAlign: 'center'}}
                        value={value}
                        error={errors.otp}
                        editable={true}
                        onChangeText={(value: string) => onChange(value)}
                      />
                    )}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        )
      }
      {!loadingForm ? <View style={styles.footer}>
        <PaperComponent.Button onPress={Lodash.debounce(handleSubmit(onNextPress), 1000, {
          leading: true,
          trailing: false,
        })} buttonStyle={styles.btnNext}>
          {isOTPVerified ? 'Lanjutkan' : 'Periksa OTP'}
        </PaperComponent.Button>
      </View> : null
      }
      <Snackbar
        visible={applyErrorMessage !== null}
        duration={3000}
        onDismiss={() => {
          setFormData({applyErrorMessage: null})
        }}
      >
        {applyErrorMessage}
      </Snackbar>
    </View>
  );
}

const mapStateToProps = createStructuredSelector({
  isOTPVerified: selectOTPVerified,
  applyErrorMessage: selectApplyErrorMessage,
  isSuccessApply: selectSuccessApply,
  loadingForm: selectLoadingForm,
  formData: selectFormData,
  currentStep: selectFormStep,
});

const mapDispatchToProps = (dispatch:any) => ({ 
  setFormData: (payload:any) => dispatch(setFormData(payload)),
  getOTPRequest: (email:string) => dispatch(getOTP(email)),
  verifyOTP: (email: string, otp: string) => dispatch(confirmOTP(email, otp)),
  nextHandler: (payload:any, formData:any, currentStep:number) => dispatch(nextHandler(payload, formData, currentStep))
})

export default connect(mapStateToProps, mapDispatchToProps)(OTPVerificationScreen);

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  scrollContainer: {
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 30
  },
  separator: {
    height: 2,
    width: '100%'
  },
  normalText: {
    fontSize: 14,
    letterSpacing: 0.4,
  },
  boldText: {
    letterSpacing: 0.4,
  },
  formContainer: {
    padding: 10,
    paddingHorizontal: 15,
    width: '100%',
    alignItems: 'center',
  },
  formField: {
    marginVertical: 5,
  },
  footer: {
    paddingVertical: 10
  },
  btnNext: {
    height: 44,
    marginBottom: 10,
  }
});
