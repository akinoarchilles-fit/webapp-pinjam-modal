import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Fonts from '../../resources/Fonts';
import { FontWeightConfig } from '../../resources/FontConfig';
import PaperComponent from '.';

export default function Input (props) {
  const {item, error, inputStyle} = props;
  const {placeHolder, label, errorMessage, secureTextEntry, value} = item ?? {};
  return (
    <View style={styles.inputView}>
      <TextInput
        ref={(ref) =>
          ref &&
          ref.setNativeProps({
            style: {
              fontFamily: Fonts.semiBold,
              fontWeight: FontWeightConfig.semiBold,
            },
          })
        }
        dense
        label={label}
        placeholder={placeHolder}
        error={error}
        secureTextEntry={secureTextEntry}
        value={value ?? ' '}
        // placeholderTextColor={'#CFCFCF'}
        underlineColorAndroid={'transparent'}
        returnKeyType={'done'}
        autoCapitalize={'none'}
        autoCorrect={false}
        textContentType={'oneTimeCode'}
        style={[styles.input, inputStyle ?? null]}
        {...props}
      />
      {error && (
        <PaperComponent.HelperText type={'error'}>
          {errorMessage}
        </PaperComponent.HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    paddingHorizontal: 5,
    letterSpacing: 0.4,
  },
  inputView: {
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 14,
    letterSpacing: 0.4,
    paddingHorizontal: 5,
    fontFamily: Fonts.semiBold,
    fontWeight: FontWeightConfig.semiBold,
    width: '100%',
  },
});
