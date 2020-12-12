import axios from 'axios';
import utils from '../../../utils/utils';
import logger from '../../../utils/logger';
import dayjs from 'dayjs'

class SmiteApi {
  constructor(req) {
    this.smiteDevId = process.env.SMITE_DEVID
    this.session = req.headers['smite-api-session']
    this.player = req.query['player'];
    this.matchId = req.query['matchId']
  }

  async createSession() {
    logger.info('SmiteController.createSession');

    const { baseUrl, createSignature, getDate } = utils.smiteUtils;
    const signature = createSignature('createsession');
    const url = `${baseUrl}/createsessionJson/${this.smiteDevId}/${signature}/${getDate()}`;
    const { data } =  await axios.get(url)
   
    return {data, ...{sessionCreateTime: dayjs().format()}}
  }

  async testSession() {
    logger.info('SmiteController.testSession');

    const { baseUrl, createSignature, getDate } = utils.smiteUtils;
    const signature = createSignature('testsession'); 
    const url = `${baseUrl}/testsessionJson/${this.smiteDevId}/${signature}/${this.session}/${getDate()}`;
    const { data } = await axios.get(url)
    return { testSession: data }
  }

  async getPlayerByName(playerParam) {
    logger.info('SmiteController.getPlayerByName')
    const { baseUrl, createSignature, getDate } = utils.smiteUtils;
    const signature = createSignature('getplayeridbyname');
    const playerName = this.player ? this.player : playerParam
    const url = `${baseUrl}/getplayeridbynameJson/${this.smiteDevId}/${signature}/${this.session}/${getDate()}/${playerName}`;
    const { data } = await axios.get(url).catch((error) => { return { error: error }})
    return { player : data  }
  }

  async getPlayerStatus() {
    logger.info('SmiteController.getPlayerStaus')
    const { player } = await this.getPlayerByName().catch((error) => { return { error: error }})
    const { baseUrl, createSignature, getDate } = utils.smiteUtils;
    const signature = createSignature('getplayerstatus');
    const url = `${baseUrl}/getplayerstatusJson/${this.smiteDevId}/${signature}/${this.session}/${getDate()}/${player[0].player_id}`
    const { data } = await axios.get(url).catch((error) => { return { error: error }})
    return { playerStatus : data } 
  }

  async getMatchPlayerDetails () {
    logger.info('SmiteController.getMatchPlayerDetails')
    const { baseUrl, createSignature, getDate } = utils.smiteUtils;
    const signature = createSignature('getmatchplayerdetails');   
    const url = `${baseUrl}/getmatchplayerdetailsJson/${this.smiteDevId}/${signature}/${this.session}/${getDate()}/${this.matchId}`
    const { data } = await axios.get(url).catch((error) => { return { error: error }})
    return { matchDetails : data }   
  }

}

export default SmiteApi;
 