
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RadioButton, TextInput, useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import PaperComponent from '../components/paper';
import PersonalDataForm from '../resources/forms/PersonalDataForms';
import PersonalDataService from '../services/PersonalDataService';

export default function PersonalDataScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { idCardNoForm, textOnlyForm, numberOnlyForm, religionList, educationLevelList, maritalStatusList } = PersonalDataForm;

  const [genders, setGenders] = React.useState([
    { label: 'Laki - Laki', value: 'L', checked: true },
    { label: 'Perempuan', value: 'P', checked: false },
  ]);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [birthdate, setBirthdate] = React.useState(new Date());
  const [religion, setReligion] = React.useState(0);
  const [education, setEducation] = React.useState(0);
  const [maritalStatus, setMaritalStatus] = React.useState(0);
  const [province, setProvince] = React.useState(0);
  const [provinceList, setProvinceList] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    PersonalDataService.getProvince().then((provinces:any) => setProvinceList(provinces));
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const onDismissPicker = React.useCallback(() => {
    setShowDatePicker(false);
  }, [setShowDatePicker]);

  const onConfirmDate = React.useCallback(
    (params) => {
      setShowDatePicker(false);
      setBirthdate(params.date);
    },
    [setShowDatePicker, setBirthdate]
  );


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
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { borderColor: theme.colors.surface }]}>
        <PaperComponent.Headline style={styles.title}>Isi Data Diri</PaperComponent.Headline>
        <View style={[styles.separator, { backgroundColor: theme.colors.surface }]} />
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        <View style={styles.formContainer}>
          <View style={[styles.formField, { paddingHorizontal: 15 }]}>
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
                  navigation.navigate('OptionForm', {
                    alias: 'Agama',
                    data: religionList,
                    selected: religion,
                    onPressHandler: (value:number)=>{setReligion(value)}
                  }),
                1000,
                {
                  leading: true,
                  trailing: false,
                },
              )}>
              <PaperComponent.Input
                dense
                label={'Agama'}
                value={religionList[religion]}
                placeholder={'Agama'}
                editable={false}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                onPressIn={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Agama',
                      data: religionList,
                      selected: religion,
                      onPressHandler: (value:number)=>{setReligion(value)}
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
                        alias: 'Agama',
                        data: religionList,
                        selected: religion,
                        onPressHandler: (value:number)=>{setReligion(value)}
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
                    alias: 'Pendidikan',
                    data: educationLevelList,
                    selected: education,
                    onPressHandler: (value:number)=>{setEducation(value)}
                  }),
                1000,
                {
                  leading: true,
                  trailing: false,
                },
              )}>
              <PaperComponent.Input
                dense
                label={'Pendidikan'}
                value={educationLevelList[education]}
                placeholder={'Pendidikan'}
                onChangeText={() => { }}
                onEndEditing={() => { }}
                editable={false}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                onPressIn={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Pendidikan',
                      data: educationLevelList,
                      selected: education,
                      onPressHandler: (value:number)=>{setEducation(value)}
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
                        alias: 'Pendidikan',
                        data: educationLevelList,
                        selected: education,
                        onPressHandler: (value:number)=>{setEducation(value)}
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
                    alias: 'Status Nikah',
                    data: maritalStatusList,
                    selected: maritalStatus,
                    onPressHandler: (value:number)=>{setMaritalStatus(value)}
                  }),
                1000,
                {
                  leading: true,
                  trailing: false,
                },
              )}>
              <PaperComponent.Input
                dense
                label={'Status Nikah'}
                value={maritalStatusList[maritalStatus]}
                placeholder={'Status Nikah'}
                onChangeText={() => { }}
                onEndEditing={() => { }}
                editable={false}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                onPressIn={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Status Nikah',
                      data: maritalStatusList,
                      selected: maritalStatus,
                      onPressHandler: (value:number)=>{setMaritalStatus(value)}
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
                        alias: 'Status Nikah',
                        data: maritalStatusList,
                        selected: maritalStatus,
                        onPressHandler: (value:number)=>{setMaritalStatus(value)}
                      })
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
              rules={{ required: true, pattern: textOnlyForm.regexPattern }}
              defaultValue=''
              render={({ field: { onChange, value } }) => (
                <PaperComponent.Input
                  item={{...textOnlyForm}}
                  value={value}
                  error={errors.birthplace}
                  editable={true}
                  onChangeText={(value: string) => onChange(value)}
                />
              )}
            />
          </View>
          <View style={styles.formField}>
          <TouchableOpacity
              activeOpacity={0.8}
              onPress={Lodash.debounce(
                () =>
                  setShowDatePicker(true),
                1000,
                {
                  leading: true,
                  trailing: false,
                },
              )}>
              <PaperComponent.Input
                dense
                label={'Tanggal Lahir'}
                value={moment(birthdate).format('DD MMMM yyyy')}
                placeholder={'Tanggal Lahir'}
                onChangeText={() => { }}
                onEndEditing={() => { }}
                editable={false}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                onPressIn={Lodash.debounce(
                  () =>
                    setShowDatePicker(true),
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
                      setShowDatePicker(true)
                    }
                  />
                }
              />
            </TouchableOpacity>
            <DatePickerModal
              locale="en"
              mode="single"
              visible={showDatePicker}
              onDismiss={onDismissPicker}
              date={new Date}
              onConfirm={onConfirmDate}/>
          </View>
          <View style={styles.formField}>
            <Controller
              name='maidenName'
              control={control}
              rules={{ required: true, pattern: textOnlyForm.regexPattern }}
              defaultValue=''
              render={({ field: { onChange, value } }) => (
                <PaperComponent.Input
                  item={{...textOnlyForm, label: 'Nama Ibu Kandung', placeHolder: 'Masukkan Nama', errorMessage: '*Pastikan nama benar'}}
                  value={value}
                  error={errors.maidenName}
                  editable={true}
                  onChangeText={(value: string) => onChange(value)}
                />
              )}
            />
          </View>
          <View style={styles.formField}>
            <Controller
              name='homePhone'
              control={control}
              rules={{ pattern: numberOnlyForm.regexPattern }}
              defaultValue=''
              render={({ field: { onChange, value } }) => (
                <PaperComponent.Input
                  item={numberOnlyForm}
                  value={value}
                  error={errors.homePhone}
                  editable={true}
                  onChangeText={(value: string) => onChange(value)}
                />
              )}
            />
          </View>
          <View style={styles.formField}>
            <Controller
              name='rt'
              control={control}
              rules={{ required: true, pattern: numberOnlyForm.regexPattern }}
              defaultValue=''
              render={({ field: { onChange, value } }) => (
                <PaperComponent.Input
                  item={{...numberOnlyForm, label: 'RT', placeHolder: 'RT', errorMessage: '*RT tidak valid'}}
                  value={value}
                  error={errors.rt}
                  editable={true}
                  onChangeText={(value: string) => onChange(value)}
                />
              )}
            />
          </View>
          <View style={styles.formField}>
            <Controller
              name='rw'
              control={control}
              rules={{ required: true, pattern: numberOnlyForm.regexPattern }}
              defaultValue=''
              render={({ field: { onChange, value } }) => (
                <PaperComponent.Input
                  item={{...numberOnlyForm, label: 'RW', placeHolder: 'RW', errorMessage: '*RW tidak valid'}}
                  value={value}
                  error={errors.rw}
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
                    alias: 'Provinsi',
                    data: provinceList,
                    selected: province,
                    onPressHandler: (value:number)=>{setProvince(value)}
                  }),
                1000,
                {
                  leading: true,
                  trailing: false,
                },
              )}>
              <PaperComponent.Input
                dense
                label={'Provinsi'}
                value={provinceList[province]?.nama}
                placeholder={'Provinsi'}
                onChangeText={() => { }}
                onEndEditing={() => { }}
                editable={false}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                onPressIn={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Provinsi',
                      data: provinceList,
                      selected: province,
                      onPressHandler: (value:number)=>{setProvince(value)}
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
                        alias: 'Provinsi',
                        data: provinceList,
                        selected: province,
                        onPressHandler: (value:number)=>{setProvince(value)}
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
    padding: 10,
    width: '100%'
  },
  formField: {
    marginVertical: 5,
  },
  rowField: {
    flexDirection: 'row',
  },
  btnNext: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
});
