import _ from 'lodash';
const ROOT_URL = 'http://wappu.futurice.com';

const Terms = [
  {title:'Terms of Service', link: `${ROOT_URL}/terms`, icon: 'info-outline'},
  {title:'Privacy', link: `${ROOT_URL}/privacy`, icon: 'help-outline'},
  {title:'Come to work at Futurice', link: 'http://futurice.com/careers', icon: 'send'},
];

export default {
  terms: Terms,
};
