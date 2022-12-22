const express = require("express");
const router = express.Router({mergeParams: true});
const {
    getNotes,
    addNote
  } = require("../controlers/noteControler");

const { protect } = require("../middleware/authMiddleware");

// root is set in ticket routes as /tickets/:ticketId/notes
router.route("/").get(protect, getNotes).post(protect, addNote)

module.exports = router