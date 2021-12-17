
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Title as PaperTitle} from 'react-native-paper';
import { FontWeightConfig } from '../../resources/FontConfig';
import Fonts from '../../resources/Fonts';

export default function Title (props) {
  const {children, style} = props;
  return (
    <PaperTitle
      {...props}
      style={[
        styles.text,
        style,
        {
          fontWeight: style?.fontWeight
            ? Platform.OS === 'ios'
              ? style.fontWeight
              : 'normal'
            : FontWeightConfig.semiBold,
        },
      ]}>
      {children}
    </PaperTitle>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: null,
    fontFamily: Fonts.semiBold,
    fontWeight: FontWeightConfig.semiBold,
    fontSize: 14,
    letterSpacing: 0.4,
  },
});
