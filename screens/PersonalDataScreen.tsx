
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
import Colors from '../constants/Colors';
import PersonalDataForm from '../resources/forms/PersonalData.validation';
import PersonalDataService from '../services/PersonalDataService';

export default function PersonalDataScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { idCardNoForm, textOnlyForm, numberOnlyForm, religionList, educationLevelList, maritalStatusList, referenceRelationList } = PersonalDataForm;

  const [genders, setGenders] = React.useState([
    { label: 'Laki - Laki', value: 'L', checked: true },
    { label: 'Perempuan', value: 'P', checked: false },
  ]);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [birthdate, setBirthdate] = React.useState(new Date());
  const [religion, setReligion] = React.useState(0);
  const [education, setEducation] = React.useState(0);
  const [maritalStatus, setMaritalStatus] = React.useState(0);
  const [province, setProvince] = React.useState(-1);
  const [provinceList, setProvinceList] = React.useState<Array<any>>([]);
  const [kabupaten, setKabupaten] = React.useState(-1);
  const [kabupatenList, setKabupatenList] = React.useState<Array<any>>([]);
  const [kecamatan, setKecamatan] = React.useState(-1);
  const [kecamatanList, setKecamatanList] = React.useState<Array<any>>([]);
  const [kelurahan, setKelurahan] = React.useState(-1);
  const [kelurahanList, setKelurahanList] = React.useState<Array<any>>([]);
  const [kodePos, setKodePos] = React.useState(-1);
  const [kodePosList, setKodePosList] = React.useState<Array<any>>([]);
  const [hasOnlineStore, setOnlineStore] = React.useState<number>(0);
  const onlineStoreList = ['Ya', 'Tidak'];
  const [referenceRelation, setReferenceRelation] = React.useState(0);

  React.useEffect(() => {
    PersonalDataService.getProvince().then((provinces:any) => setProvinceList(provinces));
  }, [])

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

  function onBackPress() {
    navigation.canGoBack() ? navigation.goBack() : null
  }

  function onNextPress() {
    
    hasOnlineStore == 0 ? navigation.navigate('OnlineStoreData') : navigation.navigate('BankingData')
  }

  function onSelectedProvince(provinceIndex: number) {
    setProvince(provinceIndex);
    setKabupatenList([])
    setKabupaten(-1);
    setKecamatanList([]);
    setKecamatan(-1);
    setKelurahanList([])
    setKelurahan(-1);
    setKodePosList([])
    setKodePos(-1);
    PersonalDataService.getKabupaten(provinceList[provinceIndex].id).then((kabupaten:any) => {
      setKabupatenList(kabupaten)
    })
  }

  function onSelectedKabupaten(kabupatenIndex: number) {
    setKabupaten(kabupatenIndex);
    setKecamatan(-1);
    setKecamatanList([]);
    setKelurahan(-1);
    setKelurahanList([])
    setKodePos(-1);
    setKodePosList([])
    PersonalDataService.getKecamatan(kabupatenList[kabupatenIndex].id).then((kecamatan:any) => {
      setKecamatanList(kecamatan)
    })
  }

  function onSelectedKecamatan(kecamatanIndex: number) {
    setKecamatan(kecamatanIndex);
    setKelurahan(-1);
    setKelurahanList([])
    setKodePos(-1);
    setKodePosList([])
    PersonalDataService.getKelurahan(kecamatanList[kecamatanIndex].id).then((kelurahan:any) => {
      setKelurahanList(kelurahan)
    })
  }

  function onSelectedKelurahan(kelurahanIndex: number) {
    setKelurahan(kelurahanIndex)
    setKodePosList(['10101', '01010']);
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
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        <View style={styles.formContainer}>
          <View style={[styles.sectionHeader, { marginTop: 0}]}>
            <PaperComponent.Title style={{color: theme.colors.primary }}>Data Pribadi</PaperComponent.Title>
            <View style={[styles.separator, { backgroundColor: theme.colors.altSurface }]}/>
          </View>
          <View style={[styles.formField, { paddingHorizontal: 5 }]}>
            <PaperComponent.Subheading>Jenis Kelamin</PaperComponent.Subheading>
            {
              genders.map((e, i) => {
                return (
                  <View style={[styles.formField, { flexDirection: 'row', alignItems: 'center', marginVertical: 0 }]}>
                    <RadioButton
                      key={i}
                      value={e.value}
                      color={theme.colors.primary}
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
          <View style={styles.sectionHeader}>
            <PaperComponent.Title  style={{color: theme.colors.primary }}>Data Domisili</PaperComponent.Title>
            <View style={[styles.separator, { backgroundColor: theme.colors.altSurface }]}/>
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
              name='address'
              control={control}
              rules={{ required: true }}
              defaultValue=''
              render={({ field: { onChange, value } }) => (
                <PaperComponent.Input
                  item={{...textOnlyForm, label: 'Alamat', errorMessage: 'Alamat tidak valid atau belum diisi'}}
                  value={value}
                  error={errors.address}
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
              rules={{ required: true, minLength:2, maxLength:3, pattern: numberOnlyForm.regexPattern }}
              defaultValue=''
              render={({ field: { onChange, value } }) => (
                <PaperComponent.Input
                  item={{...numberOnlyForm, label: 'RT', placeHolder: 'RT', errorMessage: '*RT tidak valid atau belum diisi'}}
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
              rules={{ required: true, minLength:2, maxLength:3, pattern: numberOnlyForm.regexPattern }}
              defaultValue=''
              render={({ field: { onChange, value } }) => (
                <PaperComponent.Input
                  item={{...numberOnlyForm, label: 'RW', placeHolder: 'RW', errorMessage: '*RW tidak valid atau belum diisi'}}
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
                    onPressHandler: (value:number)=>{onSelectedProvince(value)}
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
                      onPressHandler: (value:number)=>{onSelectedProvince(value)}
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
                        onPressHandler: (value:number)=>{onSelectedProvince(value)}
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
                    alias: 'Kota',
                    data: kabupatenList,
                    selected: kabupaten,
                    onPressHandler: (value:number)=>{onSelectedKabupaten(value)}
                  }),
                1000,
                {
                  leading: true,
                  trailing: false,
                },
              )}>
              <PaperComponent.Input
                dense
                label={'Kota'}
                value={kabupatenList.length > 0 ? kabupatenList[kabupaten]?.nama : ''}
                placeholder={'Kota'}
                onChangeText={() => { }}
                onEndEditing={() => { }}
                editable={false}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                onPressIn={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Kota',
                      data: kabupatenList,
                      selected: kabupaten,
                      onPressHandler: (value:number)=>{onSelectedKabupaten(value)}
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
                        alias: 'Kota',
                        data: kabupatenList,
                        selected: kabupaten,
                        onPressHandler: (value:number)=>{onSelectedKabupaten(value)}
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
                    alias: 'Kecamatan',
                    data: kecamatanList,
                    selected: kecamatan,
                    onPressHandler: (value:number)=>{onSelectedKecamatan(value)}
                  }),
                1000,
                {
                  leading: true,
                  trailing: false,
                },
              )}>
              <PaperComponent.Input
                dense
                label={'Kecamatan'}
                value={kecamatanList.length > 0 ? kecamatanList[kecamatan]?.nama : ''}
                placeholder={'Kecamatan'}
                onChangeText={() => { }}
                onEndEditing={() => { }}
                editable={false}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                onPressIn={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Kecamatan',
                      data: kecamatanList,
                      selected: kecamatan,
                      onPressHandler: (value:number)=>{onSelectedKecamatan(value)}
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
                        alias: 'Kecamatan',
                        data: kecamatanList,
                        selected: kecamatan,
                        onPressHandler: (value:number)=>{onSelectedKecamatan(value)}
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
                    alias: 'Kelurahan',
                    data: kelurahanList,
                    selected: kelurahan,
                    onPressHandler: (value:number)=>{onSelectedKelurahan(value)}
                  }),
                1000,
                {
                  leading: true,
                  trailing: false,
                },
              )}>
              <PaperComponent.Input
                dense
                label={'Kelurahan'}
                value={kelurahanList.length > 0 ? kelurahanList[kelurahan]?.nama : ''}
                placeholder={'Kelurahan'}
                onChangeText={() => { }}
                onEndEditing={() => { }}
                editable={false}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                onPressIn={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Kelurahan',
                      data: kelurahanList,
                      selected: kelurahan,
                      onPressHandler: (value:number)=>{onSelectedKelurahan(value)}
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
                        alias: 'Kelurahan',
                        data: kelurahanList,
                        selected: kelurahan,
                        onPressHandler: (value:number)=>{onSelectedKelurahan(value)}
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
                    alias: 'Kode Pos',
                    data: kodePosList,
                    selected: kodePos,
                    onPressHandler: (value:number)=>{setKodePos(value)}
                  }),
                1000,
                {
                  leading: true,
                  trailing: false,
                },
              )}>
              <PaperComponent.Input
                dense
                label={'Kode Pos'}
                value={kodePosList.length > 0 ? kodePosList[kodePos] : ''}
                placeholder={'Kode Pos'}
                onChangeText={() => { }}
                onEndEditing={() => { }}
                editable={false}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                onPressIn={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Kode Pos',
                      data: kodePosList,
                      selected: kodePos,
                      onPressHandler: (value:number)=>{setKodePos(value)}
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
                        alias: 'Kode Pos',
                        data: kodePosList,
                        selected: kodePos,
                        onPressHandler: (value:number)=>{setKodePos(value)}
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
                    alias: 'Toko Online',
                    data: onlineStoreList,
                    selected: hasOnlineStore,
                    onPressHandler: (value:number)=>{setOnlineStore(value)}
                  }),
                1000,
                {
                  leading: true,
                  trailing: false,
                },
              )}>
              <PaperComponent.Input
                dense
                label={'Memiliki Toko Online'}
                value={onlineStoreList[hasOnlineStore]}
                placeholder={'Memiliki Toko Online'}
                onChangeText={() => { }}
                onEndEditing={() => { }}
                editable={false}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                onPressIn={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Toko Online',
                      data: onlineStoreList,
                      selected: hasOnlineStore,
                      onPressHandler: (value:number)=>{setOnlineStore(value)}
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
                        alias: 'Toko Online',
                        data: onlineStoreList,
                        selected: hasOnlineStore,
                        onPressHandler: (value:number)=>{setOnlineStore(value)}
                      })
                    }
                  />
                }
              />
            </TouchableOpacity>
          </View>
          {
            hasOnlineStore !== 0 ? (
              <View>
                <View style={styles.sectionHeader}>
                  <PaperComponent.Title  style={{color: theme.colors.primary }}>Data Referensi</PaperComponent.Title>
                  <View style={[styles.separator, { backgroundColor: theme.colors.altSurface }]}/>
                </View>
                <View style={styles.formField}>
                  <Controller
                    name='referenceName'
                    control={control}
                    rules={{ required: true, pattern: textOnlyForm.regexPattern }}
                    defaultValue=''
                    render={({ field: { onChange, value } }) => (
                      <PaperComponent.Input
                        item={{...textOnlyForm, label: 'Nama Referensi', placeHolder: 'Nama Referensi', errorMessage: '*Nama Referensi tidak valid atau belum diisi'}}
                        value={value}
                        error={errors.referenceName}
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
                          alias: 'Hubungan referensi',
                          data: referenceRelationList,
                          selected: referenceRelation,
                          onPressHandler: (value:number)=>{setReferenceRelation(value)}
                        }),
                      1000,
                      {
                        leading: true,
                        trailing: false,
                      },
                    )}>
                    <PaperComponent.Input
                      dense
                      label={'Hubungan dengan Referensi'}
                      value={referenceRelationList[referenceRelation]}
                      placeholder={'Hubungan dengan Referensi'}
                      onChangeText={() => { }}
                      onEndEditing={() => { }}
                      editable={false}
                      returnKeyType={'done'}
                      underlineColorAndroid={'transparent'}
                      onPressIn={Lodash.debounce(
                        () =>
                          navigation.navigate('OptionForm', {
                            alias: 'Hubungan referensi',
                            data: referenceRelationList,
                            selected: referenceRelation,
                            onPressHandler: (value:number)=>{setReferenceRelation(value)}
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
                              alias: 'Hubungan referensi',
                              data: referenceRelationList,
                              selected: referenceRelation,
                              onPressHandler: (value:number)=>{setReferenceRelation(value)}
                            })
                          }
                        />
                      }
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.formField}>
                  <Controller
                    name='referencePhone'
                    control={control}
                    rules={{ required: true, pattern: numberOnlyForm.regexPattern }}
                    defaultValue=''
                    render={({ field: { onChange, value } }) => (
                      <PaperComponent.Input
                        item={{...textOnlyForm, label: 'No. HP Referensi', placeHolder: 'No. HP Referensi', errorMessage: '*No. HP Referensi tidak valid atau belum diisi'}}
                        value={value}
                        error={errors.referencePhone}
                        editable={true}
                        onChangeText={(value: string) => onChange(value)}
                      />
                    )}
                  />
                </View>
              </View>
            ) : null
          }
        </View>
      </View>
      </ScrollView>
      <View style={styles.footer}>
        <PaperComponent.Button onPress={Lodash.debounce(handleSubmit(onNextPress), 1000, {
          leading: true,
          trailing: false,
        })} buttonStyle={styles.btnNext}
        disabled={province < 0 || kabupaten < 0 || kecamatan < 0 || kelurahan < 0 || kodePos < 0}>
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
  sectionHeader: {
    marginTop: 15,
  },
  separator: {
    height: 2,
    width: '100%',
    marginTop: 3
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
    marginVertical: 5,
  },
  rowField: {
    flexDirection: 'row',
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
