import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PaperComponent from '../components/paper';

import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={styles.container}>
      <PaperComponent.Headline style={styles.title}>This screen doesn't exist.</PaperComponent.Headline>
      <TouchableOpacity onPress={() => navigation.replace('Landing')} style={styles.link}>
        <PaperComponent.Text style={styles.linkText}>Go to home screen!</PaperComponent.Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
