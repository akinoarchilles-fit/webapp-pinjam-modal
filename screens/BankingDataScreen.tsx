
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
import BankingForm from '../resources/forms/Banking.validation';
import { nextHandler } from '../store/actions/Banking.action';
import { setFormData } from '../store/actions/DocumentUpload.action';
import { getMasterFormData } from '../store/actions/Form.action';
import { selectBank, selectFormData, selectFormStep, selectLoadingForm } from '../store/selectors/form.selector';


function BankingDataScreen({
  loadingForm,
  formData,
  currentStep,
  bankSelection,
  setFormData,
  nextHandler
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const { bankingNameForm, bankingNumberForm, bankList } = BankingForm;
  const [selectedBank, setSelectedBank] = React.useState(-1);

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

  const onNextPress = async (data:any) => {
    nextHandler({
      ...data,
      bank_id: bankSelection[selectedBank].id,
    }, formData, currentStep)
    navigation.navigate('AdditionalData');
  }

  return (
    <View style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, { borderColor: theme.colors.surface }]}>
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

          <View style={styles.formContainer}>
            <View style={styles.formField}>
              <Controller
                name='bankingNumber'
                control={control}
                rules={{ required: true, pattern: bankingNumberForm.regexPattern }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={bankingNumberForm}
                    value={value}
                    error={errors.bankingNumber}
                    editable={true}
                    onChangeText={(value: string) => onChange(value)}
                  />
                )}
              />
            </View>
            <View style={styles.formField}>
              <Controller
                name='bankingName'
                control={control}
                rules={{ required: true, pattern: bankingNameForm.regexPattern }}
                defaultValue=''
                render={({ field: { onChange, value } }) => (
                  <PaperComponent.Input
                    item={bankingNameForm}
                    value={value}
                    error={errors.bankingName}
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
                      alias: 'Nama Bank',
                      data: bankSelection,
                      selected: selectedBank,
                      onPressHandler: (value:number)=>{setSelectedBank(value)}
                    }),
                  1000,
                  {
                    leading: true,
                    trailing: false,
                  },
                )}>
                <PaperComponent.Input
                  dense
                  label={'Nama Bank'}
                  value={bankSelection[selectedBank]?.value ?? ''}
                  placeholder={'Nama Bank'}
                  onChangeText={() => { }}
                  onEndEditing={() => { }}
                  editable={false}
                  returnKeyType={'done'}
                  underlineColorAndroid={'transparent'}
                  onPressIn={Lodash.debounce(
                    () =>
                      navigation.navigate('OptionForm', {
                        alias: 'Nama Bank',
                        data: bankSelection,
                        selected: selectedBank,
                        onPressHandler: (value:number)=>{setSelectedBank(value)}
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
                          alias: 'Nama Bank',
                          data: bankList,
                          selected: selectedBank,
                          onPressHandler: (value:number)=>{setSelectedBank(value)}
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
        disabled={selectedBank < 0}>
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
  bankSelection: selectBank,
});

const mapDispatchToProps = (dispatch:any) => ({ 
  setFormData: (payload:any) => dispatch(setFormData(payload)),
  nextHandler: (payload:any, formData:any, currentStep:number) => dispatch(nextHandler(payload, formData, currentStep))
})

export default connect(mapStateToProps, mapDispatchToProps)(BankingDataScreen);

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
    marginVertical: 5,
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
