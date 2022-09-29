const mysql = require('../services/mysql');
const { successResponse, errorResponse } = require('../helpers/common');

const listBuku = async (req, res) => {
  const databuku = await mysql.query('SELECT * FROM buku')
  return res.json(
    successResponse(databuku)
  );
}

const detailBuku = async (req, res) => {
  const id = req.params.id
  const databuku = await mysql.query('SELECT * FROM buku WHERE id = ?', [id])

  if (databuku.length == 0) {
    return res.status(400).json(
      errorResponse('data tidak ditemukan')
    )
  }

  return res.json(
    successResponse(databuku[0])
  );
}

const addBuku = async (req, res) => {
  // validate request
  const nama = req.body.nama
  const deskripsi = req.body.deskripsi
  const harga = req.body.harga

  if (typeof nama !== 'string' || nama === '') {
    return res.status(400).json(
      errorResponse('kolom nama dibutuhkan')
    )
  }

  if (typeof deskripsi !== 'string' || deskripsi === '') {
    return res.status(400).json(
      errorResponse('kolom deskripsi dibutuhkan')
    )
  }

  if (typeof harga !== 'number' || harga === 0) {
    return res.status(400).json(
      errorResponse('kolom harga dibutuhkan')
    )
  }

  // insert data
  const databuku = await mysql.query('INSERT INTO buku(nama, deskripsi, harga) VALUES(?, ?, ?)', [nama, deskripsi, harga])

  return res.json(
    successResponse({
      id: databuku.insertId,
      nama: nama,
      deskripsi: deskripsi,
      harga: parseInt(harga),
    })
  )
}

const updateBuku = async (req, res) => {

  // validate request
  const nama = req.body.nama
  const deskripsi = req.body.deskripsi
  const harga = req.body.harga

  if (typeof nama !== 'string' || nama === '') {
    console.log(typeof nama, nama)
    return res.status(400).json(
      errorResponse('kolom nama dibutuhkan')
    )
  }

  if (typeof deskripsi !== 'string' || deskripsi === '') {
    return res.status(400).json(
      errorResponse('kolom deskripsi dibutuhkan')
    )
  }

  if (typeof harga !== 'number' || harga === 0) {
    return res.status(400).json(
      errorResponse('kolom harga dibutuhkan')
    )
  }

  // check data
  const id = req.params.id
  const databuku = await mysql.query('SELECT * FROM buku WHERE id = ?', [id])

  if (databuku.length == 0) {
    return res.status(400).json(
      errorResponse('data tidak ditemukan')
    )
  }

  // update data
  await mysql.query(`
    UPDATE buku 
    SET nama = ?, deskripsi = ?, harga = ?
    WHERE id = ?
  `, [nama, deskripsi, harga, id])

  return res.json(
    successResponse({
      id: databuku.id,
      nama: nama,
      deskripsi: deskripsi,
      harga: parseInt(harga),
    })
  )
}

module.exports = {
  listBuku,
  detailBuku,
  addBuku,
  updateBuku
}