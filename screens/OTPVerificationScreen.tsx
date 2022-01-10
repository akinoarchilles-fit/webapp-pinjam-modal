
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PaperComponent from '../components/paper';
import { setFormData } from '../store/actions/AdditionalData.action';
import { getOTP, nextHandler } from '../store/actions/OTPVerification.action';
import { selectFormData, selectFormStep, selectLoadingForm } from '../store/selectors/form.selector';


function OTPVerificationScreen({
  loadingform,
  formData,
  currentStep,
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
    nextHandler({...data}, formData, currentStep)
    navigation.navigate('Success');
  }

  return (
    <View style={styles.main}>
      {
        loadingform ? <ActivityIndicator/> : (
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
      <View style={styles.footer}>
        <PaperComponent.Button onPress={Lodash.debounce(handleSubmit(onNextPress), 1000, {
          leading: true,
          trailing: false,
        })} buttonStyle={styles.btnNext}>
          Lanjutkan
        </PaperComponent.Button>
      </View>
    </View>
  );
}

const mapStateToProps = createStructuredSelector({
  loadingForm: selectLoadingForm,
  formData: selectFormData,
  currentStep: selectFormStep,
});

const mapDispatchToProps = (dispatch:any) => ({ 
  setFormData: (payload:any) => dispatch(setFormData(payload)),
  getOTPRequest: () => dispatch(getOTP()),
  verifyOTP: (otp) => dispatch(verifyOTP()),
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
