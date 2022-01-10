import { STORE_TYPES } from "../types";

export const setFormData = (payload) => ({
  type: STORE_TYPES.SET_FORM,
  payload
})

export const nextHandler = (payload, formData, currentStep) => async (dispatch) => {
  dispatch(setFormData({loadingForm: true}));
  try {
    let form = formData
    let data = {
      instagram_account: payload.instagram,
      facebook_account: payload.facebook,
      line_account: payload.line,
      tokopedia_account: payload.tokopedia,
      shopee_account: payload.shopee,
      whatsapp: payload.whatsapp,
      industry_type_id: payload.industry_type,
      work_type_id: payload.work_type
    }
    form[currentStep] = data;
    dispatch(setFormData({form: form, currentStep: currentStep+1}));
  } catch (error) {
    console.log('OnlineStore nextHandler: ', error);
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}