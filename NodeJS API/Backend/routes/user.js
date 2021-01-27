const express = require('express');
const bcrypt = require('bcrypt')
const mariadb = require('mariadb');
const jwt = require('jsonwebtoken');
const router = express.Router();
var moment = require('moment');


const DBPASS = process.env.DBPASSWORD;

const pool = mariadb.createPool({host: '127.0.0.1',port:'3306', user: 'root', database:'explicaapp', password: DBPASS, connectionLimit: 5});

router.post("/signupexplicador",(req,res,next)=>{
  try {
  nome = req.body.nome;
  sobrenome = req.body.sobrenome;
  nif = req.body.NIF;
  disciplina = req.body.Disciplina;
  token = req.body.token;
  email = req.body.Email;
  usertype = "Explicador";
  pessoaid= "";

  pool.getConnection()
  .then(conn => {
    conn.query("SELECT COUNT(*) AS val FROM pessoa WHERE pessoa.NIF = '"+nif+"'")
      .then((rows) => {
        if(parseInt(rows[0].val) >0){
          conn.end();
          return res.status(201).json({
            code: "1",
            message: "NIF inserido já existe",
          })
        }else{
          conn.query("SELECT COUNT(*) AS val FROM tokens WHERE tokens.Token = '"+token+"'")
            .then((rows) => {
              if(parseInt(rows[0].val) == 0){
                conn.end();
                return res.status(201).json({
                  code: "3",
                  message: "Token inserido inválido",
                })
              }else{
                conn.query("SELECT COUNT(*) AS val FROM pessoa WHERE pessoa.Email = '"+email+"'")
                .then((rows) => {
                  if(parseInt(rows[0].val) >0){
                    conn.end();
                    return res.status(201).json({
                      code: "2",
                      message: "Email inserido já existe",
                    })
                  }else{
                    bcrypt.hash(req.body.password, 10)
                .then(hash=>{
                    conn.query("INSERT INTO pessoa (Nome, Sobrenome, NIF, Email, Password, UserType) VALUES ('"+nome+"','"+sobrenome+"','"+nif+"','"+email+"','"+hash+"','"+usertype+"')")
                      .then((rows) => {
                        pessoaid = rows.insertId;
                        conn.query("INSERT INTO explicador (Pessoa_idPessoa, DisciplinaID) VALUES ('"+rows.insertId+"','"+disciplina+"')")
                        .then(() => {
                          conn.query("INSERT INTO explicador_has_disciplinas (Explicador_Pessoa_idPessoa, Disciplinas_idDisciplinas) VALUES ('"+pessoaid+"','"+disciplina+"')")
                          .then(() => {
                            conn.end();
                            return res.status(201).json({
                              code: "201",
                              message: "Explicador criado com sucesso"
                            })
                        })
                        .catch(err => {
                          conn.end();
                          return res.status(500).json({
                            code: "0",
                            message: "Erro na pesquisa à BD!",
                          })
                        })
                      })
                      .catch(err => {
                        conn.end();
                        return res.status(500).json({
                          code: "0",
                          message: "Erro na pesquisa à BD!",
                        })
                      })
                  });
                }).catch(err=>{
                  conn.end();
                   return res.status(500).json({
                      code: "500",
                      message: "Erro no password Hashing!",
                    })
                  });}})
                          .catch(err => {
                            conn.end();
                            return res.json({
                              code: "0",
                              message: "Erro na pesquisa à BD!",
                            })
                          })
                            }
                          })
                    .catch(err => {
                      conn.end();
                      return res.status(500).json({
                        code: "0",
                        message: "Erro na pesquisa à BD!",
                      })
                    })
        }}).catch(err =>{
            conn.end();
              return res.status(500).json({
                code: "0",
                message: "Conexão à BD falhou!",
              })
        })

            }).catch(err => {
              conn.end();
              return res.status(500).json({
                code: "0",
                message: "Conexão à BD falhou!",
              })
            });} catch (err) {
              conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Erro no request!",
                })
              }
        });

