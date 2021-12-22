import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import DatePicker from "react-datepicker";
import { KeyboardAvoidingView, Platform, StyleSheet, useColorScheme, View } from "react-native";
import Modal from 'react-native-modal';
import { IconButton, useTheme } from "react-native-paper";
import Constants from '../../resources/Constants';
import { FontWeightConfig } from '../../resources/FontConfig';
import Fonts from '../../resources/Fonts';
import PaperComponent from '../paper';

function DateForm ({
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
  const [startDate, setStartDate] = React.useState(new Date());

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
            <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />,
          </View>
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