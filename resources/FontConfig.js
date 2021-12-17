const fonts = {
  regular: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
  },
  light: {
    fontFamily: 'Poppins-Thin',
    fontWeight: '300',
  },
  thin: {
    fontFamily: 'Poppins-Thin',
    fontWeight: '300',
  },
};

const FontConfig = {
  web: fonts,
  ios: fonts,
  android: fonts,
  default: fonts,
};

const FontWeightConfig = {
  bold: 'bold',
  semiBold: '600',
  medium: '500',
  regular: 'normal',
  light: '300',
};

export {FontConfig, FontWeightConfig};
