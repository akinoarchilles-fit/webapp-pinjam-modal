const BankingForm = {
  bankingNameForm: {
    key: 'bankAccountName',
    value: '',
    label: 'Nama Rekening',
    placeHolder: 'Masukan nama rekening',
    error: false,
    errorMessage: '*Nama rekening tidak valid atau belum diisi',
    regexPattern: /^[A-Za-z., ]+$/,
    keyboardType: 'default',
    inputType: 'text',
  },
  bankingNumberForm: {
    key: 'bankAccountNumber',
    value: '',
    label: 'Nomor Rekening',
    placeHolder: 'Masukan nomor rekening',
    error: false,
    errorMessage: '*Nomor rekening tidak valid atau belum diisi',
    regexPattern: /^[0-9]+$/,
    keyboardType: 'phone-pad',
    inputType: 'phone-pad',
  },
  bankList: [
    'Bank Central Asia',
    'Bank Mandiri',
    'Bank Negara Indonesia',
    'Bank Rakyat Indonesia'
  ]
};

export default BankingForm;
