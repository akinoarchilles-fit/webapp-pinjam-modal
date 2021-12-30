
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
  const durationList = ['3 Bulan', '6 Bulan', '9 Bulan'];
  const [selectedDuration, setDuration] = React.useState(0);

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  function onBackPress() {
    navigation.canGoBack() ? navigation.goBack() : null
  }

  function onNextPress() {
    navigation.navigate('BankingData');
  }

  return (
    <View style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, { borderColor: theme.colors.surface }]}>
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
                    navigation.navigate('OptionForm', {
                      alias: 'Lama Usaha',
                      data: durationList,
                      selected: selectedDuration,
                      onPressHandler: (value:number)=>{setDuration(value)}
                    }),
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
                      navigation.navigate('OptionForm', {
                        alias: 'Lama Usaha',
                        data: durationList,
                        selected: selectedDuration,
                        onPressHandler: (value:number)=>{setDuration(value)}
                      }),
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
                        navigation.navigate('OptionForm', {
                          alias: 'Lama Usaha',
                          data: durationList,
                          selected: selectedDuration,
                          onPressHandler: (value:number)=>{setDuration(value)}
                        })
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
                    navigation.navigate('OptionForm', {
                      alias: 'Lama Usaha',
                      data: durationList,
                      selected: selectedDuration,
                      onPressHandler: (value:number)=>{setDuration(value)}
                    }),
                  1000,
                  {
                    leading: true,
                    trailing: false,
                  },
                )}>
                <PaperComponent.Input
                  dense
                  label={'Lama Usaha'}
                  value={durationList[selectedDuration]}
                  placeholder={'Pilih lama usaha'}
                  onChangeText={() => { }}
                  onEndEditing={() => { }}
                  editable={false}
                  returnKeyType={'done'}
                  underlineColorAndroid={'transparent'}
                  onPressIn={Lodash.debounce(
                    () =>
                      navigation.navigate('OptionForm', {
                        alias: 'Lama Usaha',
                        data: durationList,
                        selected: selectedDuration,
                        onPressHandler: (value:number)=>{setDuration(value)}
                      }),
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
                        navigation.navigate('OptionForm', {
                          alias: 'Lama Usaha',
                          data: durationList,
                          selected: selectedDuration,
                          onPressHandler: (value:number)=>{setDuration(value)}
                        })
                      }
                    />
                  }
                />
              </TouchableOpacity>
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
        <PaperComponent.Button onPress={Lodash.debounce(onBackPress, 1000, {
            leading: true,
            trailing: false,
          })} buttonStyle={[styles.btnBack, { borderColor: theme.colors.primary }]} buttonLabelStyle={{color: theme.colors.primary}} 
          disabled={!navigation.canGoBack()}>
          Kembali
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
    width: '100%'
  },
  formField: {
    marginVertical: 5
  },
  footer: {
    paddingVertical: 10
  },
  btnBack: {
    paddingVertical: 3,
    backgroundColor: 'white',
  },
  btnNext: {
    paddingVertical: 3,
    marginBottom: 10,
  }
});
