import { createSelector } from "reselect";

const selectForm = (state) => state.form;

export const selectFormStep = createSelector(
  [selectForm],
  (state) => state.currentStep
)

export const selectFormData = createSelector(
  [selectForm],
  (state) => state.form
)

export const selectLoadingForm = createSelector(
  [selectForm],
  (state) => {
    return state.loadingForm
  }
)

export const selectGender = createSelector(
  [selectForm],
  (state) => state.genderSelection
)

export const selectReligion = createSelector(
  [selectForm],
  (state) => state.religionSelection
)

export const selectBank = createSelector(
  [selectForm],
  (state) => state.bankSelection
)

export const selectEducation = createSelector(
  [selectForm],
  (state) => state.educationSelection
)

export const selectMaritalStatus = createSelector(
  [selectForm],
  (state) => state.maritalStatusSelection
)

export const selectWorkingLength = createSelector(
  [selectForm],
  (state) => state.workingLengthSelection
)

export const selectIndustryType = createSelector(
  [selectForm],
  (state) => state.industryTypeSelection
)

export const selectReferenceRelation = createSelector(
  [selectForm],
  (state) => state.referenceRelationTypeSelection
)