router.post("/signupencarregado",(req,res,next)=>{

  nome = req.body.nome;
  sobrenome = req.body.sobrenome;
  nif = req.body.NIF;
  Pagamento = req.body.Pagamento;
  email = req.body.Email;
  usertype = "Encarregado";
  pessoaid= "";


  pool.getConnection()
  .then(conn => {
    conn.query("SELECT COUNT(*) AS val FROM pessoa WHERE pessoa.NIF = '"+nif+"'")
      .then((rows) => {
        if(parseInt(rows[0].val) >0){
          conn.end();
          return res.status(201).json({
            code: "1",
            message: "NIF inserido já existe",
          })
        }else{
          conn.query("SELECT COUNT(*) AS val FROM pessoa WHERE pessoa.Email = '"+email+"'")
          .then((rows) => {
            if(parseInt(rows[0].val) >0){
              conn.end();
              return res.status(201).json({
                code: "2",
                message: "Email inserido já existe",
              })
            }else{
              bcrypt.hash(req.body.password, 10)
                .then(hash=>{
                    conn.query("INSERT INTO pessoa (Nome, Sobrenome, NIF, Email, Password, UserType) VALUES ('"+nome+"','"+sobrenome+"','"+nif+"','"+email+"','"+hash+"','"+usertype+"')")
                    .then((rows) => {
                      pessoaid = rows.insertId;
                      conn.query("INSERT INTO encarregado (Pessoa_idPessoa, MetodoPagamento) VALUES ('"+rows.insertId+"','"+Pagamento+"')")
                      .then(() => {
                        conn.end();
                        return res.status(201).json({
                          code: "201",
                          message: "Encarregado criado com sucesso"
                        })
                    }).catch(err => {
                      conn.end();
                      return res.status(500).json({
                        code: "500",
                        message: "Conexão à BD falhou!",
                    })});
                    }).catch(err=>{
                      conn.end();
                        return res.status(500).json({
                          code: "500",
                          message: "Conexão à BD falhou!",
                        })
                      });

                  }).catch(err=>{
                  conn.end();
                    return res.status(500).json({
                      code: "500",
                      message: "Erro no password Hashing!",
                    })
                  });
            }}).catch(err => {
              conn.end();
              return res.status(500).json({
                code: "500",
                message: "Conexão à BD falhou!",
            })});
        }}).catch(err => {
          conn.end();
          return res.status(500).json({
            code: "500",
            message: "Conexão à BD falhou!",
        })});
      }).catch(err => {
        conn.end();
        return res.status(500).json({
          code: "500",
          message: "Conexão à BD falhou!",
      })});
});

