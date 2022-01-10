import { STORE_TYPES } from "../types";

export const setFormData = (payload:any) => ({
  type: STORE_TYPES.SET_FORM,
  payload
})

export const nextHandler = (payload:any, formData:any, currentStep:any) => async (dispatch:any) => {
  dispatch(setFormData({loadingForm: true}));
  try {
    let form = formData
    let data = {
      bank_account_number: payload.bankingNumber,
      bank_account_name: payload.bankingName,
      bank_id: payload.bank_id
    }
    form[currentStep] = data;
    dispatch(setFormData({form: form, currentStep: currentStep+1}));
  } catch (error) {
    console.log('Banking nextHandler: ', error);
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}