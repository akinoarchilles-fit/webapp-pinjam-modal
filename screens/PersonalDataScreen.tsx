
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, RadioButton, TextInput, useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PaperComponent from '../components/paper';
import PersonalDataForm from '../resources/forms/PersonalData.validation';
import { getLocationList, getMasterFormData, getProvince, setFormData } from '../store/actions/Form.action';
import PersonalDataService from '../services/FormService';
import { selectEducation, selectFormData, selectFormStep, selectGender, selectLoadingForm, selectMaritalStatus, selectReferenceRelation, selectReligion } from '../store/selectors/form.selector';
import { nextHandler } from '../store/actions/PersonalData.action';
import { selectCityList, selectDistrictList, selectPostalCodeList, selectProvinceList, selectSubdistrictList } from '../store/selectors/PersonalData.selector';

function PersonalDataScreen({
  loadingForm,
  formData,
  currentStep,
  genderSelection,
  religionSelection,
  educationSelection,
  maritalStatusSelection,
  referenceRelationTypeSelection,
  provinceList,
  cityList,
  districtList,
  subdistrictList,
  postalCodeList,
  getMasterForm,
  getProvince,
  getLocationList,
  setFormData,
  nextHandler
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const { idCardNoForm, textOnlyForm, numberOnlyForm, religionList, educationLevelList, maritalStatusList, referenceRelationList } = PersonalDataForm;

  const [gender, setGender] = React.useState(-1);
  const [formDirty, setFormDirty] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [birthdate, setBirthdate] = React.useState(new Date());
  const [religion, setReligion] = React.useState(-1);
  const [education, setEducation] = React.useState(-1);
  const [maritalStatus, setMaritalStatus] = React.useState(-1);
  const [province, setProvince] = React.useState(-1);
  const [kabupaten, setKabupaten] = React.useState(-1);
  const [kecamatan, setKecamatan] = React.useState(-1);
  const [kelurahan, setKelurahan] = React.useState(-1);
  const [kodePos, setKodePos] = React.useState(-1);
  const [hasOnlineStore, setOnlineStore] = React.useState<number>(0);
  const onlineStoreList = ['Ya', 'Tidak'];
  const [referenceRelation, setReferenceRelation] = React.useState(-1);

  React.useEffect(() => {
    getMasterForm();
    getProvince();
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
    setFormData({currentStep: currentStep-1})
    navigation.canGoBack() ? navigation.goBack() : null
  }

  const onNextPress = async (data:any) => {
    setFormDirty(true);
    if(!cityList[kabupaten] || !districtList[kecamatan] || !subdistrictList[kelurahan] || !postalCodeList[kodePos] || !formData[currentStep]?.gender) return;
    nextHandler({
      ...data,
      religion: religionSelection[religion].id,
      education: educationSelection[education].id,
      maritalStatus: maritalStatusSelection[maritalStatus].id,
      birthdate: birthdate,
      region: provinceList[province],
      city: cityList[kabupaten],
      district: districtList[kecamatan],
      subdistrict: subdistrictList[kelurahan],
      postalcode: postalCodeList[kodePos],
      have_online_store: hasOnlineStore === 0 ? true : false,
      referenceRelation: referenceRelationTypeSelection[referenceRelation]?.category,
    }, formData, currentStep)
    hasOnlineStore == 0 ? navigation.navigate('OnlineStoreData') : navigation.navigate('BankingData')
  }

  function onSelectedProvince(provinceIndex: number) {
    setProvince(provinceIndex);
    getLocationList(provinceList[provinceIndex]);
    setFormData({cityList: [], districtList: [], subdistrictList: [], postalCodeList: []});
  }

  function onSelectedKabupaten(kabupatenIndex: number) {
    setKabupaten(kabupatenIndex);
    setKecamatan(-1);
    setKelurahan(-1);
    setKodePos(-1);
    setFormData({districtList: [], subdistrictList: [], postalCodeList: []});
    getLocationList(undefined, cityList[kabupatenIndex])
  }

  function onSelectedKecamatan(kecamatanIndex: number) {
    setKecamatan(kecamatanIndex);
    setKelurahan(-1);
    setKodePos(-1);
    setFormData({subdistrictList: [], postalCodeList: []});
    getLocationList(undefined, cityList[kabupaten], districtList[kecamatanIndex])
  }

  function onSelectedKelurahan(kelurahanIndex: number) {
    setKelurahan(kelurahanIndex)
    setFormData({postalCodeList: []});
    getLocationList(undefined, cityList[kabupaten], districtList[kecamatan], subdistrictList[kelurahanIndex])
  }

  function selectGender(index: number) {
    let form = {...formData}
    form[currentStep] = {...form[currentStep]}
    form[currentStep].gender = genderSelection[index]
    setFormData({form: form})
  }

  return (
    <View style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
      {
        loadingForm ? (
          <ActivityIndicator/>
        ) : (
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
                genderSelection.map((e: any, i: number) => {
                  return (
                    <View style={[styles.formField, { flexDirection: 'row', alignItems: 'center', marginVertical: 0 }]}>
                      <RadioButton
                        key={i}
                        value={e.id}
                        color={theme.colors.primary}
                        status={formData[currentStep]?.gender?.id === e.id ? 'checked' : 'unchecked'}
                        onPress={() => selectGender(i)}
                      ></RadioButton>
                      <PaperComponent.Text>{e.trans_id}</PaperComponent.Text>
                    </View>
                  )
                })
              }
              {formDirty && !formData[currentStep]?.gender ? <PaperComponent.HelperText type={'error'}>*Jenis kelamin harus dipilih</PaperComponent.HelperText> : null}
            </View>
            <View style={styles.formField}>
              <Controller
                name='idNumber'
                control={control}
                rules={{ required: true, pattern: idCardNoForm.regexPattern }}
                defaultValue={formData[currentStep]?.id_number ?? ''}
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
                      data: religionSelection,
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
                  value={religionSelection[religion]?.category ?? ''}
                  placeholder={'Agama'}
                  editable={false}
                  returnKeyType={'done'}
                  underlineColorAndroid={'transparent'}
                  onPressIn={Lodash.debounce(
                    () =>
                      navigation.navigate('OptionForm', {
                        alias: 'Agama',
                        data: religionSelection,
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
                          data: religionSelection,
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
                      data: educationSelection,
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
                  value={educationSelection[education]?.category ?? ''}
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
                        data: educationSelection,
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
                          data: educationSelection,
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
                      data: maritalStatusSelection,
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
                  value={maritalStatusSelection[maritalStatus]?.category ?? ''}
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
                        data: maritalStatusSelection,
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
                          data: maritalStatusSelection,
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
                defaultValue={formData[currentStep]?.place_of_birth ?? ''}
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
                defaultValue={formData[currentStep]?.maiden_name ?? ''}
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
                defaultValue={formData[currentStep]?.phone_number ?? ''}
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
                defaultValue={formData[currentStep]?.address ?? ''}
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
                defaultValue={formData[currentStep]?.rt ?? ''}
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
                defaultValue={formData[currentStep]?.rw ?? ''}
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
                  value={provinceList[province] ?? ''}
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
                      data: cityList,
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
                  value={cityList.length > 0 ? cityList[kabupaten] : ''}
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
                        data: cityList,
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
                          data: cityList,
                          selected: kabupaten,
                          onPressHandler: (value:number)=>{onSelectedKabupaten(value)}
                        })
                      }
                    />
                  }
                />
              </TouchableOpacity>
              {formDirty && !cityList[province] ? <PaperComponent.HelperText type={'error'}>*Kota harus dipilih</PaperComponent.HelperText> : null}
            </View>
            <View style={[styles.formField]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Kecamatan',
                      data: districtList,
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
                  value={districtList.length > 0 ? districtList[kecamatan] : ''}
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
                        data: districtList,
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
                          data: districtList,
                          selected: kecamatan,
                          onPressHandler: (value:number)=>{onSelectedKecamatan(value)}
                        })
                      }
                    />
                  }
                />
              </TouchableOpacity>
              {formDirty && !districtList[kabupaten] ? <PaperComponent.HelperText type={'error'}>*Kecamatan harus dipilih</PaperComponent.HelperText> : null}
            </View>
            <View style={[styles.formField]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Kelurahan',
                      data: subdistrictList,
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
                  value={subdistrictList.length > 0 ? subdistrictList[kelurahan] : ''}
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
                        data: subdistrictList,
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
                          data: subdistrictList,
                          selected: kelurahan,
                          onPressHandler: (value:number)=>{onSelectedKelurahan(value)}
                        })
                      }
                    />
                  }
                />
              </TouchableOpacity>
              {formDirty && !subdistrictList[kabupaten] ? <PaperComponent.HelperText type={'error'}>*Kelurahan harus dipilih</PaperComponent.HelperText> : null}
            </View>
            <View style={[styles.formField]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Kode Pos',
                      data: postalCodeList,
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
                  value={postalCodeList.length > 0 ? postalCodeList[kodePos] : ''}
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
                        data: postalCodeList,
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
                          data: postalCodeList,
                          selected: kodePos,
                          onPressHandler: (value:number)=>{setKodePos(value)}
                        })
                      }
                    />
                  }
                />
              </TouchableOpacity>
              {formDirty && !postalCodeList[kodePos] ? <PaperComponent.HelperText type={'error'}>*Kode pos harus dipilih</PaperComponent.HelperText> : null}
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
                            data: referenceRelationTypeSelection,
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
                        value={referenceRelationTypeSelection[referenceRelation]?.category ?? ''}
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
                              data: referenceRelationTypeSelection,
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
                                data: referenceRelationTypeSelection,
                                selected: referenceRelation,
                                onPressHandler: (value:number)=>{setReferenceRelation(value)}
                              })
                            }
                          />
                        }
                      />
                    </TouchableOpacity>
                    {formDirty && !referenceRelationTypeSelection[referenceRelation] ? <PaperComponent.HelperText type={'error'}>*Hubungan referensi harus dipilih</PaperComponent.HelperText> : null}
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
        )
      }
      </ScrollView>
      <View style={styles.footer}>
        <PaperComponent.Button onPress={Lodash.debounce(handleSubmit(onNextPress), 1000, {
          leading: true,
          trailing: false,
        })} buttonStyle={styles.btnNext}
        disabled={province < 0 || kabupaten < 0 || kecamatan < 0 || kelurahan < 0 || kodePos < 0 || religion < 0 || education < 0 || maritalStatus < 0 || (hasOnlineStore == 1 && referenceRelation < 0) || !formData[currentStep]?.gender}>
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

const mapStateToProps = createStructuredSelector({
  loadingForm: selectLoadingForm,
  formData: selectFormData,
  currentStep: selectFormStep,
  genderSelection: selectGender,
  religionSelection: selectReligion,
  educationSelection: selectEducation,
  maritalStatusSelection: selectMaritalStatus,
  referenceRelationTypeSelection: selectReferenceRelation,
  provinceList: selectProvinceList,
  cityList: selectCityList,
  districtList: selectDistrictList,
  subdistrictList: selectSubdistrictList,
  postalCodeList: selectPostalCodeList
});

const mapDispatchToProps = (dispatch:any) => ({
  getMasterForm: () => dispatch(getMasterFormData()),
  getProvince: () => dispatch(getProvince()),
  getLocationList: (region?:string, city?:string, district?:string, sub_district?:string) => dispatch(getLocationList(region, city, district, sub_district)),
  setFormData: (payload:any) => dispatch(setFormData(payload)),
  nextHandler: (payload:any, formData:any, currentStep:number) => dispatch(nextHandler(payload, formData, currentStep))
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDataScreen);

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
    height: 44,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  btnNext: {
    height: 44,
    marginBottom: 10,
  }
});
