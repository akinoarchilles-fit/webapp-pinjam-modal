
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
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
    // {label: 'Bukti Transaksi Usaha', data: undefined}
  ]);

  function onBackPress() {
    navigation.canGoBack() ? navigation.goBack() : null
  }

  function onNextPress() {
    navigation.navigate('PersonalData');
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
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, { borderColor: theme.colors.surface}]}>
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
      </ScrollView>
      <View style={styles.footer}>
        <PaperComponent.Button onPress={Lodash.debounce(onNextPress, 1000, {
          leading: true,
          trailing: false,
        })} buttonStyle={styles.btnNext}
          disabled={!(documents.every(e => e.data))}>
          Lanjutkan
        </PaperComponent.Button>
        <PaperComponent.Button onPress={Lodash.debounce(onBackPress, 1000, {
            leading: true,
            trailing: false,
          })} buttonStyle={[styles.btnBack, { borderColor: theme.colors.primary }]} buttonLabelStyle={{color: theme.colors.primary}} 
          disabled={!navigation.canGoBack()}>
          Kembali
        </PaperComponent.Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  scrollContainer: {
    padding: 10
  },
  normalText: {
    fontSize: 14,
    letterSpacing: 0.4,
  },
  boldText: {
    letterSpacing: 0.4,
  },
  formContainer: {
    padding: 10,
    paddingHorizontal: 15,
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
  },
  footer: {
    paddingVertical: 10
  },
  btnBack: {
    paddingVertical: 3,
    backgroundColor: 'white',
  },
  btnNext: {
    paddingVertical: 3,
    marginBottom: 10,
  }
});
