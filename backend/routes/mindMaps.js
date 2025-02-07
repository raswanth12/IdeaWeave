const express = require('express');
const router = express.Router();
const MindMap = require('../models/MindMap');

// GET all mind maps
router.get('/', async (req, res) => {
  try {
    const mindMaps = await MindMap.find();
    res.json(mindMaps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single mind map by ID
router.get('/:id', getMindMap, (req, res) => {
  res.json(res.mindMap);
});

// CREATE a new mind map
router.post('/', async (req, res) => {
  const mindMap = new MindMap({
    title: req.body.title,
    nodes: req.body.nodes
  });
  try {
    const newMindMap = await mindMap.save();
    res.status(201).json(newMindMap);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an existing mind map
router.put('/:id', getMindMap, async (req, res) => {
  if (req.body.title != null) {
    res.mindMap.title = req.body.title;
  }
  if (req.body.nodes != null) {
    res.mindMap.nodes = req.body.nodes;
  }
  try {
    const updatedMindMap = await res.mindMap.save();
    res.json(updatedMindMap);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a mind map
router.delete('/:id', getMindMap, async (req, res) => {
  try {
    await res.mindMap.remove();
    res.json({ message: 'Deleted MindMap' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to retrieve a mind map by ID
async function getMindMap(req, res, next) {
  let mindMap;
  try {
    mindMap = await MindMap.findById(req.params.id);
    if (mindMap == null) {
      return res.status(404).json({ message: 'Cannot find mind map' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.mindMap = mindMap;
  next();
}

module.exports = router;
