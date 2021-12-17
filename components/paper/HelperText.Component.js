import React from 'react';
import {HelperText as PaperHelperText, useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import Fonts from '../../resources/Fonts';
import { FontWeightConfig } from '../../resources/FontConfig';

export default function HelperText ({children, type}) {
  const theme = useTheme();
  return (
    <PaperHelperText
      type={type}
      visible={true}
      style={[
        type === 'error' && {
          color: theme.colors.error,
          fontWeight: FontWeightConfig.semiBold,
          fontFamily: Fonts.semiBold,
        },
        styles.error,
      ]}>
      {children}
    </PaperHelperText>
  );
}

const styles = StyleSheet.create({
  error: {
    paddingHorizontal: 5,
    letterSpacing: 0.4,
  },
});
