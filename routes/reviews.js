const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/:productId', (req, res) => {
  const { productId } = req.params;
  const { username, body } = req.body;
  // VULN: no sanitization of review body
  db.run(`INSERT INTO reviews (product_id, username, body) VALUES (?, ?, ?)`,
    [productId, username, body], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

// VULN: Stored XSS - body rendered raw via <%- %> in views/product.ejs
router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  db.all(`SELECT * FROM reviews WHERE product_id = ?`, [productId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.render('product', { reviews: rows, productId });
  });
});

module.exports = router;
