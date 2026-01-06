import express from "express";
import saveContactController from "../controllers/contact/saveContact.js";
import getAllContactsController from "../controllers/contact/getAllContacts.js";
import getContactsController from "../controllers/contact/getContact.js";
import updateContactController from "../controllers/contact/updateContact.js";
import AdminAuth from "../middleware/adminAuth.js";
import deleteContactController from "../controllers/contact/deleteContact.js";
const router = express.Router();

router.post("/", saveContactController);
router.get("/", AdminAuth, getAllContactsController);
router.get("/:id", AdminAuth, getContactsController);
router.patch("/:id", AdminAuth, updateContactController);
router.delete("/:id", AdminAuth, deleteContactController);

export default router;
