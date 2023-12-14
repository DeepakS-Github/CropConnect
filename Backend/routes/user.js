const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyOTP = require("../middlewares/verifyOTP");


// // Creating a note
// router.post("/create", async (req, res) => {
//     try {
//         let data = new NoteSchema(req.body);
//         let savedNote = await data.save({ writeConcern: { w: 'majority' } });
//         console.log('Note saved:', savedNote);
//         res.status(200).json(savedNote); 
//     } catch (error) {
//         console.error('Error saving note:', error);
//         res.status(500).json({ error: 'Error saving note' });
//     }
// });


// // Listing all notes
// router.get("/list", async (req, res) => {
//     try {
//         let data = await NoteSchema.find();
//         res.status(200).json(data); 
//     } catch (error) {
//         console.error('Error fetching notes:', error);
//         res.status(500).json({ error: 'Error fetching notes' }); 
//     }
// }); 

// // Listing all pinned notes
// router.get("/pinned", async (req, res) => {
//     try {
//         let data = await NoteSchema.find({ pinned: true });
//         res.status(200).json(data); 
//     } catch (error) {
//         console.error('Error fetching notes:', error);
//         res.status(500).json({ error: 'Error fetching pinned notes' }); 
//     }
// }); 

// // Listing all not pinned notes
// router.get("/notpinned", async (req, res) => {
//     try {
//         let data = await NoteSchema.find({ pinned: false });
//         res.status(200).json(data); 
//     } catch (error) {
//         console.error('Error fetching notes:', error);
//         res.status(500).json({ error: 'Error fetching not pinned notes' }); 
//     }
// }); 


// // Delete a note by its ID
// router.delete("/remove/:id", async (req, res) => {
//     try {
//         const noteId = req.params.id;
//         const deletedNote = await NoteSchema.findByIdAndDelete(noteId);

//         if (deletedNote) {
//             console.log('Note deleted:', deletedNote);
//             res.status(200).json({ message: 'Note deleted successfully' });
//         } else {
//             res.status(404).json({ message: 'Note not found' });
//         }
//     } catch (error) {
//         console.error('Error deleting note:', error);
//         res.status(500).json({ error: 'Error deleting note' });
//     }
// });

// // Update a note by its ID
// router.put("/update/:id", async (req, res) => {
//     try {
//         const noteId = req.params.id;
//         const updatedNote = await NoteSchema.findByIdAndUpdate(noteId, req.body, { new: true });

//         if (updatedNote) {
//             console.log('Note updated:', updatedNote);
//             res.status(200).json(updatedNote);
//         } else {
//             res.status(404).json({ message: 'Note not found' });
//         }
//     } catch (error) {
//         console.error('Error updating note:', error);
//         res.status(500).json({ error: 'Error updating note' });
//     }
// });



// SignUp
router.post("/signup", verifyOTP, userController.signup);


// Login
router.post("/login", userController.login);


// Delete User Account
router.delete("/deleteUser/:userId", userController.deleteUserAccount);


module.exports = router;