router.post("/signupexplicando",(req,res,next)=>{

  nome = req.body.nome;
  sobrenome = req.body.sobrenome;
  nif = req.body.NIF;
  NIFEncarregado = req.body.NIFEncarregado;
  Ano = req.body.Ano;
  email = req.body.Email;
  usertype = "Explicando";
  encarregadoid = "";
  pessoaid= "";

  pool.getConnection()
  .then(conn => {
    conn.query("SELECT COUNT(*) AS val FROM pessoa WHERE pessoa.NIF = '"+nif+"'")
    .then((rows) => {
      if(parseInt(rows[0].val) >0){
        conn.end();
        return res.status(201).json({
          code: "1",
          message: "NIF inserido já existe",
        })
      }else{
        conn.query("SELECT COUNT(*) AS val FROM pessoa WHERE pessoa.NIF = '"+NIFEncarregado+"'")
          .then((rows) => {
            if(parseInt(rows[0].val) == 0){
              conn.end();
              return res.status(201).json({
                code: "3",
                message: "Token inserido inválido",
              })
            }else{
              conn.query("SELECT idPessoa AS id FROM pessoa WHERE pessoa.NIF = '"+NIFEncarregado+"'")
                .then((rows) => {
                  encarregadoid = rows[0].id;
                  conn.query("SELECT COUNT(*) AS val FROM pessoa WHERE pessoa.Email = '"+email+"'")
                    .then((rows) => {
                      if(parseInt(rows[0].val) >0){
                        conn.end();
                        return res.status(201).json({
                          code: "2",
                          message: "Email inserido já existe",
                        })
                      }else{
                        bcrypt.hash(req.body.password, 10)
                        .then(hash=>{
                          conn.query("INSERT INTO pessoa (Nome, Sobrenome, NIF, Email, Password, UserType) VALUES ('"+nome+"','"+sobrenome+"','"+nif+"','"+email+"','"+hash+"','"+usertype+"')")
                          .then((rows) => {
                            pessoaid = rows.insertId;
                            conn.query("INSERT INTO explicando (Pessoa_idPessoa, Encarregado_Pessoa_idPessoa,Escolaridade,NIFEncarregado,Propina_Anual,Propina_Mensal,Propina_Aula) VALUES ('"+rows.insertId+"','"+encarregadoid+"','"+Ano+"','"+NIFEncarregado+"','"+0+"','"+0+"','"+0+"')")
                                .then(() => {
                                  conn.end();
                                  return res.status(201).json({
                                    code: "201",
                                    message: "Explicando criado com sucesso"
                                  })
                              }).catch(err => {
                                conn.end();
                                return res.status(500).json({
                                  code: "500",
                                  message: "Conexão à BD falhou!",
                              })});
                          }).catch(err=>{
                            conn.end();
                              return res.status(500).json({
                                code: "500",
                                message: "Conexão à BD falhou!",
                              })
                            });
                        }).catch(err=>{
                          conn.end();
                            return res.status(500).json({
                              code: "500",
                              message: "Erro no password Hashing!",
                            })
                          });
                      }}).catch(err => {
                        conn.end();
                        return res.status(500).json({
                          code: "500",
                          message: "Conexão à BD falhou!",
                      })});
                }).catch(err => {
                  conn.end();
                  return res.status(500).json({
                    code: "500",
                    message: "Conexão à BD falhou!",
                })});
            }}).catch(err => {
              conn.end();
              return res.status(500).json({
                code: "500",
                message: "Conexão à BD falhou!",
            })});
      }}).catch(err => {
        conn.end();
        return res.status(500).json({
          code: "500",
          message: "Conexão à BD falhou!",
      })});
      }).catch(err => {
        conn.end();
        return res.status(500).json({
          code: "500",
          message: "Conexão à BD falhou!",
      })});
});


router.post("/criaToken",(req,res,next)=>{
  token = req.body.Token;


  pool.getConnection()
  .then(conn => {
    conn.query("INSERT INTO tokens (Token) VALUES ('"+token+"')")
      .then((rows) => {
        conn.end();
        return res.status(201).json({
          code: "201",
          message: "Token criada com sucesso!",
      })
      }).catch(err => {
        conn.end();
        return res.status(500).json({
          code: "500",
          message: "Conexão à BD falhou!",
      })});
});
});


