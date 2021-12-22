
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';
import BankingForm from '../resources/forms/BankingForms';


export default function OTPVerificationScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  function onNextPress() {
    navigation.navigate('Success');
  }

  return (
    <View style={styles.main}>
      <View style={[styles.container, { borderColor: theme.colors.surface }]}>
        <PaperComponent.Headline style={styles.title}>Verifikasi OTP</PaperComponent.Headline>
        <View style={[styles.separator, { backgroundColor: theme.colors.surface }]} />
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
                  error={errors.facebook}
                  editable={true}
                  onChangeText={(value: string) => onChange(value)}
                />
              )}
            />
          </View>
        </View>
      </View>
      <PaperComponent.Button onPress={Lodash.debounce(onNextPress, 1000, {
        leading: true,
        trailing: false,
      })} buttonStyle={styles.btnNext}>
        Lanjutkan
      </PaperComponent.Button>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 30,
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
  btnNext: {
    marginTop: 30
  },
  formContainer: {
    flex: 1,
    margin: 10,
    width: '100%',
    alignItems: 'center'
  },
  formField: {
    marginVertical: 5,
  },
});
