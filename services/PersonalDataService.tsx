import AxiosInstance from "./AxiosInstance";

class PersonalDataService {
  static getProvince() {
    return new Promise(async (resolve, reject) => {
      try {
        const apiUrl = 'https://ibnux.github.io/data-indonesia/provinsi.json';
        const response = await AxiosInstance.get(apiUrl);
        resolve(response.data);
      } catch (error) {
        console.log('integrateInstagram: ', error);
        reject(error);
      }
    });
  }
}

export default PersonalDataService;