import AxiosInstance from "./AxiosInstance";

class PersonalDataService {
  static getProvince() {
    return new Promise(async (resolve, reject) => {
      try {
        const apiUrl = 'https://ibnux.github.io/data-indonesia/provinsi.json';
        const response = await AxiosInstance.get(apiUrl);
        resolve(response.data);
      } catch (error) {
        console.log('getProvince: ', error);
        reject(error);
      }
    });
  }

  static getKabupaten(provinceId: string) {
    return new Promise(async (resolve,reject) => {
      try {
        const apiUrl = `https://ibnux.github.io/data-indonesia/kabupaten/${provinceId}.json`;
        console.log(apiUrl)
        const response = await AxiosInstance.get(apiUrl);
        resolve(response.data);
      } catch (error) {
        console.log('getKabupaten: ', error);
        reject(error);
      }
    });
  }

  static getKecamatan(kabupatenId: string) {
    return new Promise(async (resolve,reject) => {
      try {
        const apiUrl = `https://ibnux.github.io/data-indonesia/kecamatan/${kabupatenId}.json`;
        console.log(apiUrl)
        const response = await AxiosInstance.get(apiUrl);
        resolve(response.data);
      } catch (error) {
        console.log('getKecamatan: ', error);
        reject(error);
      }
    });
  }

  static getKelurahan(kecamatanId: string) {
    return new Promise(async (resolve,reject) => {
      try {
        const apiUrl = `https://ibnux.github.io/data-indonesia/kelurahan/${kecamatanId}.json`;
        console.log(apiUrl)
        const response = await AxiosInstance.get(apiUrl);
        resolve(response.data);
      } catch (error) {
        console.log('getKelurahan: ', error);
        reject(error);
      }
    });
  }
}

export default PersonalDataService;