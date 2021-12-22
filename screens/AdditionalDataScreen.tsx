
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';
import BankingForm from '../resources/forms/BankingForms';


export default function AdditionalDataScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { bankingNameForm, bankingNumberForm } = BankingForm;

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
        <PaperComponent.Headline style={styles.title}>Isi Data Keterangan Tambahan</PaperComponent.Headline>
        <View style={[styles.separator, { backgroundColor: theme.colors.surface }]} />
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        <View style={styles.formContainer}>
          <View style={[styles.formField]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={Lodash.debounce(
                () =>
                  navigation.navigate('OptionForm'),
                1000,
                {
                  leading: true,
                  trailing: false,
                },
              )}>
              <PaperComponent.Input
                dense
                label={'Tujuan Pinjaman'}
                value={'Foya Foia'}
                placeholder={'Tujuan Pinjaman'}
                onChangeText={() => { }}
                onEndEditing={() => { }}
                editable={false}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                onPressIn={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm'),
                  1000,
                  {
                    leading: true,
                    trailing: false,
                  },
                )}
                right={
                  <TextInput.Icon
                    name={'chevron-down'}
                    onPress={() =>
                      navigation.navigate('OptionForm')
                    }
                  />
                }
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.formField]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={Lodash.debounce(
                () =>
                  navigation.navigate('OptionForm'),
                1000,
                {
                  leading: true,
                  trailing: false,
                },
              )}>
              <PaperComponent.Input
                dense
                label={'Pilihan Pembayaran'}
                value={'Cicilan'}
                placeholder={'Pilihan Pembayaran'}
                onChangeText={() => { }}
                onEndEditing={() => { }}
                editable={false}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                onPressIn={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm'),
                  1000,
                  {
                    leading: true,
                    trailing: false,
                  },
                )}
                right={
                  <TextInput.Icon
                    name={'chevron-down'}
                    onPress={() =>
                      navigation.navigate('OptionForm')
                    }
                  />
                }
              />
            </TouchableOpacity>
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
    width: '100%'
  },
  formField: {
    marginVertical: 5,
  },
});
