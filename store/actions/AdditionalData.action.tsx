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
      loan_purpose: payload.loan_purpose,
      payment_options: payload.payment_options,
    }
    form[currentStep] = data;
    dispatch(setFormData({form: form, currentStep: currentStep+1}));
  } catch (error) {
    console.log('Banking nextHandler: ', error);
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}