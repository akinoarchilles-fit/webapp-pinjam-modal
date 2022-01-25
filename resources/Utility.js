import Moment from 'moment';
class Utility {
  static thousandSeparator (x=0) {
    var parts = x.toString().split(',');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',');
  }

  static idrFormat (x) {
    return `Rp ${Utility.thousandSeparator(x)}`;
  }

  static dateFormat (date) {
    return Moment(date).format('DD MMMM YYYY');
  }
}

export default Utility;
