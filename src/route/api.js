import express from "express";
import userController from "../controller/user-controller.js";

import { authMiddleware } from "../middleware/auth-middleware.js";
import dokterController from "../controller/dokter-controller.js";
import jadwalController from "../controller/jadwal-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// Dokter API
userRouter.post("/api/dokter", dokterController.create);
userRouter.get("/api/dokter/:dokterId", dokterController.get);
userRouter.put("/api/dokter/:dokterId", dokterController.update);
userRouter.delete("/api/dokter/:dokterId", dokterController.remove);
userRouter.get("/api/dokter", dokterController.search);

// Jadwal API
userRouter.post("/api/dokter/:dokterId/jadwal", jadwalController.create);
userRouter.get("/api/dokter/:dokterId/jadwal/:jadwalId", jadwalController.get);
userRouter.put(
  "/api/dokter/:dokterId/jadwal/:jadwalId",
  jadwalController.update,
);
userRouter.delete(
  "/api/dokter/:dokterId/jadwal/:jadwalId",
  jadwalController.remove,
);
userRouter.get("/api/dokter/:dokterId/jadwal", jadwalController.list);

export { userRouter };
