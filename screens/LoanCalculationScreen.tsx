import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';
import { FontWeightConfig } from '../resources/FontConfig';
import Fonts from '../resources/Fonts';
import Utility from '../resources/Utility';

export default function LoanCalculationScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [loanAmount,setLoanAmount] = React.useState(1000000);
  const [tenor, setTenor] = React.useState(3);
  const [tenorStep, setTenorStep] = React.useState(3);

  function onNextPress() {
    navigation.navigate('DocumentUpload');
  }

  function onLoanAmountChanged(amount: number) {
    setLoanAmount(amount);
  }

  function onTenorChanged(tenor: number) {
    setTenor(tenor);
  }
  
  return (
    <View style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, { borderColor: theme.colors.surface}]}>
          <PaperComponent.Headline style={styles.title}>Tentukan Nilai & Tenor Pinjaman</PaperComponent.Headline>
          <View style={[styles.separator, { backgroundColor: theme.colors.surface }]}/>
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
                step={100000}
                minimumValue={1000000}
                maximumValue={10000000}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor={theme.colors.primary}
                onValueChange={(value) => onLoanAmountChanged(value)}
              />
            </View>
            <View style={styles.formField}>
              <View style={[styles.rowField]}>
                <PaperComponent.Title>Tenor Pinjaman</PaperComponent.Title>
                <PaperComponent.Title>{tenor} bulan</PaperComponent.Title>
              </View>
              <Slider
                style={{height: 40}}
                value={tenor}
                minimumValue={3}
                maximumValue={12}
                step={3}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor={theme.colors.primary}
                onValueChange={(value) => onTenorChanged(value)}
              />
            </View>
          </View>
          <View style={[styles.separator, { backgroundColor: theme.colors.surface }]}/>
          <View style={styles.formContainer}>
            <View style={[styles.formField, styles.rowField]}>
              <PaperComponent.Title>Bunga</PaperComponent.Title>
              <PaperComponent.Subheading style={[styles.boldText, { color: theme.colors.primary }]}>Rp. {Utility.thousandSeparator(190000)}</PaperComponent.Subheading>
            </View>
            <View style={[styles.formField, styles.rowField]}>
              <PaperComponent.Title>Biaya Admin</PaperComponent.Title>
              <PaperComponent.Subheading style={[styles.boldText, { color: theme.colors.primary }]}>Rp. {Utility.thousandSeparator(190000)}</PaperComponent.Subheading>
            </View>
            <View style={[styles.formField, styles.rowField]}>
              <PaperComponent.Title>Total Pengembalian</PaperComponent.Title>
              <PaperComponent.Subheading style={[styles.boldText, { color: theme.colors.primary }]}>Rp. {Utility.thousandSeparator(190000)}</PaperComponent.Subheading>
            </View>
          </View>
          <View style={[styles.separator, { backgroundColor: theme.colors.surface }]}/>
          <View style={styles.formContainer}>
            <View style={[styles.formField, styles.rowField]}>
              <PaperComponent.Title>Cicilan per Bulan</PaperComponent.Title>
              <PaperComponent.Subheading style={[styles.extraBoldText, { color: theme.colors.primary }]}>Rp. {Utility.thousandSeparator(190000)}</PaperComponent.Subheading>
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
    fontFamily: Fonts.medium,
    fontWeight: FontWeightConfig.medium,
    letterSpacing: 0.4,
  },
  extraBoldText: {
    fontFamily: Fonts.extraBold,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  btnNext: {
    marginTop: 30
  },
  formContainer: {
    margin: 10,
    width: '90%',
  },
  formField: {
    marginVertical: 5
  },
  rowField: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
