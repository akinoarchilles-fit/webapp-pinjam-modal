import RNDeviceInfo from 'react-native-device-info';
import Moment from 'moment';
class Utility {
  static thousandSeparator (x) {
    var parts = x.toString().split(',');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',');
  }

  static idrFormat (x) {
    return `Rp ${Utility.thousandSeparator(x)}`;
  }

  static dateFormat (date) {
    return Moment(date).format('DD MMMM YYYY');
  }

  static getProductDetail (productId) {
    switch (productId) {
    case 5:
    case 10:
    case 11:
      return {
        product_alias: 'BFI',
        tags: 'spesific-bfi',
      };
    case 7:
      return {
        product_alias: 'Adaro',
        tags: 'spesific-adaro',
      };
    case 13:
      return {
        product_alias: 'Modal Usaha',
        tags: 'general-umkm',
      };
    case 2:
    case 19:
    case 20:
      return {
        product_alias: 'True Money',
        tags: 'true-money-loan',
      };
    case 21:
      return {
        product_alias: 'Partner Shopee',
        tags: 'partner-shopee',
      };
    case 22:
      return {
        product_alias: 'Partner Love',
        tags: 'partner-love',
      };
    default:
      return null;
    }
  }

  static async getDeviceInfo () {
    try {
      const location = JSON.stringify(await Utility.getCurrentLocationUser());
      const free_disk_storage = await RNDeviceInfo.getFreeDiskStorage();
      const device_id = RNDeviceInfo.getDeviceId();
      const unique_id = RNDeviceInfo.getUniqueId();
      const bundle_id = RNDeviceInfo.getBundleId();
      const system_name = RNDeviceInfo.getSystemName();
      const system_version = RNDeviceInfo.getSystemVersion();
      const total_memory = await RNDeviceInfo.getTotalMemory();
      const is_emulator = await RNDeviceInfo.isEmulator();
      const build_number = RNDeviceInfo.getBuildNumber();
      const version_app = RNDeviceInfo.getVersion();
      const device_token = await Firebase.Notification.getToken();
      return {
        free_disk_storage,
        device_id,
        unique_id,
        bundle_id,
        system_name,
        system_version,
        total_memory,
        is_emulator,
        build_number,
        version_app,
        device_token,
        location,
      };
    } catch (error) {
      console.log('getDeviceInfo Error:', error);
    }
  }

  static getCurrentLocationUser () {
    return new Promise((resolve) => {
      
    });
  }
}

export default Utility;
