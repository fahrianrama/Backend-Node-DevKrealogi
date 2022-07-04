const express = require('express');
const connection = require('../../config.js');

const router = express.Router();

router.get('/', (req,res)=>{
    connection.query("SELECT pelatihan_id, judul, deskripsi, status, create_at FROM pelatihan WHERE status = 'published'" , function(err, res, fields) {
        if (err) {
            res.send(500, err.message);
        }
        else{
            res.json(result);
        }
    });
});

router.get('/:id', (req,res)=>{
    const id = req.params.id;
    connection.query("SELECT pelatihan_id, user_id, judul, deskripsi, pertanyaan, pilihan, jawaban, status_seleksi_user, sesi_pelatihan, link_meeting, tanggal_waktu, status, create_at, update_at FROM pelatihan where pelatihan_id = ?",[id], function(err, result, fields) {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json(result);
        }
    });
});

router.post('/store',(req,res)=>{
    const pelatihan = req.body;
    connection.query("INSERT INTO pelatihan (judul,deskripsi,status,create_at,update_at) VALUES (?,?,'created',NOW(),NOW())",[pelatihan.judul,pelatihan.deskripsi,pelatihan.status],(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json({"status":"success"});
        }
    })
});

router.post('/update/:field',(req,res)=>{
    const pelatihan = req.body;
    const field = req.params.field;
    
})

module.exports = router;