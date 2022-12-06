import Joi from 'joi';

const create = Joi.object({
    title: Joi.string().required(),

    body: Joi.string().required(),
});

// Contains all validation needed to perform actions on Post results.
export default { create };
