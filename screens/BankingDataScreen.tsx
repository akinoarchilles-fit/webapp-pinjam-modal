
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';
import BankingForm from '../resources/forms/BankingForms';


export default function BankingDataScreen() {
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
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, { borderColor: theme.colors.surface }]}>
          <PaperComponent.Headline style={styles.title}>Isi Data Rekening Pribadi</PaperComponent.Headline>
          <View style={[styles.separator, { backgroundColor: theme.colors.surface }]} />
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

          <View style={styles.formContainer}>
            <View style={styles.formField}>
              <Controller
                name='bankingNumber'
                control={control}
                rules={{ required: true }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={bankingNumberForm}
                    value={value}
                    error={errors.instagram}
                    editable={true}
                    onChangeText={(value: string) => onChange(value)}
                  />
                )}
              />
            </View>
            <View style={styles.formField}>
              <Controller
                name='facebook'
                control={control}
                rules={{ required: true, pattern: bankingNameForm.regexPattern }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={bankingNameForm}
                    value={value}
                    error={errors.facebook}
                    editable={true}
                    onChangeText={(value: string) => onChange(value)}
                  />
                )}
              />
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
                  label={'Nama Bank'}
                  value={'Bank Central Asia'}
                  placeholder={'Nama Bank'}
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
      </ScrollView>
      <PaperComponent.Button onPress={Lodash.debounce(handleSubmit(onNextPress), 1000, {
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
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  scrollContainer: {
    padding: 20
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
    padding: 20,
    width: '100%'
  },
  formField: {
    marginVertical: 5,
  },
  btnNext: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
});
