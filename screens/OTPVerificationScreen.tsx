
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';


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
    paddingVertical: 3,
  }
});
