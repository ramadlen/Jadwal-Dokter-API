import jadwalService from "../service/jadwal-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const dokterId = req.params.dokterId;

    const result = await jadwalService.create(user, dokterId, request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user;
    const dokterId = req.params.dokterId;
    const jadwalId = req.params.jadwalId;

    const result = await jadwalService.get(user, dokterId, jadwalId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const dokterId = req.params.dokterId;
    const jadwalId = req.params.jadwalId;
    const request = req.body;
    request.id = jadwalId;

    const result = await jadwalService.update(user, dokterId, request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const dokterId = req.params.dokterId;
    const jadwalId = req.params.jadwalId;

    const result = await jadwalService.remove(user, dokterId, jadwalId);

    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

const list = async (req, res, next) => {
  try {
    const user = req.user;
    const dokterId = req.params.dokterId;

    const result = await jadwalService.list(user, dokterId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  update,
  remove,
  list,
};
