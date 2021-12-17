
import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import { FontWeightConfig } from '../../resources/FontConfig';
import Fonts from '../../resources/Fonts';

export default function Button (props) {
  return (
    <PaperButton
      mode={'contained'}
      uppercase={false}
      style={[styles.btnContainer, props.buttonStyle]}
      contentStyle={[styles.buttonStyle, props.contentStyle]}
      labelStyle={[styles.labelStyle, props.buttonLabelStyle]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    width: '95%',
    alignSelf: 'center',
    elevation: 0,
  },
  buttonStyle: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 16,
    letterSpacing: 0.2,
    fontFamily: Fonts.semiBold,
    fontWeight: FontWeightConfig.semiBold,
  },
});
