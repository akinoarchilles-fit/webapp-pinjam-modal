import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';
import RegisterForms from '../resources/forms/Register.validation';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const {sellerIdForm, emailForm, fullNameForm, phoneNumberForm} = RegisterForms;
  const [passwordForm, setPasswordForm] = React.useState(RegisterForms.passwordForm);
  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
  } = useForm();

  function onBackPress() {
    navigation.canGoBack() ? navigation.goBack() : null
  }

  function onRegisterPress() {
    navigation.navigate('LoanCalculation');
  }
  
  return (
    <View style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { borderColor: theme.colors.surface}]}>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        <View style={styles.formContainer}>
          <View style={styles.formField}>
            <Controller
              name={sellerIdForm.key}
              control={control}
              rules={{required: true, pattern: sellerIdForm.regexPattern}}
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <PaperComponent.Input
                  item={sellerIdForm}
                  value={value}
                  error={errors[sellerIdForm.key]}
                  editable={true}
                  onChangeText={(value: string) => onChange(value.trim().toLowerCase())}
                />
              )}
            />
          </View>
          <View style={styles.formField}>
            <Controller
              name={emailForm.key}
              control={control}
              rules={{required: true, pattern: emailForm.regexPattern}}
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <PaperComponent.Input
                  item={emailForm}
                  value={value}
                  error={errors[emailForm.key]}
                  editable={true}
                  onChangeText={(value: string) => onChange(value.trim().toLowerCase())}
                />
              )}
            />
          </View>
          <View style={styles.formField}>
            <Controller
              name={passwordForm.key}
              control={control}
              rules={{required: true, minLength: 10}}
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <PaperComponent.Input
                  item={passwordForm}
                  value={value}
                  error={errors[passwordForm.key]}
                  editable={true}
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
          </View>
          <View style={styles.formField}>
            <Controller
              name={fullNameForm.key}
              control={control}
              rules={{required: true, pattern: fullNameForm.regexPattern}}
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <PaperComponent.Input
                  item={fullNameForm}
                  value={value}
                  error={errors[fullNameForm.key]}
                  editable={true}
                  onChangeText={(value: string) => onChange(value)}
                />
              )}
            />
          </View>
          <View style={styles.formField}>
            <Controller
              name={phoneNumberForm.key}
              control={control}
              rules={{required: true, pattern: phoneNumberForm.regexPattern}}
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <PaperComponent.Input
                  item={phoneNumberForm}
                  value={value}
                  error={errors[phoneNumberForm.key]}
                  editable={true}
                  onChangeText={(value: string) => onChange(value)}
                />
              )}
            />
          </View>
        </View>
      </View>
      </ScrollView>
      <View style={styles.footer}>
        <PaperComponent.Button onPress={Lodash.debounce(handleSubmit(onRegisterPress), 1000, {
            leading: true,
            trailing: false,
          })} buttonStyle={styles.btnNext}>
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
  normalText: {
    fontSize: 14,
    letterSpacing: 0.4,
  },
  boldText: {
    letterSpacing: 0.4,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'  
  },
  formContainer: {
    padding: 10,
    paddingHorizontal: 15,
    width: '100%'
  },
  formField: {
    marginVertical: 5
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
