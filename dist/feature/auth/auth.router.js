import { Router } from "express";
import { authGoogle, authGoogleCallback, authMe } from './auth.controller.js';
const router = Router();
router.get("/google", authGoogle);
router.get("/google/callback", authGoogleCallback);
router.get("/me", authMe);
export default router;
//# sourceMappingURL=auth.router.js.map