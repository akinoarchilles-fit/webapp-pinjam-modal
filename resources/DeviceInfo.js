import RNDeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';

export default class DeviceInfo {
  static getVersion () {
    return RNDeviceInfo.getVersion();
  }

  static async getNetworkInfo () {
    const {type, details} = await NetInfo.fetch();
    const networkInfo = {
      networkType: type,
      cellularGeneration: 'unknown',
      ipAddress: details.ipAddress,
    };
    if (details && details.cellularGeneration)
      networkInfo.cellularGeneration = details.cellularGeneration;
    return networkInfo;
  }
}
