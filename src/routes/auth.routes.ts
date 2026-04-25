import { Router } from 'express';
import * as authCtrl from '../controller/auth.controller';

const router = Router();

/**
 * @openapi
 * /auth/login:
 *  post:
 *    summary: User Login
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: User Looged in
 *      401:
 *        description: Invalid credentials
 */
router.post('/login', authCtrl.login );

export default router;