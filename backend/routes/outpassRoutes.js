const express = require('express');
const router = express.Router();
const pool = require('../config/db');
//for qrcode
const QRCode = require('qrcode');
const crypto = require('crypto');
const qrStore = new Map(); // In-memory QR store (can be improved with Redis or DB)

router.post('/apply', async (req, res) => {
  console.log('Received POST request to /api/gatepass/apply');
  console.log('Request body:', req.body); // Log the request body
  const { user_id, reason, emergency } = req.body;

  // Add checks to see if required fields are present
  if (!user_id || !reason) {
    console.error('Missing required fields in request body');
    return res.status(400).json({ error: 'Missing required fields: user_id, reason' });
  }

  try {
    console.log('Executing database query...');
    const result = await pool.query(
      `INSERT INTO outpass_requests (user_id, reason, emergency) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, reason, emergency || false]
    );
    console.log('Database query successful:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error during database query:', error.message); // Log the specific database error
    res.status(500).json({ error: error.message });
  }
});

// Student applies for OutPass
// router.post('/apply', async (req, res) => {
//   console.log('Received POST request to /api/gatepass/apply');
//   console.log('Request body:', req.body); 
//   const { user_id, reason, emergency } = req.body;
  
//   try {
//     const result = await pool.query(
//       `INSERT INTO outpass_requests (user_id, reason, emergency) VALUES ($1, $2, $3) RETURNING *`,
//       [user_id, reason, emergency || false]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Mentor fetches pending requests
router.get('/mentor/pending', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM outpass_requests WHERE status = 'pending' ORDER BY applied_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mentor approves/rejects a request
router.post('/:requestId/update', async (req, res) => {
  const { requestId } = req.params;
  const { status, mentor_id, comments } = req.body;
  try {
    const result = await pool.query(
      `UPDATE outpass_requests SET status = $1, mentor_id = $2, comments = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *`,
      [status, mentor_id, comments || null, requestId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
