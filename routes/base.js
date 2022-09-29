const express = require('express')
const router = express.Router();

const bukuController = require('../controllers/bukuController')

router.get('/api/buku/list', bukuController.listBuku)
router.get('/api/buku/detail/:id', bukuController.detailBuku)
router.post('/api/buku/add', bukuController.addBuku)
router.put('/api/buku/update/:id', bukuController.updateBuku)

module.exports = router
