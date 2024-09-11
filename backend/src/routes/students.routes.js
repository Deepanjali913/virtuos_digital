import { Router } from "express";
import { addStudents, displayStudents } from "../controllers/students.controllers.js";

const router = Router();

router.route('/postStudents').post(addStudents);
router.route('/getStudents').get(displayStudents);

export default router ;