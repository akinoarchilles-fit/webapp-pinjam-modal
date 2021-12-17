import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Utility from '../../../resources/Utility';
import Fonts from '../../../resources/Fonts';
import { FontWeightConfig } from '../../../resources/FontConfig';
import PaperComponent from '..';

const InputForm = ({
  listForm,
  loanId,
  position,
  stepForm,
  attribute,
  setApply,
}) => {
  const {
    alias,
    placeholder,
    error,
    errorMessage,
    type_keyboard,
    value,
    is_currency,
    conditionField,
    api_revision,
    name,
    required,
    disabled,
  } = attribute;
  let defaultValue = value === '' || value === null || value === 0 ? '' : value;
  if (is_currency && value !== null && parseInt(value) !== 0) {
    defaultValue = Utility.thousandSeparator(value);
  }

  const setInputValue = (value) => {
    const inputValue =
      type_keyboard === 'number' ? value.replace(/[^0-9]/g, '') : value;
    let newListForm = listForm;
    newListForm[stepForm].listComponent[position].value = inputValue;
    newListForm[stepForm].listComponent[position].error = false;
  };

  const onEndEditingHandler = async () => {
    try {
      if (api_revision && loanId) {
        
      }
      let newListForm = listForm;
      if ((value !== '' || value !== null) && required !== undefined) {
        newListForm[stepForm].listComponent[position].required = true;
      }

      if ((value === '' || value === null) && required !== undefined) {
        newListForm[stepForm].listComponent[position].required = false;
      }
    } catch (error) {
      console.log('onEndEditingHandler ', error);
    }
  };

  const isShow = FormHelper.showComponent(conditionField, listForm, stepForm);
  return isShow ? (
    <View
      style={[
        styles.inputView,
        {
          paddingTop: position === 0 ? 10 : 5,
        },
      ]}>
      <TextInput
        ref={(ref) =>
          ref &&
          ref.setNativeProps({
            style: {
              fontFamily: Fonts.semiBold,
              fontWeight: FontWeightConfig.semiBold,
            },
          })
        }
        dense
        label={alias}
        value={defaultValue.toString()}
        placeholder={placeholder}
        error={error}
        autoCorrect={false}
        disabled={disabled}
        onChangeText={setInputValue}
        onEndEditing={onEndEditingHandler}
        keyboardType={type_keyboard === 'number' ? 'number-pad' : 'default'}
        returnKeyType={'done'}
        underlineColorAndroid={'transparent'}
        style={styles.input}
      />
      {error && (
        <PaperComponent.HelperText type={'error'}>
          *{errorMessage}
        </PaperComponent.HelperText>
      )}
    </View>
  ) : null;
};

export default InputForm;

const styles = StyleSheet.create({
  error: {
    paddingHorizontal: 5,
    letterSpacing: 0.4,
  },
  inputView: {
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  input: {
    fontSize: 14,
    letterSpacing: 0.4,
    paddingHorizontal: 5,
    fontFamily: Fonts.semiBold,
    fontWeight: FontWeightConfig.semiBold,
    backgroundColor: 'transparent',
    width: '100%',
  },
});
