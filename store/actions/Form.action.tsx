import { STORE_TYPES } from "../types"
import FormService from "../../services/FormService"

export const setFormData = (payload) => ({
  type: STORE_TYPES.SET_FORM,
  payload
})

export const getMasterFormData = () => async (dispatch) => {
  dispatch(setFormData({loadingForm: true}));
  try {
    const { data } = await FormService.getMaster();
    dispatch(setFormData({genderSelection: data[0].value}))
    dispatch(setFormData({religionSelection: data[1].value}))
    dispatch(setFormData({bankSelection: data[2].value}))
    dispatch(setFormData({educationSelection: data[4].value}))
    dispatch(setFormData({maritalStatusSelection: data[5].value}))
    dispatch(setFormData({workingLengthSelection: data[6].value}))
    dispatch(setFormData({industryTypeSelection: data[7].value}))
    dispatch(setFormData({referenceRelationTypeSelection: data[8].value}))
  } catch (error) {
    console.log('getBannerProductList: ', error);
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}

export const getProvince = () => async (dispatch) => {
  dispatch(setFormData({loadingForm: true}));
  try {
    const { data } = await FormService.getProvince();
    console.log(data)
    dispatch(setFormData({provinceList: data}))
  } catch (error) {
    console.log('getBannerProductList: ', error);
  } finally {
    dispatch(setFormData({loadingForm: false}));
  }
}

export const getLocationList = (region?:string, city?:string, district?:string, sub_district?:string) => async (dispatch) => {
  try {
    let url = 'https://api-development.pinjammodal.id:8443/supplier/region';
    let body = {};
    if(sub_district != null) {
      url = 'https://api-development.pinjammodal.id:8443/supplier/postal_code'
      body = {
        "city" : city,
        "district" : district,
        "sub_district" : sub_district
      }
      const { data } = await FormService.getLocationList(url, body);
      dispatch(setFormData({postalCodeList: data}))
    }
    else if(district != null) {
      url = 'https://api-development.pinjammodal.id:8443/supplier/sub_district'
      body = {
        "city" : city,
        "district" : district,
      }
      const { data } = await FormService.getLocationList(url, body);
      dispatch(setFormData({subdistrictList: data}))
    }
    else if(city != null) {
      url = 'https://api-development.pinjammodal.id:8443/supplier/district'
      body = {
        "city" : city,
      }
      const { data } = await FormService.getLocationList(url, body);
      dispatch(setFormData({districtList: data}))
    }
    else if(region != null) {
      console.log(region)
      url = 'https://api-development.pinjammodal.id:8443/supplier/city'
      body = {
        "region" : region
      }
      const { data } = await FormService.getLocationList(url, body);
      dispatch(setFormData({cityList: data}))
    }
  } catch (error) {
    console.log('getBannerProductList: ', error);
  } finally {
  }
}

export const submitApplication = (formData:Array<Object>) => async(dispatch:any) => {
  let applyData = new FormData();
  Object.keys(formData).map(formKey => {
    Object.keys(formData[formKey]).map(key => {
      console.log(key, formData[formKey][key])
      applyData.append(key, formData[formKey][key]);
    })
  })
  await fetch(formData['2'].id_card_image)
  .then(res => res.blob())
  .then(blob => {
  const id_card_image = new File([blob], "id_card_image.png");
  applyData.set('id_card_image', id_card_image)
  })
  await fetch(formData['2'].selfie_id_card_image)
  .then(res => res.blob())
  .then(blob => {
  const selfie_id_card_image = new File([blob], "selfie_id_card_image.png");
  applyData.set('selfie_id_card_image', selfie_id_card_image)})
  applyData.set('is_final', true);
  applyData.set('current_step', Object.keys(formData).length.toString());
  applyData.set('reference_type', "GRADE"),
  applyData.set('reference_id', "SP_VIP")
  try {
    await FormService.submitApplication(applyData);
    dispatch(setFormData({isSuccessApply: true}))
  } catch(error) {
    dispatch(setFormData({applyErrorMessage: error.error}))
  }
}