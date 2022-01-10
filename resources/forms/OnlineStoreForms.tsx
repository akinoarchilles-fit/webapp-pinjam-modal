const OnlineStoreForm = {
  fullNameForm: {
    key: 'storeName',
    value: '',
    label: 'Nama',
    placeHolder: '',
    error: false,
    errorMessage: '*Akun Instagram tidak valid atau belum diisi',
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
    regexPattern: /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
    keyboardType: 'phone-pad',
    inputType: 'phone-pad',
  },
};

export default OnlineStoreForm;
