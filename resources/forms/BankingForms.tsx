const BankingForm = {
  bankingNameForm: {
    key: 'bankAccountName',
    value: '',
    label: 'Nama Rekening',
    placeHolder: 'Masukan nama rekening',
    error: false,
    errorMessage: '*Nama harus diisi',
    regexPattern: /.*/,
    keyboardType: 'default',
    inputType: 'text',
  },
  bankingNumberForm: {
    key: 'bankAccountNumber',
    value: '',
    label: 'Nomor Rekening',
    placeHolder: 'Masukan nomor rekening',
    error: false,
    errorMessage: 'Pastikan nomor rekening benar',
    keyboardType: 'phone-pad',
    inputType: 'phone-pad',
  },
};

export default BankingForm;
