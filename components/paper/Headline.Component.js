import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Headline as PaperHeadline} from 'react-native-paper';
import { FontWeightConfig } from '../../resources/FontConfig';
import Fonts from '../../resources/Fonts';

export default function Headline (props) {
  const {children, style} = props;
  return (
    <PaperHeadline
      {...props}
      style={[
        styles.text,
        {color: useTheme().colors.text},
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
    </PaperHeadline>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: null,
    fontFamily: Fonts.semiBold,
    fontWeight: FontWeightConfig.semiBold,
    fontSize: 16,
    letterSpacing: 0.4,
  },
});
