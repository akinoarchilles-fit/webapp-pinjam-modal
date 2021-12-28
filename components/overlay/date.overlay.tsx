import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import Lodash from 'lodash';
import Modal from 'react-native-modal';
import { IconButton, List, useTheme } from "react-native-paper";
import Constants from '../../resources/Constants';
import { FontWeightConfig } from '../../resources/FontConfig';
import Fonts from '../../resources/Fonts';
import { RootStackParamList } from '../../types';
import PaperComponent from '../paper';

function DateForm ({
  route, navigation
}:NativeStackScreenProps<RootStackParamList, 'DateForm'>) { 
  const theme = useTheme();
  const scheme = useColorScheme();
  const { alias, data, selected, onPressHandler } = route.params;
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    setShowModal(true);
  }, []);

  function onPressDate(index: number) {
    onPressHandler(index);
    setShowModal(false);
  }

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
          <ScrollView
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
            {data.map((item: any, i) => (
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
                      item && item.toString() && i == selected
                        ? 'checkbox-marked-circle-outline'
                        : 'circle-outline'
                    }
                    color={
                      item && item.toString() && i == selected
                        ? theme.colors.primary
                        : theme.colors.accent
                    }
                  />
                )}
                onPress={Lodash.debounce(
                  () =>
                  item && item.toString() && i == selected
                      ? setShowModal(false)
                      : onPressDate(i),
                  1000,
                  {
                    leading: true,
                    trailing: false,
                  },
                )}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

export default DateForm;

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
    minHeight: 200
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