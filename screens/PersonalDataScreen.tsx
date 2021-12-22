
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RadioButton, TextInput, useTheme } from 'react-native-paper';

import PaperComponent from '../components/paper';
import Strings from './Strings';

export default function PersonalDataScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { idCardNoForm, birthplaceForm, maidenNameForm } = Strings;

  const [genders, setGenders] = React.useState([
    { label: 'Laki - Laki', value: 'L', checked: true },
    { label: 'Perempuan', value: 'P', checked: false },
  ]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  function onNextPress() {
    navigation.navigate('OnlineStoreData');
  }

  function selectGender(index: number) {
    genders.map((e) => e.checked = false);
    genders[index].checked = true;
    setGenders([...genders]);
  }

  return (
    <View style={styles.main}>
      <View style={[styles.container, { borderColor: theme.colors.surface }]}>
        <PaperComponent.Headline style={styles.title}>Isi Data Diri</PaperComponent.Headline>
        <View style={[styles.separator, { backgroundColor: theme.colors.surface }]} />
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        <View style={styles.formContainer}>
          <View style={[styles.formField]}>
            <PaperComponent.Subheading>Jenis Kelamin</PaperComponent.Subheading>
            {
              genders.map((e, i) => {
                return (
                  <View style={[styles.formField, { flexDirection: 'row', alignItems: 'center', marginVertical: 0 }]}>
                    <RadioButton
                      key={i}
                      value={e.value}
                      status={e.checked ? 'checked' : 'unchecked'}
                      onPress={() => selectGender(i)}
                    ></RadioButton>
                    <PaperComponent.Text>{e.label}</PaperComponent.Text>
                  </View>
                )
              })
            }
          </View>
          <View style={styles.formField}>
            <Controller
              name='idNumber'
              control={control}
              rules={{ required: true, pattern: idCardNoForm.regexPattern }}
              defaultValue=''
              render={({ field: { onChange, value } }) => (
                <PaperComponent.Input
                  item={idCardNoForm}
                  value={value}
                  error={errors.idNumber}
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
                label={'Agama'}
                value={'Buddha'}
                placeholder={'Agama'}
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
                label={'Pendidikan'}
                value={'SMA'}
                placeholder={'Pendidikan'}
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
                label={'Status Nikah'}
                value={'Lajang'}
                placeholder={'Status Nikah'}
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
          <View style={styles.formField}>
            <Controller
              name='birthplace'
              control={control}
              rules={{ required: true, pattern: idCardNoForm.regexPattern }}
              defaultValue=''
              render={({ field: { onChange, value } }) => (
                <PaperComponent.Input
                  item={birthplaceForm}
                  value={value}
                  error={errors.birthplace}
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
                  navigation.navigate('DateForm'),
                1000,
                {
                  leading: true,
                  trailing: false,
                },
              )}>
              <PaperComponent.Input
                dense
                label={'Tanggal Lahir'}
                value={new Date()}
                placeholder={'Tanggal Lahir'}
                onChangeText={() => { }}
                onEndEditing={() => { }}
                editable={false}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                onPressIn={Lodash.debounce(
                  () =>
                    navigation.navigate('DateForm'),
                  1000,
                  {
                    leading: true,
                    trailing: false,
                  },
                )}
                right={
                  <TextInput.Icon
                    name={'calendar-blank-outline'}
                    onPress={() =>
                      navigation.navigate('DateForm')
                    }
                  />
                }
              />
            </TouchableOpacity>
          </View>
          <View style={styles.formField}>
            <Controller
              name='maidenName'
              control={control}
              rules={{ required: true, pattern: maidenNameForm.regexPattern }}
              defaultValue=''
              render={({ field: { onChange, value } }) => (
                <PaperComponent.Input
                  item={maidenNameForm}
                  value={value}
                  error={errors.maidenName}
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
    width: '100%'
  },
  formField: {
    marginVertical: 5,
  },
  docImage: {
    height: 150,
    width: '100%',
    resizeMode: 'contain'
  }
});
