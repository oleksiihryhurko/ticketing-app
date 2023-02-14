import { Request, Response, Router } from "express";

import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/requier-auth";

const router = Router();

router.get('/api/users/currentuser',
    currentUser,
    requireAuth,
    (req: Request, res: Response) => {
        res.send({ currentUser: req.currentUser ?? null });
    });

export { router as currentUserRouter };
