
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { Checkbox, useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';

export default function TermsConditionScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  function onNextPress() {
    navigation.navigate('Register');
  }
  
  return (
    <View style={styles.main}>
      <View style={[styles.container, { borderColor: theme.colors.surface}]}>
        <PaperComponent.Headline style={styles.title}>Syarat dan Ketentuan</PaperComponent.Headline>
        <View style={[styles.separator, { backgroundColor: theme.colors.surface }]}/>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        <View style={styles.formContainer}>
          <Checkbox.Item status="checked" position='leading' labelStyle={{textAlign: 'left', marginLeft: 10}}  label="Dengan mengisi formulir ini, saya menyatakan semua data yang saya berikan adalah benar dan akurat." />
          <Checkbox.Item status="checked" position='leading' labelStyle={{textAlign: 'left', marginLeft: 10}}  label="Dengan ini saya telah mengetahui, membaca, serta menyetujui syarat dan ketentuan dan Kebijakan Privasi dari PINJAMMODAL."/>
        </View>
      </View>
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
    flex: 1
  },
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
    marginVertical: 20
  },
  separator: {
    height: 2,
    width: '100%'
  },
  btnNext: {
    marginTop: 30
  },
  formContainer: {
    margin: 10,
    width: '100%'
  },
});
