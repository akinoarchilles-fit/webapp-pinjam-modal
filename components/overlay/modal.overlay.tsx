import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, useColorScheme, View } from "react-native";
import Modal from 'react-native-modal';
import { IconButton, List, useTheme } from "react-native-paper";
import PaperComponent from '../paper';
import Lodash from 'lodash';
import Fonts from '../../resources/Fonts';
import Constants from '../../resources/Constants';
import { FontWeightConfig } from '../../resources/FontConfig';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

function OptionForm ({
  route, navigation
}:NativeStackScreenProps<RootStackParamList, 'OptionForm'>) { 
  const theme = useTheme();
  const scheme = useColorScheme();
  const { alias, data, selected, onPressHandler } = route.params;

  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    setShowModal(true);
  }, []);

  function onPressItem(index: number) {
    onPressHandler(index);
    setShowModal(false);
  }

  return (
    <View style={styles.screen}>
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
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === 'ios' ? 'position' : 'padding'}>
          <View
            style={[
              styles.container,
              {
                backgroundColor:
                  scheme === 'dark'
                    ? theme.colors.surface
                    : theme.colors.background,
              },
            ]}>
            <PaperComponent.Appbar
              type='modal'
              title={alias}
              appbarStyle={{
                backgroundColor:
                  scheme === 'dark'
                    ? theme.colors.surface
                    : theme.colors.background,
                elevation: 0,
                borderBottomWidth: 0,
              }}
            />
            <FlatList
              data={data}
              scrollEnabled={true}
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{flexGrow: 1}}
              renderItem={({item, index}) => (
                <List.Item
                  title={typeof item === 'object' ? item.category ?? item.value : item}
                  titleStyle={styles.itemTitle}
                  titleNumberOfLines={2}
                  style={[
                    styles.item,
                    {borderColor: theme.colors.accent},
                  ]}
                  left={() => (
                    <List.Icon
                      icon={
                        item && item.toString() && index === selected
                          ? 'checkbox-marked-circle-outline'
                          : 'circle-outline'
                      }
                      color={
                        item && item.toString() && index === selected
                          ? theme.colors.primary
                          : theme.colors.accent
                      }
                    />
                  )}
                  onPress={Lodash.debounce(
                    () =>
                    item && item.toString() && index === selected
                        ? setShowModal(false)
                        : onPressItem(index),
                    1000,
                    {
                      leading: true,
                      trailing: false,
                    },
                  )}
                />
              )}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

export default OptionForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
  item: {
    paddingVertical: 0,
  },
  title: {
    color: '#000000',
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    letterSpacing: 0.4,
  },
  itemTitle: {
    fontFamily: Fonts.medium,
    fontWeight: FontWeightConfig.medium,
    fontSize: 14,
    letterSpacing: 0.4,
  },
  errorMessageContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
  },
  searchContainer: {
    width: Constants.screenWidth,
    height: 50,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF1F8',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 8,
    alignContent: 'center',
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  searchLeftIcon: {
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    padding: 0,
    margin: 0,
    borderWidth: 0,
    fontFamily: Fonts.medium,
    fontSize: 12,
    letterSpacing: 0.4,
  },
  searchIconRigth: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  loading: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});