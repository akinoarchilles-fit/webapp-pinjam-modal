import { STORE_TYPES } from "../types";

export const setFormData = (payload) => ({
  type: STORE_TYPES.SET_FORM,
  payload
})

export const uploadHandler = (payload, formData, currentStep) => async (dispatch) => {
  dispatch(setFormData({loadingForm: true}));
  try {
    let form = formData
    let data = {
      id_card_image: payload.idcard,
      selfie_id_card_image: payload.selfie,
    }
    form[currentStep] = data;
    dispatch(setFormData({form: form, currentStep: currentStep+1}));
  } catch (error) {
    console.log('registerHandler: ', error);
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}