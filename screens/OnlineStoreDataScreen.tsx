
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';
import OnlineStoreForm from '../resources/forms/OnlineStoreForms';


export default function OnlineStoreDataScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { fullNameForm, phoneNumberForm } = OnlineStoreForm;

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  function onNextPress() {
    navigation.navigate('BankingData');
  }

  return (
    <View style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, { borderColor: theme.colors.surface }]}>
          <PaperComponent.Headline style={styles.title}>Isi Data Toko Online</PaperComponent.Headline>
          <View style={[styles.separator, { backgroundColor: theme.colors.surface }]} />
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

          <View style={styles.formContainer}>
            <View style={styles.formField}>
              <Controller
                name='instagram'
                control={control}
                rules={{ required: true, pattern: fullNameForm.regexPattern }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={{ ...fullNameForm, label: 'Akun Instagram' }}
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
                rules={{ required: true, pattern: fullNameForm.regexPattern }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={{ ...fullNameForm, label: 'Akun Facebook' }}
                    value={value}
                    error={errors.facebook}
                    editable={true}
                    onChangeText={(value: string) => onChange(value)}
                  />
                )}
              />
            </View>
            <View style={styles.formField}>
              <Controller
                name='line'
                control={control}
                rules={{ required: true, pattern: fullNameForm.regexPattern }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={{ ...fullNameForm, label: 'Akun Line' }}
                    value={value}
                    error={errors.line}
                    editable={true}
                    onChangeText={(value: string) => onChange(value)}
                  />
                )}
              />
            </View>
            <View style={styles.formField}>
              <Controller
                name='tokopedia'
                control={control}
                rules={{ required: true, pattern: fullNameForm.regexPattern }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={{ ...fullNameForm, label: 'Akun Tokopedia' }}
                    value={value}
                    error={errors.tokopedia}
                    editable={true}
                    onChangeText={(value: string) => onChange(value)}
                  />
                )}
              />
            </View>
            <View style={styles.formField}>
              <Controller
                name='shopee'
                control={control}
                rules={{ required: true, pattern: fullNameForm.regexPattern }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={{ ...fullNameForm, label: 'Akun Shopee' }}
                    value={value}
                    error={errors.shopee}
                    editable={true}
                    onChangeText={(value: string) => onChange(value)}
                  />
                )}
              />
            </View>
            <View style={styles.formField}>
              <Controller
                name='whatsapp'
                control={control}
                rules={{ required: true, pattern: phoneNumberForm.regexPattern }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={{ ...phoneNumberForm, label: 'Whatsapp' }}
                    value={value}
                    error={errors.whatsapp}
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
                  label={'Daftar Industri'}
                  value={'Teknologi'}
                  placeholder={'Pilih industri'}
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
                  label={'Lama Usaha'}
                  value={'3 bulan'}
                  placeholder={'Pilih lama usaha'}
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
