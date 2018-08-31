import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Nota {
    name: string;
    body: string;
    tipoNota: string;
}

@Component({
  selector: 'nota-detail',
  templateUrl: './nota-detail.component.html',
  styleUrls: [ './nota-detail.component.css' ]
})
export class NotaDetailComponent implements OnInit {


    @Input() eNota: Nota;

  SocketService;
    notaEdit;

    static parameters = [HttpClient ];
    constructor( private http: HttpClient ) {
        this.http = http;
    }

    ngOnInit() {
        this.editNota(this.eNota);
        /*return this.http.get('/api/notas/:id')
            .subscribe((nota: Nota[]) => {
                this.notaEdit = nota;
        });*/
    }
    /*
    getNota(id: number): Observable<Nota> {
        return of(NOTAS.find(nota => nota.id === id));
    }
  } */

  editNota(nota) {
    return this.http.get(`/api/notas/${nota._id}`)
        .subscribe(() => {
            console.log('detail Nota');
        });
}
}
