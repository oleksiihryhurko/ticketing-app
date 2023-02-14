import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import jwt from 'jsonwebtoken';
import { Password } from "../services/password";

const router = Router();

const validationSchema = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
];

router.post('/api/users/signin',
    validationSchema,
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }
        const passwordMatch = await Password.compare(
            existingUser.password,
            password
        );
        if (!passwordMatch) {
            throw new BadRequestError('Invalid credentials');
        }
        const jwtKey = process.env.JWT_KEY;
        const userJwt = jwt.sign({ id: existingUser.id, email: existingUser.email }, jwtKey!)
        req.session = { jwt: userJwt };

        res.status(200).send(existingUser);
    });

export { router as signinRouter };