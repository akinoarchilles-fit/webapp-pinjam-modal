import FormService from "../../services/FormService";
import { STORE_TYPES } from "../types";

export const setFormData = (payload) => ({
  type: STORE_TYPES.SET_FORM,
  payload
})

export const getLoanConfiguration = (formData) => async(dispatch) => {
  try {
    let reqPayload = {
      email: formData[0].email,
      phone_number: formData[0].phone_number,
      reference_id: formData[0].seller_id,
      reference_type: 'seller_id'
    }
    const { data } = await FormService.getLoanConfiguration(reqPayload)
    dispatch(setFormData({loanConfigurationData: data}));
  } catch (error) {
    console.log('calculateLoan: ', error);
    dispatch(setFormData({loanConfigurationData: null}))
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}

export const getPlafond = () => async(dispatch) => {
  try {
    const { data } = await FormService.getLoanPlafond();
    dispatch(setFormData({loanPlafondData: data}));
  } catch (error) {
    console.log('calculateLoan: ', error);
    dispatch(setFormData({loanPlafondData: null}))
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}

export const calculateLoan = (payload, formData) => async(dispatch) => {
  try {
    let reqPayload = {
      loanAmount: payload.amount,
      loanLength: payload.duration,
      reference_id: formData[0].seller_id,
      reference_type: 'seller_id'
    }
    const { data } = await FormService.getLoanCalculation(reqPayload)
    dispatch(setFormData({loanCalculationData: data}));
  } catch (error) {
    console.log('calculateLoan: ', error);
    dispatch(setFormData({loanCalculationData: null}))
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}

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