import { STORE_TYPES } from "../types";

export const setFormData = (payload:any) => ({
  type: STORE_TYPES.SET_FORM,
  payload
})

export const registerHandler = (payload:any, formData:any, currentStep:number) => async (dispatch:any) => {
  dispatch(setFormData({loadingForm: true}));
  try {
    let form = formData
    let data = {
      email: payload.email,
      password: payload.password,
      fullname: payload.fullName,
      mobile_number: payload.phoneNumber,
      seller_id: payload.sellerId
    }
    form[currentStep] = data;
    dispatch(setFormData({form: form, currentStep: currentStep+1}));
  } catch (error) {
    console.log('registerHandler: ', error);
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}