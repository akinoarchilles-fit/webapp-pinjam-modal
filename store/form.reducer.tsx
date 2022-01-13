import { STORE_TYPES } from "./types"

const initState = {
  form: [

  ],
  isSuccessApply: false,
  applyErrorMessage: null,
  isOTPVerified: false,
  currentStep: 0,
  loadingForm: false,
  genderSelection: [],
  religionSelection: [],
  bankSelection: [],
  productSelection: [],
  educationSelection: [],
  maritalStatusSelection: [],
  workingLengthSelection: [],
  industryTypeSelection: [],
  referenceRelationTypeSelection: [],
  provinceList: [],
  cityList: [],
  districtList: [],
  subdistrictList: [],
  postalCodeList: []
}

export const formReducers = (state = initState, action) => {
  switch(action.type) {
    case STORE_TYPES.SET_FORM:
      console.log(action.payload)
      console.log(state)
      return { ...state, ...action.payload };
    case STORE_TYPES.RESET_FORM:
      return initState;
    default:
      return state;
  }
}