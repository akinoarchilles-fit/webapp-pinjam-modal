
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';
import AdditionalDataForm from '../resources/forms/AdditionalData.validation';
import BankingForm from '../resources/forms/Banking.validation';


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
          <PaperComponent.Headline style={styles.title}>Isi Data Keterangan Tambahan</PaperComponent.Headline>
          <View style={[styles.separator, { backgroundColor: theme.colors.surface }]} />
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
    padding: 20,
    paddingHorizontal: 10
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
    padding: 20,
    width: '100%'
  },
  formField: {
    marginVertical: 5,
  },
  btnBack: {
    paddingVertical: 3,
    backgroundColor: 'white',
    borderWidth: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  btnNext: {
    marginBottom: 10,
    paddingVertical: 3
  },
});
