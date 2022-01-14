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

  static getOTP(body: Object) {
    return new Promise(async (resolve, reject) => {
      try {
        let apiUrl = 'https://api-development.pinjammodal.id:8443/supplier/otp/resend'
        const response = await AxiosInstance.post(apiUrl, body);
        resolve(response.data);
      } catch (error) {
        console.log('getOTP: ', error);
        reject(error);
      }
    });
  }

  static confirmOTP(body: Object) {
    return new Promise(async (resolve, reject) => {
      try {
        let apiUrl = 'https://api-development.pinjammodal.id:8443/supplier/otp/confirmation'
        const response = await AxiosInstance.post(apiUrl, body);
        resolve(response.data);
      } catch (error) {
        console.log('confirmOTP: ', error);
        reject(error.response.data);
      }
    });
  }

  static submitApplication(body: FormData) {
    return new Promise(async (resolve, reject) => {
      try {
        let apiUrl = 'https://api-development.pinjammodal.id:8443/supplier/loan/apply';
        const response = await AxiosInstance.post(apiUrl, body, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer 559e2d46fe5503bbbf633273a1222'
          }
        })
        resolve(response.data);
      } catch (error) {
        console.log('submitApplication: ', error);
        reject(error.response.data);
      }
    });
  }
}

export default FormService;