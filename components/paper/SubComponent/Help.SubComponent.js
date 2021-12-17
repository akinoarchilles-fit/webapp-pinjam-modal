import { Feather } from '@expo/vector-icons';
import Lodash from 'lodash';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import PaperComponent from '..';
import { FontWeightConfig } from '../../../resources/FontConfig';

export default function Help ({title, type, onPress}) {
  const theme = useTheme();
  const onPressHandler = () => {
    const message = `Hai Tim Pinjam Modal, saat ini saya mengalami kendala ${title.toLowerCase()}`;
    
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.contactButton}
      onPress={Lodash.debounce(
        () => (onPress ? onPress() : onPressHandler()),
        1000,
        {
          leading: true,
          trailing: false,
        },
      )}>
      <Feather
        name={'message-circle'}
        size={28}
        color={theme.colors.primary}
        style={{marginTop: 2}}
      />
      <View
        style={[styles.chipContainer, {backgroundColor: theme.colors.primary}]}>
        <PaperComponent.Text style={styles.chipTitle}>
          bantuan
        </PaperComponent.Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    letterSpacing: 0.4,
    color: 'black',
    fontSize: 16,
    fontFamily: FontWeightConfig.semiBold,
  },
  containerStyle: {
    borderBottomWidth: 2,
    borderBottomColor: '#F5F5F5',
  },
  chipTitle: {
    fontSize: 9,
    color: '#FFFFFF',
  },
  contactButton: {
    width: 60,
    alignItems: 'flex-end',
  },
  chipContainer: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    left: -5,
  },
});
