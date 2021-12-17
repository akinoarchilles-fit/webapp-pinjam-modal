
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Subheading as PaperSubheading} from 'react-native-paper';
import { FontWeightConfig } from '../../resources/FontConfig';
import Fonts from '../../resources/Fonts';

export default function Subheading (props) {
  const {children, style} = props;
  return (
    <PaperSubheading
      {...props}
      style={[
        styles.text,
        style,
        {
          fontWeight: style?.fontWeight
            ? Platform.OS === 'ios'
              ? style.fontWeight
              : 'normal'
            : FontWeightConfig.medium,
        },
      ]}>
      {children}
    </PaperSubheading>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: null,
    fontFamily: Fonts.medium,
    fontWeight: FontWeightConfig.medium,
    fontSize: 14,
  },
});
