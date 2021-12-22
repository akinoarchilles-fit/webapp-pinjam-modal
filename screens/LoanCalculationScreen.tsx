import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';
import Utility from '../resources/Utility';

export default function LoanCalculationScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  function onNextPress() {
    navigation.navigate('DocumentUpload');
  }
  
  return (
    <View style={[styles.container, { borderColor: theme.colors.surface}]}>
      <PaperComponent.Headline style={styles.title}>Tentukan Nilai & Tenor Pinjaman</PaperComponent.Headline>
      <View style={[styles.separator, { backgroundColor: theme.colors.surface }]}/>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <View style={styles.formContainer}>
        <View style={styles.formField}>
          <PaperComponent.Title>Nilai Pinjaman</PaperComponent.Title>
          <Slider
            style={{height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor={theme.colors.primary}
          />
        </View>
        <View style={styles.formField}>
          <PaperComponent.Title>Tenor Pinjaman</PaperComponent.Title>
          <Slider
            style={{height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor={theme.colors.primary}
          />
        </View>
      </View>
      <View style={[styles.separator, { backgroundColor: theme.colors.surface }]}/>
      <View style={styles.formContainer}>
        <View style={[styles.formField, styles.rowField]}>
          <PaperComponent.Title>Bunga</PaperComponent.Title>
          <PaperComponent.Subheading>Rp. {Utility.thousandSeparator(190000)}</PaperComponent.Subheading>
        </View>
        <View style={[styles.formField, styles.rowField]}>
          <PaperComponent.Title>Biaya Admin</PaperComponent.Title>
          <PaperComponent.Subheading>Rp. {Utility.thousandSeparator(190000)}</PaperComponent.Subheading>
        </View>
        <View style={[styles.formField, styles.rowField]}>
          <PaperComponent.Title>Total Pengembalian</PaperComponent.Title>
          <PaperComponent.Subheading>Rp. {Utility.thousandSeparator(190000)}</PaperComponent.Subheading>
        </View>
      </View>
      <View style={[styles.separator, { backgroundColor: theme.colors.surface }]}/>
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
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 30,  
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
  btnNext: {
    marginTop: 30
  },
  formContainer: {
    margin: 10,
    width: '100%'
  },
  formField: {
    marginVertical: 5
  },
  rowField: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
