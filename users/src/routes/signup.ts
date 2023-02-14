import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";
import jwt from 'jsonwebtoken';
import { validateRequest } from "../middlewares/validate-request";

const router = Router();

const validationSchema = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isStrongPassword()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 chars')
];

router.post('/api/users/signup',
    validationSchema,
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({
            email, password
        });
        await user.save();
        const jwtKey = process.env.JWT_KEY;
        const userJwt = jwt.sign({ id: user.id, email: user.email }, jwtKey!)
        req.session = { jwt: userJwt };

        res.status(201).send(user);
    });

export { router as signupRouter };