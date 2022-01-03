import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Lodash from 'lodash';
import PaperComponent from '../paper';
import UploadGuideString from '../../resources/forms/UploadGuide.string';
import { useNavigation } from '@react-navigation/native';

function UploadGuideModal ({}) {
  const navigation = useNavigation();
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

  return (
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
});
