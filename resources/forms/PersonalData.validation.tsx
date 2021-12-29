const PersonalDataForm = {
  idCardNoForm: {
    key: 'idNumber',
    value: '',
    label: 'Nomor KTP',
    placeHolder: 'Masukan NIK',
    error: false,
    errorMessage: '*Pastikan Nomor KTP sesuai',
    regexPattern: /^\d{16}$/,
    keyboardType: 'default',
    inputType: 'text',
  },
  textOnlyForm: {
    key: 'textOnly',
    value: '',
    label: 'Tempat Lahir',
    placeHolder: 'Tempat lahir',
    error: false,
    errorMessage: '*Tempat lahir harus diisi',
    regexPattern: /^[A-Za-z.,]+$/,
    keyboardType: 'default',
    inputType: 'text',
  },
  numberOnlyForm: {
    key: 'numberOnly',
    value: '',
    label: 'Telp. Rumah',
    placeHolder: 'Telp. Rumah',
    error: false,
    errorMessage: '*Telp. Rumah tidak valid',
    regexPattern: /^[0-9]+$/,
    keyboardType: 'phone-pad',
    inputType: 'phone-pad',
  },
  religionList: [
    'Buddha',
    'Kristen',
    'Katolik',
    'Hindu',
    'Islam',
    'Konghucu'
  ],
  educationLevelList: [
    'Sekolah Menengah Pertama',
    'Sekolah Menegah Atas',
    'Diploma',
    'S1',
    'S2',
    'S3'
  ],
  maritalStatusList: [
    'Lajang',
    'Menikah',
    'Cerai'
  ],
};


export default PersonalDataForm;
