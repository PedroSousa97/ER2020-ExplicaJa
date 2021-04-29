import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class disciplinaService {
    constructor(private http: HttpClient) { }

    disciplinas: [] = [];

    getDisciplinasInfo(){
      return this.http.get<any>("http://localhost:3000/api/disciplina/getdisciplinasinfo")
              .pipe(map(result => {
                  this.disciplinas=result;
                  return result;
              }));
    }

    getDisciplinas(){
        return this.http.get<any>("http://localhost:3000/api/disciplina/getdisciplinas");
    }

    criaDisciplina(Nome: string, Ano: Number){

        return this.http.post<any>("http://localhost:3000/api/disciplina/criadisciplina", { Nome, Ano })
                .pipe(map(response => {
                    return response;
                }));
    }
    deleteDisciplina(ID: string){
      const url = `http://localhost:3000/api/disciplina/delete/${ID}`;
      return this.http.delete<any>(url)
              .pipe(map(response => {
                  return response;
              }));
  }
    getDisciplina(ID: string){
      const url = `http://localhost:3000/api/disciplina/infodisciplina/${ID}`;
      return this.http.get<any>(url)
              .pipe(map(response => {
                  return response;
              }));
  }
  getDisciplinaLink(ID: string){
      const url = `http://localhost:3000/api/disciplina/linksdisciplina/${ID}`;
      return this.http.get<any>(url)
              .pipe(map(response => {
                  return response;
              }));
  }
  getDisciplinaConteudo(ID: string){
    const url = `http://localhost:3000/api/disciplina/conteudodisciplina/${ID}`;
    return this.http.get<any>(url)
            .pipe(map(response => {
                return response;
            }));
}
criaConteúdo(ID: string,titulo: string,conteudo: string){
  return this.http.post<any>("http://localhost:3000/api/disciplina/criaconteudo", { ID, titulo, conteudo })
  .pipe(map(response => {
      return response;
  }));
}
atualizaLink(ID:string, link:string){
  return this.http.post<any>("http://localhost:3000/api/disciplina/crialink", { ID, link })
  .pipe(map(response => {
      return response;
  }));
}
atualizaDisponibilidade(Data: String, ID: string){
  return this.http.post<any>("http://localhost:3000/api/disciplina/disponibilidade", { ID, Data })
  .pipe(map(response => {
      return response;
  }));
}

getDisciplinasAno(ID:string){
    const url = `http://localhost:3000/api/disciplina/disciplinasano/${ID}`;
    return this.http.get<any>(url)
            .pipe(map(response => {
                return response;
            }));
}

subscreveDisciplina(UserID:string,DisciplinaID:string){
  return this.http.post<any>("http://localhost:3000/api/disciplina/subscrevedisciplina", { UserID, DisciplinaID })
  .pipe(map(response => {
      return response;
  }));
}

getminhasDisciplinas(ID:string){
  const url = `http://localhost:3000/api/disciplina/minhasdisciplinas/${ID}`;
  return this.http.get<any>(url)
          .pipe(map(response => {
              return response;
          }));
}

getthisDisciplina(ID: string){
  const url = `http://localhost:3000/api/disciplina/thisdisciplinas/${ID}`;
  return this.http.get<any>(url)
          .pipe(map(response => {
              return response;
          }));
}

getDisponibilidades(ID: string){
  const url = `http://localhost:3000/api/disciplina/disponibilidades/${ID}`;
  return this.http.get<any>(url)
          .pipe(map(response => {
              return response;
          }));
}

getExplicadores(ID: string){
  const url = `http://localhost:3000/api/disciplina/explicadores/${ID}`;
  return this.http.get<any>(url)
          .pipe(map(response => {
              return response;
          }));
}

adicionarAula(IDUSER: string, IDDisc: string){
  return this.http.post<any>("http://localhost:3000/api/disciplina/adicionaAula", { IDUSER, IDDisc })
  .pipe(map(response => {
      return response;
  }));
}

criaFeedback(ID: string, Feedback: String, Explicando: string){
  return this.http.post<any>("http://localhost:3000/api/disciplina/criarFeedback", { ID, Feedback, Explicando })
  .pipe(map(response => {
      return response;
  }));
}

}
