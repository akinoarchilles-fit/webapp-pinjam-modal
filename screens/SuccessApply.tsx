import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import PaperComponent from '../components/paper';
import { View } from '../components/Themed';
import { FontWeightConfig } from '../resources/FontConfig';
import Fonts from '../resources/Fonts';

export default function SuccessApplyScreen() {
  const navigation = useNavigation();
  function onBackPress() {
    navigation.reset({
      index: 0,
    });
  }
  
  return (
    <View style={styles.container}>

      <StatusBar backgroundColor={'#2ECC71'} />
      <View style={{alignItems: 'center', backgroundColor: '#2ECC71'}}>
        <Image
          source={{uri: 'https://www.pngfind.com/pngs/m/169-1695521_kisspng-computer-icons-check-mark-presentation-symbol-ok.png'}}
          style={styles.img}
        />
        <PaperComponent.Headline style={styles.title}>
          Pengajuan Pinjaman Berhasil
        </PaperComponent.Headline>
        <PaperComponent.Subheading style={styles.desc}>
          Kami akan segera memproses data anda
        </PaperComponent.Subheading>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={Lodash.debounce(() => onBackPress(), 1000, {
            leading: true,
            trailing: false,
          })}
          style={styles.btn}>
          <PaperComponent.Title style={styles.btnText}>
            Kembali ke Dashboard
          </PaperComponent.Title>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ECC71'
  },
  img: {
    height: 180,
    width: 180,
  },
  title: {
    color: '#ffffff',
    fontFamily: Fonts.semiBold,
    fontWeight: FontWeightConfig.semiBold,
    fontSize: 16,
    letterSpacing: 0.4,
    marginTop: 25,
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  desc: {
    fontFamily: Fonts.regular,
    color: '#ffffff',
    letterSpacing: 0.4,
    fontSize: 13,
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  btn: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 25,
    height: 44,
    borderRadius: 44 / 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    marginTop: 25,
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 1.5},
    shadowRadius: 1.5,
  },
  btnText: {
    color: '#2ECC71',
  },
});
