import Joi from "joi";

const createJadwalValidation = Joi.object({
  date: Joi.date().required,
  date_range: Joi.date().optional(),
  time_start: Joi.date().required(),
  time_finish: Joi.date().required(),
  quota: Joi.number().max(100).required(),
  status: Joi.boolean().required(),
});

const updateJadwalValidation = Joi.object({
  id: Joi.number().min(1).positive().required(),
  date: Joi.date().required,
  date_range: Joi.date().optional(),
  time_start: Joi.date().required(),
  time_finish: Joi.date().required(),
  quota: Joi.number().max(100).required(),
  status: Joi.boolean().required(),
});

const getJadwalValidation = Joi.number().min(1).positive().required();

export { createJadwalValidation, getJadwalValidation, updateJadwalValidation };
