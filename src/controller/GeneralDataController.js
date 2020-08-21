import gods from '../domain/models/generalData/gods';

export default class GeneralDataController {
  getGods(req, res) {
    return res.status(200).send(gods);
  }
}
