import AxiosInstance from "./AxiosInstance";

class FormService {
  static getMaster() {
    return new Promise(async (resolve, reject) => {
      try {
        const apiUrl = 'https://api-development.pinjammodal.id:8443/supplier/form/master';
        const response = await AxiosInstance.get(apiUrl);
        resolve(response.data);
      } catch (error) {
        console.log('getMasterFormData: ', error);
        reject(error);
      }
    });
  }

  static getProvince () {
    return new Promise(async (resolve, reject) => {
      try {
        const apiUrl = 'https://api-development.pinjammodal.id:8443/supplier/region';
        const response = await AxiosInstance.post(apiUrl);
        resolve(response.data);
      } catch (error) {
        console.log('getProvince: ', error);
        reject(error);
      }
    });
  }

  static getLocationList(apiUrl: string, body: Object):any {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await AxiosInstance.post(apiUrl, body);
        resolve(response.data);
      } catch (error) {
        console.log('getLocationList: ', error);
        reject(error);
      }
    });
  }

  static getOTP() {
    return new Promise(async (resolve, reject) => {
      try {
        let apiUrl = ''
        const response = await AxiosInstance.get(apiUrl);
        resolve(response.data);
      } catch (error) {
        console.log('getOTP: ', error);
        reject(error);
      }
    });
  }
}

export default FormService;