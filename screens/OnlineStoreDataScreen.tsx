
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PaperComponent from '../components/paper';
import OnlineStoreForm from '../resources/forms/OnlineStoreForms'
import { nextHandler, setFormData } from '../store/actions/OnlineStore.action';
import { selectFormData, selectFormStep, selectIndustryType, selectLoadingForm, selectWorkingLength } from '../store/selectors/form.selector';


function OnlineStoreDataScreen({
  loadingForm,
  formData,
  currentStep,
  workingLengthSelection,
  industryTypeSelection,
  setFormData,
  nextHandler,
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const { fullNameForm, phoneNumberForm } = OnlineStoreForm;
  const [selectedIndustry, setIndustry] = React.useState(-1);
  const [selectedDuration, setDuration] = React.useState(-1);

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  function onBackPress() {
    setFormData({currentStep: currentStep-1})
    navigation.canGoBack() ? navigation.goBack() : null
  }

  const onNextPress = async(data: any) => {
    nextHandler({
      ...data,
      industry_type: industryTypeSelection[selectedIndustry].id,
      work_type: workingLengthSelection[selectedDuration].id
    }, formData, currentStep)
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
                defaultValue={''}
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
                rules={{ pattern: fullNameForm.regexPattern }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={{ ...fullNameForm, label: 'Akun Facebook', errorMessage: '*Akun Facebook tidak valid', }}
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
                rules={{ pattern: fullNameForm.regexPattern }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={{ ...fullNameForm, label: 'Akun Line', errorMessage: '*Akun Line tidak valid', }}
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
                rules={{ pattern: fullNameForm.regexPattern }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={{ ...fullNameForm, label: 'Akun Tokopedia', errorMessage: '*Akun Tokopedia tidak valid', }}
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
                rules={{ pattern: fullNameForm.regexPattern }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={{ ...fullNameForm, label: 'Akun Shopee', errorMessage: '*Akun Shopee tidak valid', }}
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
                rules={{ pattern: phoneNumberForm.regexPattern }}
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
                      alias: 'Pilih Industry',
                      data: industryTypeSelection,
                      selected: selectedIndustry,
                      onPressHandler: (value:number)=>{setIndustry(value)}
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
                  value={industryTypeSelection[selectedIndustry]?.category ?? ''}
                  placeholder={'Pilih industri'}
                  onChangeText={() => { }}
                  onEndEditing={() => { }}
                  editable={false}
                  returnKeyType={'done'}
                  underlineColorAndroid={'transparent'}
                  onPressIn={Lodash.debounce(
                    () =>
                      navigation.navigate('OptionForm', {
                        alias: 'Pilih Industri',
                        data: industryTypeSelection,
                        selected: selectedIndustry,
                        onPressHandler: (value:number)=>{setIndustry(value)}
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
                          alias: 'Pilih Industri',
                          data: industryTypeSelection,
                          selected: selectedIndustry,
                          onPressHandler: (value:number)=>{setIndustry(value)}
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
                      data: workingLengthSelection,
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
                  value={workingLengthSelection[selectedDuration]?.category ?? ''}
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
                        data: workingLengthSelection,
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
                          data: workingLengthSelection,
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
        })} buttonStyle={styles.btnNext}
        disabled={selectedDuration < 0 || selectedIndustry < 0}>
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
  workingLengthSelection: selectWorkingLength,
  industryTypeSelection: selectIndustryType,
});

const mapDispatchToProps = (dispatch:any) => ({ 
  setFormData: (payload:any) => dispatch(setFormData(payload)),
  nextHandler: (payload:any, formData:any, currentStep:number) => dispatch(nextHandler(payload, formData, currentStep))
})

export default connect(mapStateToProps, mapDispatchToProps)(OnlineStoreDataScreen);

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
    height: 44,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  btnNext: {
    height: 44,
    marginBottom: 10,
  }
});
