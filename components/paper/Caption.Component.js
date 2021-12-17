
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Caption as PaperCaption} from 'react-native-paper';
import { FontWeightConfig } from '../../resources/FontConfig';
import Fonts from '../../resources/Fonts';

export default function Text (props) {
  const {children, style} = props;
  return (
    <PaperCaption
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
    </PaperCaption>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: null,
    fontFamily: Fonts.regular,
    fontWeight: FontWeightConfig.regular,
    fontSize: 12,
    letterSpacing: 0.4,
  },
});
