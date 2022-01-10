import { STORE_TYPES } from "../types";

export const setFormData = (payload) => ({
  type: STORE_TYPES.SET_FORM,
  payload
})

export const loanHandler = (payload, formData, currentStep) => async (dispatch) => {
  dispatch(setFormData({loadingForm: true}));
  try {
    let form = formData
    let data = {
      loan_amount: payload.amount,
      loan_length: payload.duration,
    }
    form[currentStep] = data;
    dispatch(setFormData({form: form, currentStep: currentStep+1}));
  } catch (error) {
    console.log('registerHandler: ', error);
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}