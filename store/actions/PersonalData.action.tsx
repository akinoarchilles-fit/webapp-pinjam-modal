import moment from "moment";
import { STORE_TYPES } from "../types";

export const setFormData = (payload) => ({
  type: STORE_TYPES.SET_FORM,
  payload
})

export const nextHandler = (payload, formData, currentStep) => async (dispatch) => {
  dispatch(setFormData({loadingForm: true}));
  console.log(payload)
  try {
    let data = {
      gender_id: formData[currentStep].gender.id,
      id_number: payload.idNumber,
      religion_id: payload.religion,
      education_id: payload.education,
      marital_status_id: payload.maritalStatus,
      place_of_birth: payload.birthplace,
      date_of_birth: moment(payload.birthdate).format('DD/MM/YYYY'),
      maiden_name: payload.maidenName,
      phone_number: payload.homePhone,
      address: payload.address,
      rt: payload.rt,
      rw: payload.rw,
      region: payload.region,
      city: payload.city,
      district: payload.district,
      sub_district: payload.subdistrict,
      postal_code: payload.postalcode,
      have_online_store: payload.have_online_store,
      reference_name: payload.referenceName ?? '',
      reference_relation: payload.referenceRelation ?? '',
      reference_mobile_number: payload.referencePhone ?? '',
    }
    formData[currentStep] = data;
    dispatch(setFormData({form: formData, currentStep: currentStep+1}));
  } catch (error) {
    console.log('registerHandler: ', error);
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}