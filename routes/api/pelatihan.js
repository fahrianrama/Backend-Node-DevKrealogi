const express = require('express');
const connection = require('../../config.js');

const router = express.Router();

router.get('/', (req,res)=>{
    connection.query("SELECT pelatihan_id, judul, deskripsi, status, create_at FROM pelatihan WHERE status = 'published'" , function(err, result, fields) {
        if (err) {
            res.send(500, err.message);
        }
        else{
            res.json(result);
        }
    });
});

router.get('/all', (req,res)=>{
    connection.query("SELECT pelatihan_id, judul, deskripsi, status, create_at FROM pelatihan" , function(err, result, fields) {
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
            let pertanyaan = String(result[0].pertanyaan).split("|");
            let pilihan = String(result[0].pilihan).split("|");
            let jawaban = String(result[0].jawaban).split("|");

            res.json({
                pelatihan_id: result[0].pelatihan_id,
                user_id: result[0].user_id,
                judul: result[0].judul,
                deskripsi: result[0].deskripsi,
                pertanyaan: pertanyaan,
                pilihan: pilihan,
                jawaban: jawaban,
                status_seleksi_user: result[0].status_seleksi_user,
                sesi_pelatihan: result[0].sesi_pelatihan,
                link_meeting: result[0].link_meeting,
                tanggal_waktu: result[0].tanggal_waktu,
                status: result[0].status,
                create_at: result[0].create_at,
                update_at: result[0].update_at
            });
        }
    });
});

router.post('/store',(req,res)=>{
    const pelatihan = req.body;
    const pertanyaan = "Apakah jenis usaha Anda?|Apakah bisnis Anda aktif selama 6 bulan terakhir?|Berkomitmen untuk mengembangkan usaha dengan teknologi?|Berapa masa kadaluarsa produk Anda?|Usaha Anda bergerak dibidang?|Apakah Anda memahami proses bisnis UMKM secara keseluruhan?|Berkomitmen melakukan pelatihan 4-5 hari dalam seminggu?|Apakah Anda memiliki email yang aktif|Apakah smartphone Anda memiliki memori yang cukup (>30MB) ?|Apakah Anda menggunakan aplikasi WhatsApp secara berkala?|Apakah Anda bersedia memberikan pengganti sementara saat tidak bisa hadir dalam sesi pelatihan/konsultasi usaha?";
    const pilihan = "Produksi sendiri:Distribusi produk buatan orang lain|Ya:Tidak|Ya:Tidak|Kurang dari seminggu:Seminggu:Lebih dari seminggu|Jasa:Barang:Barang dan Jasa|Ya:Tidak|Ya:Tidak|Ya:Tidak|Ya:Tidak|Ya:Tidak|Ya:Tidak";
    const jawaban = "a|a|none|b:c|b:c|none|a|a|a|a|none";
    connection.query("INSERT INTO pelatihan (judul,deskripsi,pertanyaan,pilihan,jawaban,status,create_at,update_at) VALUES (?,?,?,?,?,'created',NOW(),NOW())",[pelatihan.judul,pelatihan.deskripsi,pertanyaan,pilihan,jawaban,pelatihan.status],(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json({"status":"success"});
        }
    })
});

router.post('/update',(req,res)=>{
    const pelatihan = req.body;
    connection.query("UPDATE pelatihan SET user_id = ?, judul = ?, deskripsi = ?, pertanyaan = ?, pilihan = ?, jawaban = ?, status_seleksi_user = ?, sesi_pelatihan = ?, link_meeting = ?, tanggal_waktu = ?, status = ?, update_at = NOW() WHERE pelatihan_id = ?", [pelatihan.user_id, pelatihan.judul, pelatihan.deskripsi, pelatihan.pertanyaan, pelatihan.pilihan, pelatihan.jawaban, pelatihan.status_seleksi_user, pelatihan.sesi_pelatihan, pelatihan.link_meeting, pelatihan.tanggal_waktu, pelatihan.status, pelatihan.pelatihan_id], (err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json({"status":"success"});
        }
    });
});

router.get('/publish/:id',(req,res)=>{
    const id = req.params.id;
    connection.query("UPDATE pelatihan SET status = 'published' WHERE pelatihan_id = ?",[id],(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json({"status":"success"});
        }
    });
});

router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    connection.query("DELETE FROM pelatihan WHERE pelatihan_id = ?",[id],(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json({"status":"success"});
        }
    })
});

module.exports = router;