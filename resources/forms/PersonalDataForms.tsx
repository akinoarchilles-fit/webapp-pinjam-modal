const PersonalDataForm = {
  fullNameForm: {
    key: 'storeName',
    value: '',
    label: 'Nama',
    placeHolder: 'Masukan nama toko',
    error: false,
    errorMessage: '*Nama harus diisi',
    regexPattern: /.*/,
    keyboardType: 'default',
    inputType: 'text',
  },
  phoneNumberForm: {
    key: 'phoneNumber',
    value: '',
    label: 'No. HP',
    title: 'contoh: 628123xxxxxxxx',
    placeHolder: 'Masukan nomor ponsel',
    error: false,
    errorMessage: 'Pastikan nomor ponsel benar',
    regexPattern: /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/,
    keyboardType: 'phone-pad',
    inputType: 'phone-pad',
  },
};

export default OnlineStoreForm;
