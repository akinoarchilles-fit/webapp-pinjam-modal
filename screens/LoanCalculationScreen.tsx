import { Feather } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PaperComponent from '../components/paper';
import { FontWeightConfig } from '../resources/FontConfig';
import Fonts from '../resources/Fonts';
import Utility from '../resources/Utility';
import { calculateLoan, getLoanConfiguration, getPlafond, loanHandler, setFormData } from '../store/actions/Loan.action';
import { selectFormData, selectFormStep, selectLoanCalculation, selectLoanConfiguration, selectLoanPlafond } from '../store/selectors/form.selector';

function LoanCalculationScreen({
  formData,
  currentStep,
  loanCalculationData,
  loanPlafondData,
  loanConfigurationData,
  setFormData,
  getLoanCalculation,
  getLoanConfiguration,
  getPlafond,
  loanHandler
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const [tenorList, setTenorList] = React.useState(['3 Bulan', '6 Bulan', '12 Bulan']);
  const [loanAmount,setLoanAmount] = React.useState(0);
  const [selectedTenor, setTenor] = React.useState(0);

  React.useEffect(() => {
    getLoanConfiguration(formData);
    getPlafond()
  }, [])

  React.useEffect(() => {
    setLoanAmount(loanConfigurationData?.dropdown_amount[0].max_amount)
  }, [loanConfigurationData])

  function populateTenorList(min:number, max:number) {
    let newTenorList = [`${min} Bulan`];
    let startValue = min;
    for(let i=0;i<2;i++) {
      let newValue = startValue * 2;
      if(newValue > max) break;
      else {
        startValue = newValue
        newTenorList.push(`${newValue} Bulan`)
      }
    }
    setTenorList([...newTenorList]);
  }

  //Check Plafond
  React.useEffect(() => {
    if(loanPlafondData) {
      for(let i = 0; i <= loanPlafondData.length; i++) {
        if(loanAmount <= loanPlafondData[i].max_amount) {
          populateTenorList(loanPlafondData[i].min_tenor, loanPlafondData[i].max_tenor)
          break;
        }
      }
    }
  }, [loanAmount])

  function onBackPress() {
    setFormData({currentStep: currentStep-1})
    navigation.canGoBack() ? navigation.goBack() : null
  }

  function onNextPress() {
    loanHandler({amount: loanAmount, duration: tenorList[selectedTenor].split(' ')[0]}, formData, currentStep)
    navigation.navigate('DocumentUpload');
  }

  function onLoanAmountChanged(amount: number) {
    getLoanCalculation({
      amount: amount,
      duration: tenorList[selectedTenor].split(' ')[0]
    }, formData)
    setLoanAmount(amount);
  }
  
  return (
    <View style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, { borderColor: theme.colors.surface}]}>
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

          <View style={styles.formContainer}>
            <View style={styles.formField}>
              <View style={[styles.rowField]}>
                <PaperComponent.Title>Nilai Pinjaman</PaperComponent.Title>
                <PaperComponent.Title>Rp. {Utility.thousandSeparator(loanAmount)}</PaperComponent.Title>
              </View>
              <Slider
                style={{height: 40}}
                value={loanAmount}
                step={loanConfigurationData?.dropdown_amount[0].step}
                minimumValue={loanConfigurationData?.dropdown_amount[0].min_amount}
                maximumValue={loanConfigurationData?.dropdown_amount[0].max_amount}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.accent}
                thumbTintColor={theme.colors.primary}
                onValueChange={(value) => onLoanAmountChanged(value)}
              />
            </View>
            <View style={[styles.formField, styles.rowField]}>
              <PaperComponent.Title>Tenor Pinjaman</PaperComponent.Title>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={Lodash.debounce(
                  () =>
                    navigation.navigate('OptionForm', {
                      alias: 'Lama Pinjaman',
                      data: tenorList,
                      selected: selectedTenor,
                      onPressHandler: (value:number)=>{
                        getLoanCalculation({
                          amount: loanAmount,
                          duration: tenorList[value].split(' ')[0]
                        }, formData)
                        setTenor(value)
                      }
                    }),
                  1000,
                  {
                    leading: true,
                    trailing: false,
                  },
                )}>
                <View
                  style={[
                    styles.chipBtn,
                    {backgroundColor: theme.colors.primary},
                  ]}>
                  <PaperComponent.Text style={styles.chipTitle}>{tenorList[selectedTenor]}</PaperComponent.Text>
                  <Feather name={'chevron-down'} size={18} color={'white'} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.separator, { backgroundColor: theme.colors.altSurface }]}/>
          <View style={styles.formContainer}>
            <View style={[styles.formField, styles.rowField]}>
              <PaperComponent.Title>Bunga</PaperComponent.Title>
              <PaperComponent.Subheading style={[styles.boldText, { color: theme.colors.primary }]}>Rp. {Utility.thousandSeparator(loanCalculationData?.interest)}</PaperComponent.Subheading>
            </View>
            <View style={[styles.formField, styles.rowField]}>
              <PaperComponent.Title>Biaya Admin</PaperComponent.Title>
              <PaperComponent.Subheading style={[styles.boldText, { color: theme.colors.primary }]}>Rp. {Utility.thousandSeparator(loanCalculationData?.adminCost)}</PaperComponent.Subheading>
            </View>
            <View style={[styles.formField, styles.rowField]}>
              <PaperComponent.Title>Total Pengembalian</PaperComponent.Title>
              <PaperComponent.Subheading style={[styles.boldText, { color: theme.colors.primary }]}>Rp. {Utility.thousandSeparator(loanCalculationData?.repayment)}</PaperComponent.Subheading>
            </View>
          </View>
          <View style={[styles.separator, { backgroundColor: theme.colors.altSurface }]}/>
          <View style={styles.formContainer}>
            <View style={[styles.formField, styles.rowField]}>
              <PaperComponent.Title>Cicilan per Bulan</PaperComponent.Title>
              <PaperComponent.Subheading style={[styles.extraBoldText, { color: theme.colors.primary }]}>Rp. {Utility.thousandSeparator(loanCalculationData?.installment)}</PaperComponent.Subheading>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <PaperComponent.Button onPress={Lodash.debounce(onNextPress, 1000, {
            leading: true,
            trailing: false,
          })} buttonStyle={styles.btnNext}
          disabled={loanCalculationData == null}>
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
  formData: selectFormData,
  currentStep: selectFormStep,
  loanCalculationData: selectLoanCalculation,
  loanConfigurationData: selectLoanConfiguration,
  loanPlafondData: selectLoanPlafond
});

const mapDispatchToProps = dispatch => ({
  setFormData: (payload) => dispatch(setFormData(payload)),
  getPlafond: () => dispatch(getPlafond()),
  getLoanConfiguration: (formData) => dispatch(getLoanConfiguration(formData)),
  getLoanCalculation: (payload, formData) => dispatch(calculateLoan(payload, formData)),
  loanHandler: (payload, formData, currentStep) => dispatch(loanHandler(payload, formData, currentStep))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoanCalculationScreen);

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
  separator: {
    height: 2,
    width: '100%'
  },
  normalText: {
    fontSize: 14,
    letterSpacing: 0.4,
  },
  boldText: {
    fontFamily: Fonts.medium,
    fontWeight: FontWeightConfig.medium,
    letterSpacing: 0.4,
  },
  extraBoldText: {
    fontFamily: Fonts.extraBold,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  chipTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 5,
  },
  chipBtn: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 5 : 2,
    borderRadius: 50,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    padding: 10,
    paddingHorizontal: 15,
    width: '100%'
  },
  formField: {
    marginVertical: 5
  },
  rowField: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
