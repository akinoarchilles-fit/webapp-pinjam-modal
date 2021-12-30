
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';
import AdditionalDataForm from '../resources/forms/AdditionalData.validation';


export default function AdditionalDataScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { loanPurposeList, repaymentList } = AdditionalDataForm;
  const [selectedLoanPurpose, setLoanPurpose] = React.useState(0);
  const [selectedRepayment, setRepayment] = React.useState(0);

  function onBackPress() {
    navigation.canGoBack() ? navigation.goBack() : null
  }

  function onNextPress() {
    navigation.navigate('OTPVerification');
  }

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
    marginVertical: 5,
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
