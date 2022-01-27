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
    regexPattern: /^[A-Za-z., ]+$/,
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
    'Protestan',
    'Katolik',
    'Hindu',
    'Islam',
    'Konghucu',
    'Lain-lain'
  ],
  educationLevelList: [
    'Sekolah Dasar',
    'Sekolah Menengah Pertama',
    'Sekolah Menegah Atas',
    'Diploma/S1',
    'S2',
    'S3'
  ],
  maritalStatusList: [
    'Kawin',
    'Tidak Kawin',
    'Cerai Meninggal',
    'Cerai Hidup'
  ],
  referenceRelationList: [
    'Kakak/Adik Perempuan',
    'Ibu',
    'Kakak/Adik Laki-laki',
    'Ayah',
    'Keponakan',
    'Ibu Mertua',
    'Ayah Mertua',
    'Suami/Istri',
    'Teman'
  ]
};


export default PersonalDataForm;
