import express from 'express'
import { LoginUserUseCase } from "../../application/use-cases/auth/loginUserUseCase";
import { SignupUserUseCase } from "../../application/use-cases/auth/signupUserUseCase";
import { UserRespository } from "../../infrastructure/database/repositories/userRepository";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router()

const userRepository = new UserRespository()
const signupUserUseCase = new SignupUserUseCase(userRepository)
const loginUserUseCase = new LoginUserUseCase(userRepository)

const authController = new AuthController(signupUserUseCase, loginUserUseCase,userRepository)

router.post('/signup', (req, res, next) => authController.signup(req, res, next))
router.post('/login', (req, res, next) => authController.login(req, res, next))
router.post('/refresh',(req,res,next)=>authController.refresh(req,res,next))
router.post('/logout',authMiddleware,(req,res,next)=>authController.logout(req,res,next))

export default router;