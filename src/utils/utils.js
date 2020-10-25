import dayjs from 'dayjs';
import md5 from 'md5';

const utils = {

  smiteUtils: {
    currentTimeStamp: dayjs().format('YYYYMMDDHHmmss'),
    baseUrl: 'http://api.smitegame.com/smiteapi.svc',
    createSignature: (method) => {
      const currentTimeStamp = dayjs().format('YYYYMMDDHHmmss');
      return md5(process.env.SMITE_DEVID + method + process.env.SMITE_AUTHKEY + currentTimeStamp);
    },
  },

};

export default utils;
