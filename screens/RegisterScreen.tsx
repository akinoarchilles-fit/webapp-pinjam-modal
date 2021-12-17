import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Keyboard, Platform, StyleSheet } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { Text, View } from '../components/Themed';
import Lodash from 'lodash';
import {useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import PaperComponent from '../components/paper';
import Strings from './Strings';
import { Feather } from '@expo/vector-icons';
import Constants from '../resources/Constants';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const {emailForm, fullNameForm} = Strings;
  const [passwordForm, setPasswordForm] = React.useState(Strings.passwordForm);
  const [confirmPasswordForm, setConfirmPasswordForm] = React.useState(
    Strings.confirmPasswordForm,
  );
  const [editableInput, setEditableInput] = React.useState(false);
  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
  } = useForm();
  const [showKeyboard, setShowKeyboard] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setEditableInput(true);
    }, 300);
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setShowKeyboard(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setShowKeyboard(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  function onRegisterPress() {
    navigation.navigate('Success');
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <View style={styles.infoTextView}>
        <Text
          style={[styles.normalText]}>
          <Text style={styles.boldText}>
            Selamat Datang,
          </Text>
          {'\n'}Cukup lengkapi data berikut, maka akunmu sudah terbuat.
        </Text>
      </View>
      <Controller
        name='fullName'
        control={control}
        rules={{required: true, pattern: fullNameForm.regexPattern}}
        defaultValue=''
        render={({field: {onChange, value}}) => (
          <PaperComponent.Input
            item={fullNameForm}
            value={value}
            error={errors.fullName}
            editable={editableInput}
            onChangeText={(value: string) => onChange(value)}
          />
        )}
      />
      <Controller
        name='email'
        control={control}
        rules={{required: true, pattern: emailForm.regexPattern}}
        defaultValue=''
        render={({field: {onChange, value}}) => (
          <PaperComponent.Input
            item={emailForm}
            value={value}
            error={errors.email}
            editable={editableInput}
            onChangeText={(value: string) => onChange(value.trim().toLowerCase())}
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        rules={{required: true, minLength: 10}}
        defaultValue=''
        render={({field: {onChange, value}}) => (
          <PaperComponent.Input
            item={passwordForm}
            value={value}
            error={errors.password}
            editable={editableInput}
            onChangeText={(value: string) => onChange(value.trim())}
            right={
              <TextInput.Icon
                name={passwordForm.secureTextEntry ? 'eye-off' : 'eye'}
                size={20}
                color={
                  errors.password
                    ? theme.colors.error
                    : passwordForm.secureTextEntry
                      ? theme.colors.accent
                      : 'black'
                }
                onPress={() =>
                  setPasswordForm({
                    ...passwordForm,
                    secureTextEntry: !passwordForm.secureTextEntry,
                  })
                }
              />
            }
          />
        )}
      />
      <Controller
        name='confirmPassword'
        control={control}
        rules={{
          required: true,
          validate: (value) => value === getValues('password'),
        }}
        defaultValue=''
        render={({field: {onChange, value}}) => (
          <PaperComponent.Input
            item={confirmPasswordForm}
            value={value}
            error={errors.confirmPassword}
            editable={editableInput}
            onChangeText={(value: string) => onChange(value.trim())}
            right={
              <TextInput.Icon
                name={confirmPasswordForm.secureTextEntry ? 'eye-off' : 'eye'}
                size={20}
                color={
                  confirmPasswordForm.secureTextEntry
                    ? theme.colors.accent
                    : theme.colors.primary
                }
                onPress={() =>
                  setConfirmPasswordForm({
                    ...confirmPasswordForm,
                    secureTextEntry: !confirmPasswordForm.secureTextEntry,
                  })
                }
              />
            }
          />
        )}
      />
      <View
        style={[
          styles.infoPasswordContainer,
          {backgroundColor: theme.colors.surface},
        ]}>
        <Feather
          name={'info'}
          size={24}
          color={theme.colors.text}
          style={{flex: 0.7}}
        />
        <PaperComponent.Text style={styles.infoPassword}>
          {Strings.infoPassword}
        </PaperComponent.Text>
      </View>
      <Button
        onPress={Lodash.debounce(handleSubmit(onRegisterPress), 1000, {
          leading: true,
          trailing: false,
        })}>
        Daftar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Constants.screenWidth,
        alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  mainView: {
    flex: 1,
  },
  customScrollView: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  infoTextView: {
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  forgetPasswordContainer: {
    alignItems: 'flex-end',
    marginRight: 8,
    marginBottom: 20,
  },
  forgetPassword: {
    color: '#2D98DA',
    fontSize: 14,
    letterSpacing: 0.4,
  },
  containerButton: {
    margin: 8,
    borderRadius: 6,
  },
  titleButton: {
    fontSize: 16,
    letterSpacing: 0.4,
  },
  infoPasswordContainer: {
    flexDirection: 'row',
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  infoPassword: {
    flex: 8,
    marginLeft: 10,
    letterSpacing: 0.4,
    fontSize: 12,
  },
  warn: {
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    marginBottom: 18,
  },
  warnInfo: {
    letterSpacing: 0.4,
    fontSize: 11,
  },
  normalText: {
    fontSize: 14,
    letterSpacing: 0.4,
  },
  boldText: {
    letterSpacing: 0.4,
  },
});
