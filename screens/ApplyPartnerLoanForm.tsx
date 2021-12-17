import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Text, View } from '../components/Themed';

export default function ApplyPartnerLoanFormScreen() {
  const navigation = useNavigation();

  function onStartPress() {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pinjam Modal Pinjaman Partner</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <Button onPress={onStartPress}>Mulai ajukan</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
