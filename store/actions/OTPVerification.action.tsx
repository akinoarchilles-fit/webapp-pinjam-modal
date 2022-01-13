import FormService from "../../services/FormService";
import { STORE_TYPES } from "../types";
import { submitApplication } from "./Form.action";

export const setFormData = (payload:any) => ({
  type: STORE_TYPES.SET_FORM,
  payload
})

export const nextHandler = (payload:any, formData:any, currentStep:any) => async (dispatch:any) => {
  try {
    let form = formData
    let data = {
      is_final: true
    }
    form[currentStep] = data;
    dispatch(setFormData({form: form}));
  } catch (error) {
    console.log('OTP nextHandler: ', error);
  } finally {
  }
}

export const getOTP = (email:string) => async (dispatch:any) => {
  dispatch(setFormData({loadingForm: true}));
  try {
    console.log(await FormService.getOTP({email:email}));
  } catch (error) {
    console.log('getOTP error: ', error);
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}

export const confirmOTP = (email: string, otp: string) => async (dispatch:any) => {
  dispatch(setFormData({loadingForm: true}));
  try {
    await FormService.confirmOTP({email:email, otp_number:otp});
    dispatch(setFormData({isOTPVerified: true}));
  } catch (error) {
    console.log('confirmOTP error: ', error);
    dispatch(setFormData({applyErrorMessage: error.error}))
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}