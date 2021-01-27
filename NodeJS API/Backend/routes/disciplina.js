const express = require('express');
const bcrypt = require('bcrypt')
const mariadb = require('mariadb');
const jwt = require('jsonwebtoken');
const router = express.Router();

const DBPASS = process.env.DBPASSWORD;

const pool = mariadb.createPool({host: '127.0.0.1',port:'3306', user: 'root', database:'explicaapp', password: DBPASS, connectionLimit: 5});



  router.get("/getdisciplinas",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
      conn.query("SELECT COUNT(*) AS val FROM disciplinas")
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

  router.get("/getdisciplinasinfo",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
      conn.query("SELECT idDisciplinas, Nome, Ano FROM disciplinas ORDER BY idDisciplinas")
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

  router.delete("/delete/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
      conn.query("SELECT COUNT(*) AS val FROM disciplinas WHERE disciplinas.idDisciplinas = '"+req.params.id+"'")
              .then((rows) => {
                if(rows[0].val == "0"){
                  conn.end();
                  return res.status(200).json({
                    code: "1",
                    message: "O ID de disciplina introduzido não existe",
                  })
                }
                else{
                  conn.query("DELETE FROM explicador_has_disciplinas WHERE Disciplinas_idDisciplinas = '"+req.params.id+"'")
                      .then((rows) => {
                        conn.query("DELETE FROM disciplinas_has_explicando WHERE Disciplinas_idDisciplinas = '"+req.params.id+"'")
                        .then((rows) => {
                          conn.query("DELETE FROM conteúdos WHERE Disciplinas_idDisciplinas = '"+req.params.id+"'")
                        .then((rows) => {
                          conn.query("DELETE FROM link WHERE Disciplinas_idDisciplinas = '"+req.params.id+"'")
                        .then((rows) => {
                          conn.query("DELETE FROM disciplinas WHERE idDisciplinas = '"+req.params.id+"'")
                        .then((rows) => {
                          conn.end();
                          return res.status(200).json({
                            code: "200",
                            message: "Disciplina Eliminada",
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
            })}).catch(err =>{
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
        });;
  });
})


  router.post("/criadisciplina",(req,res,next)=>{
    Disciplina = req.body.Nome;
    Ano = req.body.Ano

    pool.getConnection()
    .then(conn => {
      conn.query("SELECT COUNT(*) AS val FROM disciplinas Where disciplinas.Nome = '"+Disciplina+"' AND disciplinas.Ano = '"+Ano+"' ")
              .then((rows) => {
                if(rows[0].val > 0){
                  conn.end();
                  return res.json({
                    code: "500",
                    message: "Disciplina já foi criada"
                  });
                }
                else{
                  conn.query("INSERT INTO disciplinas (Nome, Ano) VALUES ('"+Disciplina+"','"+Ano+"')")
                  .then((rows) => {
                          conn.end();
                          return res.status(201).json({
                            code: "201",
                            message: "Disciplina criada com sucesso"
                          })
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

  router.get("/infodisciplina/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
      conn.query("SELECT Disciplinas_idDisciplinas AS id FROM explicador_has_disciplinas WHERE Explicador_Pessoa_idPessoa = '"+req.params.id+"'")
              .then((rows) => {
                idDisciplina = rows[0].id;
                conn.query("SELECT idDisciplinas AS ID, Nome, Ano FROM disciplinas WHERE idDisciplinas = '"+idDisciplina+"'")
                .then((rows) =>{
                  conn.end();
                  return res.status(200).json({
                    ID: rows[0].ID,
                    Nome: rows[0].Nome,
                    Ano: rows[0].Ano
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
        });;
  });

  router.get("/linksdisciplina/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
            conn.query("SELECT COUNT(*) AS val FROM link WHERE Disciplinas_idDisciplinas = '"+req.params.id+"'")
              .then((rows) => {
                if(rows[0].val==0){
                  conn.end();
                  return res.status(200).json({
                        code: "0",
                        id:"0",
                        message: "Disciplina sem link"
                  });
                }else{
                  conn.query("SELECT idLink, Disciplinas_idDisciplinas, Link FROM link WHERE Disciplinas_idDisciplinas = '"+req.params.id+"'")
                  .then((rows) => {
                    conn.end();
                    return res.status(200).json({
                          code: "200",
                          id: rows[0].idLink,
                          message: rows[0].Link
                    });
                  }).catch(err =>{
                    conn.end();
                    return res.status(500).json({
                      code: "500",
                      message: "Conexão à BD falhou!",
                    })
                });
                }}).catch(err =>{
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
  router.get("/conteudodisciplina/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
            conn.query("SELECT COUNT(*) AS val FROM conteúdos WHERE Disciplinas_idDisciplinas = '"+req.params.id+"'")
              .then((rows) => {
                if(rows[0].val==0){
                  conn.end();
                  return res.status(404).json({
                    code: "404",
                    message: "Sem conteúdos"
                  });
                }else{
                  conn.query("SELECT idConteúdos, Título, Description FROM conteúdos WHERE Disciplinas_idDisciplinas = '"+req.params.id+"'")
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
                }}).catch(err =>{
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


  router.get("/disciplinasano/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
            conn.query("SELECT Escolaridade AS val FROM explicando WHERE Pessoa_idPessoa = '"+req.params.id+"'")
              .then((rows) => {
                  Ano = rows[0].val;
                  conn.query("SELECT idDisciplinas, Nome, Ano FROM disciplinas WHERE Ano = '"+Ano+"'")
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

      }).catch(err =>{
            conn.end();
            return res.status(500).json({
              code: "500",
              message: "Conexão à BD falhou!",
            })
        });
  });


  router.get("/minhasdisciplinas/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
            conn.query("SELECT DISTINCT disciplinas.idDisciplinas, disciplinas.Nome, disciplinas.Ano FROM disciplinas, disciplinas_has_explicando, explicando WHERE disciplinas.idDisciplinas = disciplinas_has_explicando.Disciplinas_idDisciplinas AND disciplinas_has_explicando.Explicando_Pessoa_idPessoa ='"+req.params.id+"'")
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

      }).catch(err =>{
            conn.end();
            return res.status(500).json({
              code: "500",
              message: "Conexão à BD falhou!",
            })
        });
  });


  router.get("/disponibilidades/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
            conn.query("SELECT pessoa.Nome, pessoa.Sobrenome, disponibilidade.Explicador_Pessoa_idPessoa, disponibilidade.Dates FROM pessoa, explicador, disponibilidade, explicador_has_disciplinas WHERE explicador.Pessoa_idPessoa = pessoa.idPessoa AND explicador.Pessoa_idPessoa = explicador_has_disciplinas.Explicador_Pessoa_idPessoa AND explicador_has_disciplinas.Disciplinas_idDisciplinas = '"+req.params.id+"' AND explicador.Pessoa_idPessoa = disponibilidade.Explicador_Pessoa_idPessoa")
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

      }).catch(err =>{
            conn.end();
            return res.status(500).json({
              code: "500",
              message: "Conexão à BD falhou!",
            })
        });
  });


  router.get("/thisdisciplinas/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
            conn.query("SELECT disciplinas.idDisciplinas, disciplinas.Nome, disciplinas.Ano FROM disciplinas WHERE disciplinas.idDisciplinas = '"+req.params.id+"'")
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

      }).catch(err =>{
            conn.end();
            return res.status(500).json({
              code: "500",
              message: "Conexão à BD falhou!",
            })
        });
  });
  router.get("/explicadores/:id",(req,res,next)=>{
    pool.getConnection()
    .then(conn => {
            conn.query("SELECT Escolaridade FROM explicando WHERE explicando.Pessoa_idPessoa = '"+req.params.id+"'")
            .then((rows)=>{
              Ano = rows[0].Escolaridade;
              conn.query("SELECT pessoa.idPessoa, pessoa.Nome, pessoa.Sobrenome FROM explicador_has_disciplinas, pessoa, disciplinas WHERE disciplinas.Ano = '"+Ano+"' AND explicador_has_disciplinas.Disciplinas_idDisciplinas = disciplinas.idDisciplinas AND explicador_has_disciplinas.Explicador_Pessoa_idPessoa = pessoa.idPessoa")
              .then((rows)=>{
                  conn.end();
                  return res.status(200).send(rows);
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
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
  })

  router.post("/disponibilidade",(req,res,next)=>{
    ID = req.body.ID;
    Data = req.body.Data

    pool.getConnection()
    .then(conn => {
      conn.query("INSERT INTO disponibilidade (Explicador_Pessoa_idPessoa, Dates) VALUES ('"+ID+"','"+Data+"')")
      .then((rows) => {
              conn.end();
              return res.status(201).json({
                code: "201",
                message: "Data criada com sucesso"
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
  });
  router.post("/criarFeedback",(req,res,next)=>{
    ID = req.body.ID;
    Feedback = req.body.Feedback;
    explicando = req.body.Explicando;

    pool.getConnection()
    .then(conn => {
      conn.query("INSERT INTO feedback (Explicador_Pessoa_idPessoa, Feedback, Explicando_Pessoa_idPessoa) VALUES ('"+ID+"','"+Feedback+"','"+explicando+"')")
      .then((rows) => {
              conn.end();
              return res.status(201).json({
                code: "201",
                message: "Data criada com sucesso"
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
  });

  router.post("/subscrevedisciplina",(req,res,next)=>{
    UserID = req.body.UserID;
    DisciplinaID = req.body.DisciplinaID

    pool.getConnection()
    .then(conn => {
      conn.query("Select COUNT(*) AS val FROM disciplinas_has_explicando WHERE Explicando_Pessoa_idPessoa = '"+UserID+"' AND Disciplinas_idDisciplinas= '"+DisciplinaID+"'")
      .then((rows)=>{
          if(rows[0].val>0){
              conn.end();
              return res.status(200).json({
                code: "1",
                message: "Já está inscrito!",
              })
          }else{
            conn.query("Select Propina_Mensal, Propina_Anual FROM explicando WHERE Pessoa_idPessoa = '"+UserID+"'")
            .then((rows) => {
                    Mensal = parseFloat(rows[0].Propina_Mensal);
                    Anual = parseFloat(rows[0].Propina_Anual);
                    conn.query("Select Mensal, Anual FROM precario")
                    .then((rows) => {
                      precarioAnual = parseFloat(rows[0].Anual);
                      precarioMensal = parseFloat(rows[0].Mensal);
                      MensalFinal = Mensal + precarioMensal;
                      AnualFinal = Anual + precarioAnual;

                      conn.query("UPDATE explicando SET Propina_Anual = '"+AnualFinal+"', Propina_Mensal = '"+MensalFinal+"' WHERE Pessoa_idPessoa = '"+UserID+"'")
                      .then((rows) =>{
                        conn.query("INSERT INTO disciplinas_has_explicando (Disciplinas_idDisciplinas, Explicando_Pessoa_idPessoa) VALUES ('"+DisciplinaID+"','"+UserID+"')")
                        .then((rows)=>{
                            conn.end();
                            return res.status(200).json({
                              code: "200",
                              message: "Inscrição realizada com sucesso",
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
          }
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



  router.post("/adicionaAula",(req,res,next)=>{
    UserID = req.body.IDUSER;
    DisciplinaID = req.body.IDDisc

    pool.getConnection()
    .then(conn => {
        conn.query("Select Propina_Aula FROM explicando WHERE Pessoa_idPessoa = '"+UserID+"'")
            .then((rows) => {
                    Aula = parseFloat(rows[0].Propina_Aula);
                    conn.query("Select Aula FROM precario")
                    .then((rows) => {
                      precarioAula = parseFloat(rows[0].Aula);
                      AulaFinal = Aula + precarioAula;
                      conn.query("UPDATE explicando SET Propina_Aula = '"+AulaFinal+"' WHERE Pessoa_idPessoa='"+UserID+"'")
                      .then((rows) =>{
                        conn.query("Select Progresso, Assiduidade FROM disciplinas_has_explicando WHERE Explicando_Pessoa_idPessoa='"+UserID+"' AND Disciplinas_idDisciplinas = '"+DisciplinaID+"' ")
                        .then((rows)=>{
                            if(rows[0].Progresso == null){
                              Progresso = 1;
                            }
                            if(rows[0].Assiduidade == null){
                              Assiduidade = 1;
                            }else{
                              auxProg = parseInt(rows[0].Progresso);
                              auxAss = parseInt(rows[0].Assiduidade);
                              Progresso = auxProg +1;
                              Assiduidade = auxAss + 1;
                            }
                            conn.query("UPDATE disciplinas_has_explicando SET Progresso = '"+Progresso+"', Assiduidade = '"+Assiduidade+"' WHERE Explicando_Pessoa_idPessoa='"+UserID+"' AND Disciplinas_idDisciplinas = '"+DisciplinaID+"' ")
                            .then((rows=>{
                              conn.end();
                            return res.status(200).json({
                              code: "200",
                              message: "Progressso adicionado com sucesso!",
                            })
                            })).catch(err =>{
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
    });
  });

  router.post("/criaconteudo",(req,res,next)=>{
    ID = req.body.ID;
    titulo = req.body.titulo
    conteudo = req.body.conteudo

    pool.getConnection()
    .then(conn => {
      conn.query("INSERT INTO conteúdos (Disciplinas_idDisciplinas, Título, Description) VALUES ('"+ID+"','"+titulo+"','"+conteudo+"')")
      .then((rows) => {
              conn.end();
              return res.status(201).json({
                code: "201",
                message: "Conteúdo criado com sucesso"
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
  });
  router.post("/crialink",(req,res,next)=>{
    ID = req.body.ID;
    link = req.body.link

    pool.getConnection()
    .then(conn => {
      conn.query("SELECT COUNT(*) AS val FROM link WHERE Disciplinas_idDisciplinas = '"+ID+"'")
      .then((rows) => {
        if(rows[0].val==0){
          conn.query("INSERT INTO link (Disciplinas_idDisciplinas, link) VALUES ('"+ID+"','"+link+"')")
              .then((rows) => {
                      conn.end();
                      return res.status(201).json({
                        code: "201",
                        message: "Link criado com sucesso"
                      })
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });
        }else{
          conn.query("UPDATE link SET link = '"+link+"'")
              .then((rows) => {
                conn.end();
                return res.status(200).json({
                  code: "201",
                  message: "Link atualizado",
                });
              }).catch(err =>{
                conn.end();
                return res.status(500).json({
                  code: "500",
                  message: "Conexão à BD falhou!",
                })
            });
        }}).catch(err =>{
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
