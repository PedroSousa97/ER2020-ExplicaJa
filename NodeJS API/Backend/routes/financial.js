const express = require('express');
const bcrypt = require('bcrypt')
const mariadb = require('mariadb');
const jwt = require('jsonwebtoken');
const router = express.Router();

//Database password from the .ENV file
const DBPASS = process.env.DBPASSWORD;

//Database connection
const pool = mariadb.createPool({host: '127.0.0.1',port:'3306', user: 'root', database:'explicaapp', password: DBPASS, connectionLimit: 5});

//Simple CFO route to get the payment Invoices
  router.get("/getfaturas",(req,res,next)=>{

    pool.getConnection()
    .then(conn => {
            conn.query("SELECT idFaturas AS ID ,Data AS Data, Valor AS Valor, NIF AS NIF, Encarregado_Pessoa_idPessoa AS IDEncarregado FROM faturas ORDER BY Data")
                .then((rows) => {
                  conn.end();
                  return res.status(200).send(rows);
                }).catch(err =>{
                  conn.end();
                  return res.status(500).json({
                    code: "500",
                    message: "Conexão à BD falhou!",
                  })
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });
        });
  });






module.exports = router;
