const Strings = {
  headerLogin: 'Masuk',
  headerRegister: 'Daftarkan Akun Sekarang',
  headerForgotPassword: 'Reset Kata Sandi',
  forgetPassword: 'Lupa Kata Sandi?',
  labelLogin: 'Kamu belum memiliki akun masuk?',
  labelRegister: 'Kamu sudah memiliki akun?',
  labelBtnLogin: 'Yuk Daftar Disini!',
  labelBtnRegister: 'Yuk Masuk Disini!',
  infoOpenEmail: 'Periksa Email Kamu!',
  openEmailRegister:
    'Silahkan periksa kotak masuk atau spam kamu, lalu klik tautan untuk verifikasi akun',
  openEmailResetPassword:
    'Silahkan periksa kotak masuk atau spam kamu, lalu klik tautan untuk ganti kata sandi',
  openEmail: 'Buka Email',
  infoPassword:
    'Kata sandi minimal 10 karakter terdiri dari huruf kecil dan besar, angka, dan spesial karakter.',
  footer: [
    {
      text: 'Dengan masuk dan daftar, saya menyetujui',
    },
    {
      text: ' persyaratan layanan ',
      link: 'https://www.pinjammodal.id/terms-and-conditions',
      title: 'Persyaratan Layanan',
    },
    {
      text: 'dan',
    },
    {
      text: ' kebijakan privasi ',
      link: 'https://www.pinjammodal.id/policy',
      title: 'Kebijakan Privasi',
    },
    {
      text: 'Pinjam Modal',
    },
  ],
  emailForm: {
    key: 'email',
    value: '',
    label: 'Email',
    title: 'contoh: user@pinjammodal.id',
    placeHolder: 'Masukan email kamu',
    error: false,
    errorMessage: '*Pastikan email kamu aktif',
    regexPattern:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    keyboardType: 'email-address',
    inputType: 'text',
  },
  passwordForm: {
    key: 'password',
    value: '',
    label: 'Kata Sandi',
    title: 'contoh: password123#',
    placeHolder: 'Masukan kata sandi',
    error: false,
    errorMessage: '*Kata sandi harus benar',
    keyboardType: 'default',
    inputType: 'text',
    secureTextEntry: true,
  },
  fullNameForm: {
    key: 'fullName',
    value: '',
    label: 'Nama',
    title: 'contoh: User Pinjam Modal',
    placeHolder: 'Masukan nama kamu',
    error: false,
    errorMessage: '*Nama harus diisi',
    regexPattern: /.*/,
    keyboardType: 'default',
    inputType: 'text',
  },
  confirmPasswordForm: {
    key: 'confirmPassword',
    value: '',
    label: 'Konfirmasi Kata Sandi',
    title: 'contoh: password123#',
    placeHolder: 'Masukan konfirmasi kata sandi',
    error: false,
    errorMessage: '*Konfirmasi kata sandi harus sama dengan kata sandi',
    keyboardType: 'default',
    inputType: 'text',
    secureTextEntry: true,
  },
};

export default Strings;
