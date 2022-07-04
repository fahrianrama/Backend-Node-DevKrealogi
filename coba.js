const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'u1716933_krealogi'
})

function update(){
    connection.query("UPDATE pelatihan SET pertanyaan = ?, pilihan = ?, jawaban = ? WHERE pelatihan_id = ?",[pertanyaan,pilihan,jawaban,id]), (err, result) =>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json(result);
        }
    }
}

async function getdata(id){
    var row;
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("SELECT pertanyaan,pilihan,jawaban FROM pelatihan WHERE pelatihan_id = ?",[id], function (err, result, fields) {
            if (err) throw err;
            Object.keys(result).forEach(function(key) {
                row = result[key];
            });
        });
    });
    let promise = new Promise((res, rej) => {
        setTimeout(() => res(row), 1000)
    });
    let result = await promise;
    return result;
}


function insert_pertanyaan(id,pertanyaan_new){
    let result = getdata(id)
    result.then(
        function(result){
            let old = JSON.stringify(result.pertanyaan);
            old = old.split("|");
            id_new = (Object.keys(old)).length;
            let data = '';
            for (i=0; i<id_new; i++){
                if(i==0){
                    data += old[i];
                }
                else{
                    data += '|' + old[i];
                }
            }
            data += '|' + pertanyaan_new;
            console.log(data);
            connection.query(`UPDATE pelatihan SET pertanyaan = ? WHERE pelatihan_id = ?`,[data,id], function (err, result, fields){
                if (err) throw err;
                console.log("Berhasil!");
            });
            connection.query(`UPDATE pelatihan SET pertanyaan = REPLACE(pertanyaan, '"', '')`,function (err, result, fields){
                if (err) throw err;
                console.log("Quotation Mark dihapus!");
            });
        }
    )
}

function update_pertanyaan(pelatihan_id,id,pertanyaan){
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("SELECT JSON_VALUE(pertanyaan,'$.value') as value FROM pelatihan WHERE pelatihan_id = ? & JSON_VALUE(pertanyaan,'$.id') = ?",[pelatihan_id,id], function (err, result, fields){
            if (err) throw err;
            Object.keys(result).forEach(function(key) {
                row = result[key];
                console.log(row.value);
                connection.query('UPDATE pelatihan SET pertanyaan = REPLACE(pertanyaan, {"id":"0", "value":"Berapa 1+1"}, {"id":"0", "value":"Berapa 2+2"}'),(err,result)=>{

                };
                process.exit();
            });
        });
    });
}

// update_pertanyaan(1,0,'halo');
insert_pertanyaan(1,'apakah mayo instrumen?');