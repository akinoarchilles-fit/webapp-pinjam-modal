/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  TermsCondition: undefined;
  Landing: undefined;
  Register: undefined;
  LoanCalculation: undefined;
  DocumentUpload: undefined;
  PersonalData: undefined;
  OnlineStoreData: undefined;
  BankingData: undefined;
  AdditionalData: undefined;
  OTPVerification: undefined;
  Success: undefined;
  OptionForm: {alias: string, selected:number, data:Array<any>, onPressHandler: Function} | undefined;
  DateForm: {alias: string, selected:number, data:Array<any>, onPressHandler: Function};
  UploadGuideOverlay: {type: string, onBackHandler: Function};
  ImagePreviewOverlay: {imageUrl: string};
  DeviceInfoOverlay: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;