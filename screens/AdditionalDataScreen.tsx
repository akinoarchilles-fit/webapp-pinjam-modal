
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Snackbar, TextInput, useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PaperComponent from '../components/paper';
import AdditionalDataForm from '../resources/forms/AdditionalData.validation';
import { nextHandler, setFormData } from '../store/actions/AdditionalData.action';
import { selectApplyErrorMessage, selectFormData, selectFormStep, selectLoadingForm, selectSuccessApply } from '../store/selectors/form.selector';


function AdditionalDataScreen({
  formData,
  currentStep,
  loadingForm,
  applyErrorMessage,
  isSuccessApply,
  setFormData,
  nextHandler
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const { loanPurposeList, repaymentList } = AdditionalDataForm;
  const [selectedLoanPurpose, setLoanPurpose] = React.useState(-1);
  const [selectedRepayment, setRepayment] = React.useState(-1);

  function onBackPress() {
    setFormData({currentStep: currentStep-1})
    navigation.canGoBack() ? navigation.goBack() : null
  }

  function onNextPress() {
    nextHandler({
      loan_purpose: loanPurposeList[selectedLoanPurpose],
      payment_options: repaymentList[selectedRepayment]
    }, formData, currentStep)
  }

  React.useEffect(() => {
    if(isSuccessApply) {
      navigation.navigate('OTPVerification');
    }
  }, [isSuccessApply])

  return (
    <View style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, { borderColor: theme.colors.surface }]}>
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

          <View style={styles.formContainer}>
            <View style={[styles.formField]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Tujuan Pinjaman',
                      data: loanPurposeList,
                      selected: selectedLoanPurpose,
                      onPressHandler: (value:number)=>{setLoanPurpose(value)}
                    }),
                  1000,
                  {
                    leading: true,
                    trailing: false,
                  },
                )}>
                <PaperComponent.Input
                  dense
                  label={'Tujuan Pinjaman'}
                  value={loanPurposeList[selectedLoanPurpose]}
                  placeholder={'Tujuan Pinjaman'}
                  onChangeText={() => { }}
                  onEndEditing={() => { }}
                  editable={false}
                  returnKeyType={'done'}
                  underlineColorAndroid={'transparent'}
                  onPressIn={Lodash.debounce(
                    () =>
                      navigation.navigate('OptionForm', {
                        alias: 'Tujuan Pinjaman',
                        data: loanPurposeList,
                        selected: selectedLoanPurpose,
                        onPressHandler: (value:number)=>{setLoanPurpose(value)}
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
                          alias: 'Tujuan Pinjaman',
                          data: loanPurposeList,
                          selected: selectedLoanPurpose,
                          onPressHandler: (value:number)=>{setLoanPurpose(value)}
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
                      alias: 'Pilihan Pembayaran',
                      data: repaymentList,
                      selected: selectedRepayment,
                      onPressHandler: (value:number)=>{setRepayment(value)}
                    }),
                  1000,
                  {
                    leading: true,
                    trailing: false,
                  },
                )}>
                <PaperComponent.Input
                  dense
                  label={'Pilihan Pembayaran'}
                  value={repaymentList[selectedRepayment]}
                  placeholder={'Pilihan Pembayaran'}
                  onChangeText={() => { }}
                  onEndEditing={() => { }}
                  editable={false}
                  returnKeyType={'done'}
                  underlineColorAndroid={'transparent'}
                  onPressIn={Lodash.debounce(
                    () =>
                      navigation.navigate('OptionForm', {
                        alias: 'Pilihan Pembayaran',
                        data: repaymentList,
                        selected: selectedRepayment,
                        onPressHandler: (value:number)=>{setRepayment(value)}
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
                          alias: 'Pilihan Pembayaran',
                          data: repaymentList,
                          selected: selectedRepayment,
                          onPressHandler: (value:number)=>{setRepayment(value)}
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
        <PaperComponent.Button onPress={Lodash.debounce(onNextPress, 1000, {
          leading: true,
          trailing: false,
        })} buttonStyle={styles.btnNext} loading={loadingForm}
        disabled={selectedLoanPurpose < 0 || selectedRepayment < 0 || loadingForm}>
          Lanjutkan
        </PaperComponent.Button>
        <PaperComponent.Button onPress={Lodash.debounce(onBackPress, 1000, {
            leading: true,
            trailing: false,
          })} buttonStyle={[styles.btnBack, { borderColor: theme.colors.primary }]} buttonLabelStyle={{color: theme.colors.primary}} 
          disabled={!navigation.canGoBack() || loadingForm}>
          Kembali
        </PaperComponent.Button>
      </View>
      <Snackbar
        visible={applyErrorMessage !== null}
        duration={3000}
        onDismiss={() => {
          setFormData({applyErrorMessage: null})
        }}
      >
        {applyErrorMessage}
      </Snackbar>
    </View>
  );
}

const mapStateToProps = createStructuredSelector({
  formData: selectFormData,
  currentStep: selectFormStep,
  loadingForm: selectLoadingForm,
  applyErrorMessage: selectApplyErrorMessage,
  isSuccessApply: selectSuccessApply,
});

const mapDispatchToProps = (dispatch:any) => ({ 
  setFormData: (payload:any) => dispatch(setFormData(payload)),
  nextHandler: (payload:any, formData:any, currentStep:number) => dispatch(nextHandler(payload, formData, currentStep))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalDataScreen);

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
