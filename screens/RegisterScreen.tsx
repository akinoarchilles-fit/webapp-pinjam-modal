import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Lodash from 'lodash';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import PaperComponent from '../components/paper';
import Strings from './Strings';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const {emailForm, fullNameForm, phoneNumberForm} = Strings;
  const [passwordForm, setPasswordForm] = React.useState(Strings.passwordForm);
  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
  } = useForm();

  function onRegisterPress() {
    navigation.navigate('LoanCalculation');
  }
  
  return (
    <View style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { borderColor: theme.colors.surface}]}>
        <PaperComponent.Headline style={styles.title}>Isi Data Registrasi</PaperComponent.Headline>
        <View style={[styles.separator, { backgroundColor: theme.colors.surface }]}/>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        <View style={styles.formContainer}>
          <View style={styles.formField}>
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
                  editable={true}
                  onChangeText={(value: string) => onChange(value.trim().toLowerCase())}
                />
              )}
            />
          </View>
          <View style={styles.formField}>
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
              name='fullName'
              control={control}
              rules={{required: true, pattern: fullNameForm.regexPattern}}
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <PaperComponent.Input
                  item={fullNameForm}
                  value={value}
                  error={errors.fullName}
                  editable={true}
                  onChangeText={(value: string) => onChange(value)}
                />
              )}
            />
          </View>
          <View style={styles.formField}>
            <Controller
              name='phoneNumber'
              control={control}
              rules={{required: true, pattern: phoneNumberForm.regexPattern}}
              defaultValue=''
              render={({field: {onChange, value}}) => (
                <PaperComponent.Input
                  item={phoneNumberForm}
                  value={value}
                  error={errors.phoneNumber}
                  editable={true}
                  onChangeText={(value: string) => onChange(value)}
                />
              )}
            />
          </View>
        </View>
      </View>
      </ScrollView>
      <PaperComponent.Button onPress={Lodash.debounce(handleSubmit(onRegisterPress), 1000, {
          leading: true,
          trailing: false,
        })} buttonStyle={styles.btnNext}>
        Lanjutkan
      </PaperComponent.Button>
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
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 30
  },
  separator: {
    height: 2,
    width: '100%'
  },
  normalText: {
    fontSize: 14,
    letterSpacing: 0.4,
  },
  boldText: {
    letterSpacing: 0.4,
  },
  btnNext: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'  
  },
  formContainer: {
    padding: 20,
    width: '100%'
  },
  formField: {
    marginVertical: 5
  }
});
