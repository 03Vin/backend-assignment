const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect } = require('../middleware/auth');
const Joi = require('joi');

const noteSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
});

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes for the logged in user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 */
router.get('/', protect, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created
 */
router.post('/', protect, async (req, res) => {
    const { error } = noteSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const note = new Note({
            user: req.user._id,
            title: req.body.title,
            content: req.body.content
        });

        const createdNote = await note.save();
        res.status(201).json(createdNote);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated
 */
router.put('/:id', protect, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (note) {
            if (note.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            note.title = req.body.title || note.title;
            note.content = req.body.content || note.content;

            const updatedNote = await note.save();
            res.json(updatedNote);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note removed
 */
router.delete('/:id', protect, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (note) {
            if (note.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await note.deleteOne();
            res.json({ message: 'Note removed' });
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