router.post("/login",(req,res,next)=>{
  email = req.body.Email;


  pool.getConnection()
  .then(conn => {
    conn.query("SELECT COUNT(*) AS val FROM pessoa WHERE pessoa.Email = '"+email+"'")
      .then((rows) => {
        if(parseInt(rows[0].val) == 0){
          conn.end();
          return res.status(404).json({
            code: "0",
            message: "O Email inserrido não existe",
          })
        }else{
          conn.query("SELECT Password As password FROM pessoa WHERE pessoa.Email = '"+email+"'")
          .then((rows) => {
              bcrypt.compare(req.body.password, rows[0].password)
              .then(result =>{
              if(!result){
                conn.end();
                return res.status(401).json({
                  code: "1",
                  message: "Password incorreta",
                })
              }
              conn.query("SELECT idPessoa, Nome, Sobrenome, NIF, UserType, Email  FROM pessoa WHERE pessoa.Email = '"+email+"'")
              .then((rows) => {

                const token = jwt.sign({id: rows[0].idPessoa,Nome: rows[0].Nome,Sobrenome: rows[0].Sobrenome,NIF: rows[0].NIF, role: rows[0].UserType,Email: rows[0].Email},"JWT_SECRET_TOKEN_DEV_ONLY",{expiresIn: "1h"});
                conn.end();
                return res.status(200).json({
                  id: rows[0].idPessoa,
                  Nome: rows[0].Nome,
                  Sobrenome: rows[0].Sobrenome,
                  Email: rows[0].Email,
                  NIF: rows[0].NIF,
                  role: rows[0].UserType,
                  token: token
                })
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
              });
          })})
          .catch(err => {
            conn.end();
            return res.status(500).json({
              code: "500",
              message: "Conexão à BD falhou!",
          })});
        }
      }).catch(err => {
        conn.end();
        return res.status(500).json({
          code: "500",
          message: "Conexão à BD falhou!",
      })
    });
  }).catch(err => {
    conn.end();
    return res.status(500).json({
      code: "500",
      message: "Conexão à BD falhou!",
  })});});

  router.get("/getexplicadores",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
      conn.query("SELECT COUNT(*) AS val FROM explicador")
              .then((rows) => {
                conn.end();
                return res.status(200).json({
                  total: rows[0].val
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


  router.get("/getdadosexplicador",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
      conn.query("SELECT pessoa.idPessoa, pessoa.Nome, pessoa.Sobrenome, disciplinas.Nome AS Disciplina, disciplinas.Ano As Ano FROM pessoa, disciplinas, explicador_has_disciplinas WHERE pessoa.UserType = 'Explicador' AND pessoa.idPessoa = explicador_has_disciplinas.Explicador_Pessoa_idPessoa AND explicador_has_disciplinas.Disciplinas_idDisciplinas = disciplinas.idDisciplinas")
              .then((rows) => {
                conn.end();
                return res.status(200).send(rows);
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });
      });
  });


  router.get("/getexplicandos",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
      conn.query("SELECT COUNT(*) AS val FROM explicando")
              .then((rows) => {
                conn.end();
                return res.status(200).json({
                  total: rows[0].val
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

  router.post("/obterfeedback",(req,res,next)=>{
    ID = req.body.ID;

    pool.getConnection()
    .then(conn => {
      conn.query("SELECT COUNT(*) AS val FROM feedback WHERE Explicador_Pessoa_idPessoa = '"+ID+"'")
              .then((rows) => {
                if(rows[0].val == "0"){
                  conn.end();
                  return res.status(200).json({
                    code: "1",
                    message: "O ID de explicador introduzido não tem Feedbacks",
                  })
                }
                else{
                  conn.query("SELECT idFeedback AS ID, Feedback As Feedback,Explicador_Pessoa_idPessoa AS IDExplicador, Explicando_Pessoa_idPessoa AS IDExplicando FROM feedback WHERE Explicador_Pessoa_idPessoa = '"+ID+"' ORDER BY idFeedback")
                .then((rows) => {
                  conn.end();
                  return res.status(200).send(rows);
                }).catch(err =>{
                  conn.end();
                  return res.status(500).json({
                    code: "500",
                    message: "Conexão à BD falhou!",
                  })
              });
                }
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });
  });
  });

  router.delete("/eliminaexplicador/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
      conn.query("SELECT COUNT(*) AS val FROM explicador WHERE explicador.Pessoa_idPessoa = '"+req.params.id+"'")
              .then((rows) => {
                if(rows[0].val == "0"){
                  conn.end();
                  return res.status(200).json({
                    code: "1",
                    message: "O ID de explicador introduzido não existe",
                  })
                }
                else{
                  conn.query("DELETE FROM explicador_has_disciplinas WHERE Explicador_Pessoa_idPessoa = '"+req.params.id+"'")
                      .then((rows) => {
                        conn.query("DELETE FROM feedback WHERE Explicador_Pessoa_idPessoa = '"+req.params.id+"'")
                        .then((rows) => {
                          conn.query("DELETE FROM disponibilidade WHERE Explicador_Pessoa_idPessoa = '"+req.params.id+"'")
                        .then((rows) => {
                          conn.query("DELETE FROM avaliação WHERE Explicador_Pessoa_idPessoa = '"+req.params.id+"'")
                              .then((rows) => {
                                conn.query("DELETE FROM explicador WHERE Pessoa_idPessoa = '"+req.params.id+"'")
                                .then((rows) => {
                                  conn.query("DELETE FROM pessoa WHERE idPessoa = '"+req.params.id+"'")
                                  .then((rows) => {
                                    conn.end();
                                    return res.status(200).json({
                                      code: "200",
                                      message: "Explicador Eliminado",
                                    })
                                    }).catch(err =>{
                                    conn.end();
                                    return res.status(500).json({
                                      code: "500",
                                      message: "Conexão à BD falhou!",
                                    })
                                    });
                        }).catch(err =>{
                          conn.end();
                          return res.status(500).json({
                            code: "500",
                            message: "Conexão à BD falhou!",
                          })
                      });
                      }).catch(err =>{
                        conn.end();
                        return res.status(500).json({
                          code: "500",
                          message: "Conexão à BD falhou!",
                        })
                    });
                }).catch(err =>{
                  conn.end();
                  return res.status(500).json({
                    code: "500",
                    message: "Conexão à BD falhou!",
                  })
              });
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });}}).catch(err =>{
              conn.end();
              return res.status(500).json({
              code: "500",
              message: "Conexão à BD falhou!",
            })
          });})
            .catch(err =>{
              conn.end();
              return res.status(500).json({
              code: "500",
              message: "Conexão à BD falhou!",
            })
          });
  })


  router.post("/avaliaexplicador",(req,res,next)=>{
    ID = req.body.ID;
    Avaliacao = req.body.Avaliacao;

    pool.getConnection()
    .then(conn => {
      conn.query("SELECT COUNT(*) AS val FROM explicador WHERE Pessoa_idPessoa = '"+ID+"'")
              .then((rows) => {
                if(rows[0].val == "0"){
                  conn.end();
                  return res.status(200).json({
                    code: "1",
                    message: "O ID de explicador introduzido não existe",
                  })
                }
                else{
                  conn.query("INSERT INTO avaliação (Explicador_Pessoa_idPessoa,Avaliação) VALUES ('"+ID+"','"+Avaliacao+"')")
                .then((rows) => {
                  conn.end();
                  return res.status(201).json({
                    code: "201",
                    message: "Avaliação Criada com sucesso",
                  });
                }).catch(err =>{
                  conn.end();
                  return res.status(500).json({
                    code: "500",
                    message: "Conexão à BD falhou!",
                  })
              });
                }
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });
  });
  });


  router.post("/obteravaliacoes",(req,res,next)=>{
    ID = req.body.ID;

    pool.getConnection()
    .then(conn => {
      conn.query("SELECT COUNT(*) AS val FROM avaliação WHERE Explicador_Pessoa_idPessoa = '"+ID+"'")
              .then((rows) => {
                if(rows[0].val == "0"){
                  conn.end();
                  return res.status(200).json({
                    code: "1",
                    message: "O ID de explicador introduzido não tem Avaliações",
                  })
                }
                else{
                  conn.query("SELECT idAvaliação AS ID ,Explicador_Pessoa_idPessoa AS IDExplicador, Avaliação AS Avaliacao FROM avaliação WHERE Explicador_Pessoa_idPessoa = '"+ID+"' ORDER BY idAvaliação")
                .then((rows) => {
                  conn.end();
                  return res.status(200).send(rows);
                }).catch(err =>{
                  conn.end();
                  return res.status(500).json({
                    code: "500",
                    message: "Conexão à BD falhou!",
                  })
              });
                }
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });
  });
  });
  router.post("/mudapagamento",(req,res,next)=>{
    ID = req.body.ID;
    metodo = req.body.Metodo

    pool.getConnection()
    .then(conn => {
      conn.query("UPDATE encarregado SET MetodoPagamento = '"+metodo+"' WHERE Pessoa_idPessoa = '"+ID+"'")
              .then((rows) => {
                  conn.end();
                  return res.status(200).json({
                    code: "200",
                    message: "Metodo alterado com sucesso",
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

  router.get("/educandos/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
            conn.query("SELECT idPessoa, Nome, Sobrenome, NIF FROM pessoa, explicando WHERE explicando.Pessoa_idPessoa = idPessoa AND Encarregado_Pessoa_idPessoa = '"+req.params.id+"'")
              .then((rows)=>{
                  conn.end();
                  return res.status(200).send(rows);
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });
      }).catch(err =>{
        conn.end();
        return res.status(500).json({
          code: "500",
          message: "Conexão à BD falhou!",
        })
    });
  })
  router.get("/aproveitamento/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
            conn.query("SELECT pessoa.Nome, Sobrenome, Progresso, Assiduidade, disciplinas.Nome AS DiscNome FROM disciplinas, pessoa, explicando, disciplinas_has_explicando WHERE disciplinas_has_explicando.Disciplinas_idDisciplinas = disciplinas.idDisciplinas AND disciplinas_has_explicando.Explicando_Pessoa_idPessoa = explicando.Pessoa_idPessoa AND explicando.Pessoa_idPessoa = idPessoa AND Encarregado_Pessoa_idPessoa = '"+req.params.id+"'")
              .then((rows)=>{
                  conn.end();
                  return res.status(200).send(rows);
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });
      }).catch(err =>{
        conn.end();
        return res.status(500).json({
          code: "500",
          message: "Conexão à BD falhou!",
        })
    });
  })

  router.get("/metodopaga/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
            conn.query("SELECT MetodoPagamento FROM encarregado WHERE Pessoa_idPessoa = '"+req.params.id+"'")
              .then((rows)=>{
                  conn.end();
                  return res.status(200).json({
                      metodo: rows[0].MetodoPagamento
                  });
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });
      }).catch(err =>{
        conn.end();
        return res.status(500).json({
          code: "500",
          message: "Conexão à BD falhou!",
        })
    });
  })
  router.get("/propinas/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
            conn.query("SELECT explicando.Pessoa_idPessoa, pessoa.Nome, pessoa.Sobrenome, Propina_Aula, Propina_Mensal, Propina_Anual FROM  pessoa, explicando WHERE explicando.Pessoa_idPessoa = idPessoa AND Encarregado_Pessoa_idPessoa = '"+req.params.id+"'")
              .then((rows)=>{
                  conn.end();
                  return res.status(200).send(rows)
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });
      }).catch(err =>{
        conn.end();
        return res.status(500).json({
          code: "500",
          message: "Conexão à BD falhou!",
        })
    });
  })

  router.post("/pagarpropinas",(req,res,next)=>{
    Metodo = req.body.Metodo;
    ID = req.body.ID;
    NIF = req.body.NIF;
    idPai = req.body.IDPai;
    data =  moment().format('YYYY-MM-DD hh:mm:ss');


    pool.getConnection()
    .then(conn => {
        conn.query("SELECT Propina_Aula, Propina_Mensal, Propina_Anual FROM explicando WHERE explicando.Pessoa_idPessoa = '"+ID+"'")
              .then((rows)=>{
                if(Metodo == "Aula"){
                  Valor = rows[0].Propina_Aula;
                }
                if(Metodo == "Mensal"){
                  Valor = rows[0].Propina_Mensal;
                }
                else{
                  Valor = rows[0].Propina_Anual;
                }

                conn.query("INSERT INTO faturas (Data,Valor,NIF,Encarregado_Pessoa_idPessoa) VALUES ('"+data+"','"+Valor+"','"+NIF+"','"+idPai+"')")
                .then((rows)=>{
                  conn.query("UPDATE explicando SET Propina_Aula = '"+0+"', Propina_Mensal = '"+0+"', Propina_Anual= '"+0+"' WHERE explicando.Pessoa_idPessoa = '"+ID+"'")
                  .then((rows)=>{
                      return res.status(200).json({
                        code: "200",
                        message: "Pagamento efetuado"
                      })
                  }).catch(err =>{
                  conn.end();
                  return res.status(500).json({
                    code: "500",
                    message: "Conexão à BD falhou!",
                  })
              });

                }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });

              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });

              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });
  });




module.exports = router;
