import Joi from 'joi';

export const marketDataSchema = Joi.object({
  symbols: Joi.string()
    .required()
    .messages({
      'any.required': 'symbols is required',
      'string.empty': 'symbols cannot be empty',
    }),
});

export const alertSchema = Joi.object({
  symbol: Joi.string().required(),
  condition: Joi.string().valid('above', 'below', 'crosses').required(),
  targetPrice: Joi.number().positive().required(),
});
