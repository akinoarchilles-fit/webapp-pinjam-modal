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

function OptionForm ({
  alias,
  onPressHandler,
}:{ 
  alias: string, 
  onPressHandler: Function 
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const scheme = useColorScheme();

  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <View style={styles.screen}>
      <Modal
        isVisible={showModal}
        onBackButtonPress={() => setShowModal(false)}
        onBackdropPress={() => setShowModal(false)}
        backdropOpacity={0.7}
        statusBarTranslucent
        deviceWidth={Constants.screenWidth}
        deviceHeight={Constants.screenHeight}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
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
              hideLeftComponent
              title={alias}
              appbarStyle={{
                backgroundColor:
                  scheme === 'dark'
                    ? theme.colors.surface
                    : theme.colors.background,
                elevation: 0,
                borderBottomWidth: 0,
              }}
              rightComponent={[
                <IconButton
                  key={'close'}
                  icon={'close'}
                  onPress={() => setShowModal(false)}
                />,
              ]}
            />
            <FlatList
              data={[0,1,2,3,4,5]}
              stickyHeaderIndices={[0]}
              scrollEnabled={true}
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{flexGrow: 1}}
              renderItem={({item, index}) => (
                <List.Item
                  title={item}
                  titleStyle={styles.itemTitle}
                  titleNumberOfLines={2}
                  style={[
                    styles.item,
                    {borderColor: theme.colors.accent},
                  ]}
                  left={() => (
                    <List.Icon
                      icon={
                        item && item.toString()
                          ? 'checkbox-marked-circle-outline'
                          : 'circle-outline'
                      }
                      color={
                        item && item.toString()
                          ? theme.colors.primary
                          : theme.colors.accent
                      }
                    />
                  )}
                  onPress={Lodash.debounce(
                    () =>
                    item && item.toString()
                        ? setShowModal(false)
                        : onPressHandler(item),
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
  },
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    paddingBottom: 30,
    paddingTop: 10,
    maxHeight: Constants.screenHeight / 2,
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