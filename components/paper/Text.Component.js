
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Text as PaperText} from 'react-native-paper';
import { FontWeightConfig } from '../../resources/FontConfig';
import Fonts from '../../resources/Fonts';


export default function Text (props) {
  const {children, style} = props;
  return (
    <PaperText
      {...props}
      style={[
        styles.text,
        style,
        {
          fontWeight: style?.fontWeight
            ? Platform.OS === 'ios'
              ? style.fontWeight
              : 'normal'
            : FontWeightConfig.regular,
        },
      ]}>
      {children}
    </PaperText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: null,
    fontWeight: FontWeightConfig.regular,
    fontFamily: Fonts.regular,
    letterSpacing: 0.4,
  },
});
