
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Alert, Image, Platform, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';
import * as DocumentPicker from 'expo-document-picker';

interface Document{
  label: string;
  data: string | undefined;
}

export default function DocumentUploadScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  
  const [documents, setDocuments] = React.useState<Document[]>([
    {label: 'Foto KTP', data: undefined},
    {label: 'Foto Selfie dengan KTP', data: undefined},
    {label: 'Bukti Transaksi Usaha', data: undefined}
  ]);

  function onNextPress() {
    navigation.navigate('Success');
  }

  async function uploadDocument(index: number) {
    const result = await DocumentPicker.getDocumentAsync();
    if(result.type == 'success') {
      documents[index].data = result.uri
      setDocuments([...documents]);
    }
  }
  
  return (
    <View style={styles.main}>
      <View style={[styles.container, { borderColor: theme.colors.surface}]}>
        <PaperComponent.Headline style={styles.title}>Tentukan Nilai & Tenor Pinjaman</PaperComponent.Headline>
        <View style={[styles.separator, { backgroundColor: theme.colors.surface }]}/>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        <View style={styles.formContainer}>
          {
            documents.map((e, i) => (
              <View key={i} style={styles.formField}>
                <View style={{flex: 5}}>
                  <PaperComponent.Title>{e.label}</PaperComponent.Title>
                </View>
                <View style={{flex: 5}}>
                  {
                    e.data ? <Image source={{uri: e.data}} style={styles.docImage}/> : 
                    <PaperComponent.Button onPress={() => uploadDocument(i)}>Unggah</PaperComponent.Button>
                  }
                </View>
              </View>
            ))
          }
        </View>
      </View>
      <PaperComponent.Button onPress={Lodash.debounce(onNextPress, 1000, {
          leading: true,
          trailing: false,
        })} buttonStyle={styles.btnNext}>
        Lanjutkan
      </PaperComponent.Button>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 30,  
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 30
  },
  separator: {
    height: 2,
    width: '100%'
  },
  normalText: {
    fontSize: 14,
    letterSpacing: 0.4,
  },
  boldText: {
    letterSpacing: 0.4,
  },
  btnNext: {
    marginTop: 30
  },
  formContainer: {
    flex: 1,
    margin: 10,
    width: '100%'
  },
  formField: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  docImage: {
    height: 150,
    width: '100%',
    resizeMode: 'contain'
  }
});
