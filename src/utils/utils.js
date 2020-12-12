import dayjs from 'dayjs';
import md5 from 'md5';

const utils = {

  smiteUtils: {
    getDate: () => new Date().toISOString().replace(/\..+/, '').split('')
      // eslint-disable-next-line no-restricted-globals
      .reduce((acc, val) => (isNaN(val) ? acc : `${acc}${val}`)),
    currentTimeStamp: dayjs().add(3, 'hour').format('YYYYMMDDHHmmss'),
    baseUrl: 'http://api.smitegame.com/smiteapi.svc',
    createSignature: (method) => {
      const currentTimeStamp = utils.smiteUtils.getDate();
      return md5(`${process.env.SMITE_DEVID}${method}${process.env.SMITE_AUTHKEY}${currentTimeStamp}`);
    },
  },

};

export default utils;
