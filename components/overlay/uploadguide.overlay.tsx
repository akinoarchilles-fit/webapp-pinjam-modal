import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  useColorScheme,
} from 'react-native';
import Lodash from 'lodash';
import PaperComponent from '../paper';
import UploadGuideString from '../../resources/forms/UploadGuide.string';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Constants from '../../resources/Constants';
import { StatusBar } from 'expo-status-bar';
import { IconButton, useTheme } from 'react-native-paper';

function UploadGuideModal ({}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const scheme = useColorScheme();
  const { correct_image, incorrect_image, note } = UploadGuideString;

  const listDetail = [
    {
      title: 'Dokumen yang benar',
      list: correct_image,
      type: 'image',
    },
    {
      title: 'Dokumen yang salah',
      list: incorrect_image,
      type: 'image',
    },
    {
      title: 'Ketentuan dokumen',
      list: note,
      type: 'string',
    },
  ];

  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <Modal
        isVisible={showModal}
        onBackButtonPress={() => setShowModal(false)}
        onBackdropPress={() => setShowModal(false)}
        backdropOpacity={0}
        statusBarTranslucent
        deviceWidth={Constants.screenWidth}
        // deviceHeight={Constants.screenHeight}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        hasBackdrop={false}
        backdropColor={'transparent'}
        onModalWillHide={() => navigation.goBack()}
        style={styles.modal}>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <View
            style={[
              styles.container,
              {
                backgroundColor:theme.colors.background,
              },
            ]}>
            
          <PaperComponent.Appbar type='modal' title={'Perhatian'}/>
          <FlatList
        data={listDetail}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item: {title, type, list}}) => (
          <View>
            {list.length !== 0 && (
              <PaperComponent.Title style={styles.title}>
                {title}
              </PaperComponent.Title>
            )}
            <FlatList
              data={list}
              keyExtractor={(item, index) => index.toString()}
              numColumns={type === 'image' ? 3 : 0}
              showsVerticalScrollIndicator={false}
              style={{padding: 15 / 2}}
              renderItem={({item}) =>
                type === 'image' ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={Lodash.debounce(
                      () =>
                        navigation.navigate('ImagePreviewOverlay', {
                          imageUrl: item,
                        }),
                      1000,
                      {
                        leading: true,
                        trailing: false,
                      },
                    )}
                    style={styles.imageContainer}>
                    <Image
                      source={{uri: item}}
                      resizeMode={'cover'}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                ) : (
                  <PaperComponent.Text style={styles.item}>
                    - {item}
                  </PaperComponent.Text>
                )
              }
            />
          </View>
        )}
      />
            </View>
      </Modal>
  );
}

export default UploadGuideModal;

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  imageContainer: {
    flex: 1 / 3,
    padding: 15 / 2,
  },
  image: {
    height: 130,
    borderRadius: 5,
  },
  item: {
    letterSpacing: 0.4,
    marginHorizontal: 15 / 2,
  },
  modal: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    margin: 0,
    width: Constants.screenWidth > 600 ? 480 : Constants.screenWidth,
    height: Constants.screenHeight
  },
  container: {
    elevation: 3,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    paddingBottom: 30,
    paddingTop: 10,
    height: Constants.screenHeight
  },
});
