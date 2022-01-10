import { createSelector } from "reselect";

const selectForm = (state) => state.form;

export const selectProvinceList = createSelector(
  [selectForm],
  (state) => state.provinceList
)

export const selectCityList = createSelector(
  [selectForm],
  (state) => state.cityList
)

export const selectDistrictList = createSelector(
  [selectForm],
  (state) => state.districtList
)

export const selectSubdistrictList = createSelector(
  [selectForm],
  (state) => state.subdistrictList
)

export const selectPostalCodeList = createSelector(
  [selectForm],
  (state) => state.postalCodeList
)