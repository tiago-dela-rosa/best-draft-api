import Joi from '@hapi/joi';

const validations = {
  user: {
    login: {
      body: {
        email: Joi.string()
          .email()
          .required()
          .error(new Error(JSON.stringify({ code: '001', type: 'email', message: 'E-mail must be valid' }))),
        password: Joi.string()
          .min(6)
          .max(20)
          .required()
          .error(new Error(JSON.stringify({ code: '001', type: 'password', message: 'Password must contain characters' }))),
      },
    },
    create: {
      body: {
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required(),
      },
    },
  },
  config: {
    create: {
      body: {
        name: Joi.string().min(3).max(30).required(),
        active_status: Joi.number().min(0).max(1).required(),
        public_status: Joi.number().min(0).max(3).required(),
        user_uid: Joi.string().guid().required(),
      },
    },
  },
  tierlist: {
    create: {
      body: {
        name: Joi.string().min(3).max(30).required(),
        data: Joi.array().required(),
        config: Joi.string().guid(),
      },
    },
  },
  matchup: {
    create: {
      body: {
        name: Joi.string().min(3).max(30).required(),
        data: Joi.array().required(),
        config: Joi.string().guid(),
      },
    },
  },
  teammate: {
    create: {
      body: {
        name: Joi.string().min(3).max(30).required(),
        data: Joi.array().required(),
        config: Joi.string().guid(),
      },
    },
  },
  userPreferences: {
    create: {
      body: {
        data: Joi.array().required(),
        config: Joi.string().guid(),
      },
    },
  },
};

export const {
  user, config, tierlist, matchup, teammate, userPreferences,
} = validations;
