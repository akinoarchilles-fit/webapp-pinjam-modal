import {Dimensions, Platform, StatusBar} from 'react-native';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  configureFonts,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import { FontConfig } from './FontConfig';
let headerHeight = Platform.OS === 'ios' ? 66 : 46;
let footerHeight = 55;

const {width: viewportWidth} = Dimensions.get('window');

const wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};
const sliderWidth = wp(85);
const itemHorizontalMargin = wp(2);
const itemWidth = sliderWidth + itemHorizontalMargin * 2;

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  roundness: 5,
  fonts: configureFonts(FontConfig),
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#2D98DA',
    accent: '#CFCFCF',
    text: '#000000',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    altSurface: '#F7F7F7',
    description: '#A2A9B4',
    success: '#4DAA63',
    error: '#DB6D6D',
    shimmerBackground: '#EEEEEE',
    shimmerContent: '#CFCFCF',
    border: '#F2F2F2',
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  roundness: 5,
  fonts: configureFonts(FontConfig),
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#2D98DA',
    accent: '#CFCFCF',
    text: '#FFFFFF',
    background: '#000000',
    surface: '#121212',
    altSurface: '#242424',
    description: '#A2A9B4',
    success: '#4DAA63',
    error: '#DB6D6D',
    shimmerBackground: '#121212',
    shimmerContent: '#242424',
    border: '#242424',
  },
};

const Constants = {
  headerHeight: headerHeight,
  footerHeight: footerHeight,
  viewHeight: Dimensions.get('window').height - headerHeight,
  screenHeight: Dimensions.get('window').height,
  screenWidth: Dimensions.get('window').width,
  statusBarHeight: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  carouselSliderWidth: Dimensions.get('window').width,
  carouselItemWidth: itemWidth,
  PMDefaultTheme: CombinedDefaultTheme,
  PMDarkTheme: CombinedDarkTheme,
};

export default Constants;
