import express from "express";
import { getSections, createSection, updateSection, deleteSection, reorderSections } from "../controllers/sectionController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getSections).post(protect, createSection);
router.route("/reorder").put(protect, reorderSections);
router.route("/:id").put(protect, updateSection).delete(protect, deleteSection);

export default router;
