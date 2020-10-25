import utils from '../utils/utils'
import logger from '../utils/logger';
import axios from 'axios'

class SmiteController {
  createSession(req, res) {
    logger.info('SmiteController.createSession');
    const { baseUrl, createSignature, currentTimeStamp } = utils.smiteUtils
    const url = `${baseUrl}/createsession/${process.env.SMITE_DEVID}/${createSignature('createsession')}/${currentTimeStamp}`
    // axios.get(url).then((data) => {
    //   console.log(data)
    // })
    return res.send({ ok:  url });
  }
}

export default SmiteController;
