import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

function ImagePreviewOverlay ({route}) {
  const {imageUrl} = route.params;
  return (
    <View style={styles.screen}>
      <Image
        source={{uri: imageUrl}}
        resizeMode='contain'
        style={styles.image}
      />
    </View>
  );
}

export default ImagePreviewOverlay;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
