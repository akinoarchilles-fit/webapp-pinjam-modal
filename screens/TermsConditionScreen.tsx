
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash, { every } from 'lodash';
import * as React from 'react';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Checkbox, useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';

export default function TermsConditionScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [tncBox, setCheck] = React.useState<boolean[]>([
    false,
    false
  ])

  function onNextPress() {
    navigation.navigate('Register');
  }

  function onPressCheckbox(index: number) {
    tncBox[index] = !tncBox[index];
    setCheck([...tncBox]);
  }
  
  return (
    <View style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, { borderColor: theme.colors.surface}]}>
          <PaperComponent.Headline style={styles.title}>Syarat dan Ketentuan</PaperComponent.Headline>
          <View style={[styles.separator, { backgroundColor: theme.colors.surface }]}/>
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
          <View style={styles.formContainer}>
            <Checkbox.Item status={tncBox[0] ? 'checked' : 'unchecked'} onPress={() => onPressCheckbox(0)} position='leading' labelStyle={{textAlign: 'left', marginLeft: 10}}  label="Dengan mengisi formulir ini, saya menyatakan semua data yang saya berikan adalah benar dan akurat." />
            <Checkbox.Item status={tncBox[1] ? 'checked' : 'unchecked'} onPress={() => onPressCheckbox(1)} position='leading' labelStyle={{textAlign: 'left', marginLeft: 10}}  label="Dengan ini saya telah mengetahui, membaca, serta menyetujui syarat dan ketentuan dan Kebijakan Privasi dari PINJAMMODAL."/>
          </View>
        </View>
      </ScrollView>
      <PaperComponent.Button onPress={Lodash.debounce(onNextPress, 1000, {
          leading: true,
          trailing: false,
        })} buttonStyle={styles.btnNext}
        disabled={!(tncBox.every(e => e === true))}>
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
    marginVertical: 20
  },
  separator: {
    height: 2,
    width: '100%'
  },
  formContainer: {
    padding: 20,
    width: '100%'
  },
  btnNext: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
});


