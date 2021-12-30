
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Platform, ScrollView, StyleSheet, useColorScheme, useWindowDimensions, View } from 'react-native';
import { Checkbox, useTheme } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import PaperComponent from '../components/paper';
import { CONTENT } from '../resources/forms/TermsCondition.string';

export default function TermsConditionScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { width } = useWindowDimensions();

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
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
          <View style={[styles.formContainer]}>
            <RenderHtml
              contentWidth={width}
              source={{html: CONTENT}}
              defaultTextProps={{ style: { color: useColorScheme() === 'dark' ? 'white' : 'black'}}}
            />
            <Checkbox.Item status={tncBox[0] ? 'checked' : 'unchecked'} onPress={() => onPressCheckbox(0)} position='leading' labelStyle={{textAlign: 'left', marginLeft: 10}}  label="Dengan mengisi formulir ini, saya menyatakan semua data yang saya berikan adalah benar dan akurat." />
            <Checkbox.Item status={tncBox[1] ? 'checked' : 'unchecked'} onPress={() => onPressCheckbox(1)} position='leading' labelStyle={{textAlign: 'left', marginLeft: 10}}  label="Dengan ini saya telah mengetahui, membaca, serta menyetujui syarat dan ketentuan dan Kebijakan Privasi dari PINJAMMODAL."/>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <PaperComponent.Button onPress={Lodash.debounce(onNextPress, 1000, {
            leading: true,
            trailing: false,
          })} buttonStyle={styles.btnNext}
          disabled={!(tncBox.every(e => e === true))}>
          Lanjutkan
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
  formContainer: {
    padding: 10,
    paddingHorizontal: 15,
    width: '100%'
  },
  footer: {
    paddingVertical: 10
  },
  btnBack: {
    paddingVertical: 3,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  btnNext: {
    paddingVertical: 3
  }
});


