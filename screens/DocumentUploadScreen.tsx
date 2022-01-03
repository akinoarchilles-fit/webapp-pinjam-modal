
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, IconButton, useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';
import * as DocumentPicker from 'expo-document-picker';
import Fonts from '../resources/Fonts';
import { FontWeightConfig } from '../resources/FontConfig';

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

  React.useEffect(() => {
    navigation.navigate('UploadGuideOverlay');
  }, []);
  
  return (
    <View style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, { borderColor: theme.colors.surface}]}>
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

          <View style={styles.formContainer}>
            {
              documents.map((e, i) => (
                <View key={i} style={styles.formField}>
                  <View style={[styles.tileContainer, {borderColor: theme.colors.border}]}>
                    <View style={{flex: 1.7}}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {uploadDocument(i)}
                        }>
                        <View style={{paddingBottom: 10}}>
                          <View>
                            <Avatar.Image
                              size={48}
                              source={{
                                uri: e.data,
                              }}
                              style={{backgroundColor: theme.colors.accent}}
                            />
                            {!Lodash.isEmpty(e.data) && e.data && (
                              <Avatar.Icon
                                icon={'check'}
                                size={30}
                                style={styles.accessory}
                              />
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 7}}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={Lodash.debounce(() => {uploadDocument(i)}, 1000, {
                          leading: true,
                          trailing: false,
                        })}>
                        <PaperComponent.Title style={styles.titleStyle}>
                          {e.label}
                        </PaperComponent.Title>
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 1.5}}>
                      <IconButton
                        icon={'chevron-right'}
                        size={24}
                        onPress={() => {uploadDocument(i)}}
                      />
                    </View>
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
  tileContainer: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 15,
    paddingLeft: 15,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
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
  titleStyle: {
    fontFamily: Fonts.semiBold,
    fontWeight: FontWeightConfig.semiBold,
    letterSpacing: 0.4,
    fontSize: 14,
    minHeight: 0,
    lineHeight: null,
    paddingLeft: 10,
  },
  accessory: {
    backgroundColor: '#2A8FF6',
    elevation: 3,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 3,
    right: 7,
    bottom: -10,
    position: 'absolute',
  },
  footer: {
    paddingVertical: 10
  },
  btnBack: {
    paddingVertical: 3,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  btnNext: {
    paddingVertical: 3,
    marginBottom: 10,
  }
});
