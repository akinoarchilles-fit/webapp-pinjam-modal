
import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar as PaperAppbar} from 'react-native-paper';
import Constants from '../../resources/Constants';
import { FontWeightConfig } from '../../resources/FontConfig';
import Fonts from '../../resources/Fonts';
import Help from './SubComponent/Help.SubComponent';

function Appbar ({
  type = 'activity',
  appbarStyle,
  title,
  titleContainerStyle,
  titleStyle,
  onClick,
  hideLeftComponent,
  rightComponent,
  showHelp,
  onHelpPress,
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <PaperAppbar.Header
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
        },
        appbarStyle,
      ]}
      theme={{colors: {primary: '#FFFFFF'}}}>
      {!hideLeftComponent &&
        (type === 'activity' ? (
          <PaperAppbar.BackAction
            onPress={() => (onClick ? onClick() : navigation.goBack())}
          />
        ) : (
          <PaperAppbar.Action
            icon={'close'}
            color={theme.colors.text}
            onPress={() => (onClick ? onClick() : navigation.goBack())}
          />
        ))}
      <View
        style={[
          StyleSheet.absoluteFill,
          {alignItems: 'center', justifyContent: 'center'},
          titleContainerStyle,
        ]}
        pointerEvents={'box-none'}>
        <PaperAppbar.Content
          title={
            typeof title === 'string' && title !== ''
              ? Constants.screenWidth < 400
                ? title.length >= 25
                  ? title.substring(0, 25).concat('...')
                  : title
                : title.length >= 30
                  ? title.substring(0, 30).concat('...')
                  : title
              : title
          }
          titleStyle={[styles.headerTitle, titleStyle]}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          color={theme.colors.text}
        />
      </View>
      <View style={{flex: 1}} />
      {rightComponent && rightComponent.map((elements) => elements)}
      {showHelp && (
        <Help title={title} type={type} onPress={onHelpPress ?? null} />
      )}
    </PaperAppbar.Header>
  );
}

export default Appbar;

const styles = StyleSheet.create({
  container: {
    elevation: 0,
    borderBottomWidth: 1,
    minHeight: 40,
  },
  headerTitle: {
    letterSpacing: 0.4,
    fontSize: 16,
    fontWeight: FontWeightConfig.semiBold,
    fontFamily: Fonts.semiBold,
  },
});
