import Joi from "joi";

const createDokterValidation = Joi.object({
  dokter_name: Joi.string().max(100).required(),
  email: Joi.string().max(200).email().optional(),
  phone: Joi.string().max(20).optional(),
});

const getDokterValidation = Joi.number().positive().required();

const updateDokterValidation = Joi.object({
  id: Joi.number().positive().required(),
  dokter_name: Joi.string().max(100).required(),
  email: Joi.string().max(200).email().optional(),
  phone: Joi.string().max(20).optional(),
});

const searchDokterValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
});

export {
  createDokterValidation,
  getDokterValidation,
  updateDokterValidation,
  searchDokterValidation,
};
