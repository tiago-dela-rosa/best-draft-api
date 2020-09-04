import { Router } from 'express';
import { celebrate } from 'celebrate';
import UserController from '../controller/UserController';
import ConfigController from '../controller/ConfigController';
import TierlistController from '../controller/TierlistController';
import MatchupController from '../controller/MatchupController';
import TeammateController from '../controller/TeammateController';
import PreferencesController from '../controller/PreferencesController';
import GeneralDataController from '../controller/GeneralDataController';
import VerifyJWT from '../utils/jwtAuth';
import {
  user, config, tierlist, matchup, teammate, userPreferences,
} from '../utils/validations';

const routes = Router();

// Users & auth
routes.post('/user', celebrate(user.create), new UserController().create);
routes.post('/login', celebrate(user.login), new UserController().login);

// Gods
routes.get('/gods', new GeneralDataController().getGods);

// Configs
routes.post('/config', celebrate(config.create), VerifyJWT, new ConfigController().create);

// Tierlist
routes.get('/tierlist/default', new TierlistController().default);
routes.post('/tierlist', celebrate(tierlist.create), VerifyJWT, new TierlistController().create);
routes.get('/tierlist/:uid', VerifyJWT, new TierlistController().getOne);
routes.patch('/tierlist/:uid', celebrate(tierlist.create), VerifyJWT, new TierlistController().update);
routes.get('/tierlist/user/:uid', VerifyJWT, new TierlistController().getUserTierlist);
routes.get('/public/tierlist/', new TierlistController().getPublic);

// Matchups
routes.post('/matchup/', celebrate(matchup.create), VerifyJWT, new MatchupController().create);
routes.get('/matchup/:uid', VerifyJWT, new MatchupController().getOne);
routes.patch('/matchup/:uid', celebrate(matchup.create), VerifyJWT, new MatchupController().update);
routes.get('/matchup/user/:uid', VerifyJWT, new MatchupController().getAllByUser);
routes.get('/public/matchup/', new MatchupController().getPublic);

// Teammates
routes.post('/teammate/', celebrate(teammate.create), VerifyJWT, new TeammateController().create);
routes.get('/teammate/:uid', VerifyJWT, new TeammateController().getOne);
routes.get('/teammate/user/:uid', VerifyJWT, new TeammateController().getAllByUser);
routes.patch('/teammate/:uid', celebrate(teammate.create), VerifyJWT, new TeammateController().update);
routes.get('/public/teammate/', new TeammateController().getPublic);

// User preferences
routes.get('/preference/:uid', VerifyJWT, new PreferencesController().getOne);
routes.get('/preference/user/:uid', VerifyJWT, new PreferencesController().getByUser);
routes.post('/preference', celebrate(userPreferences.create), VerifyJWT, new PreferencesController().create);
routes.patch('/preference/:uid', celebrate(userPreferences.create), VerifyJWT, new PreferencesController().update);

export default routes;
