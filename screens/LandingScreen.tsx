import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';

export default function LandingScreen() {
  const navigation = useNavigation();

  const theme = useTheme();

  function onStartPress() {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/pm-full-logo.webp')} style={styles.logo}/>
      <PaperComponent.Headline style={styles.title}>Pinjaman Partner</PaperComponent.Headline>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View style={[styles.separator, { backgroundColor: 'white'}]}/>
      <PaperComponent.Button onPress={onStartPress}>Mulai ajukan</PaperComponent.Button>
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
  logo: {
    width: 700,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 40
  }
});
