import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../../components/socket/socket.service';

interface Nota {
    name: string;
    body: string;
    tipoNota: string;
}

@Component({
    selector: 'main',
    template: require('./main.html'),
    styles: [require('./main.css')],
})
export class MainComponent implements OnInit, OnDestroy {
    SocketService;
    awesomeNotas: Nota[] = [];
    name = '';
    body = '';
    tipoNota = '';
    newNota = [
        this.name,
        this.body,
        this.tipoNota
    ];

    static parameters = [HttpClient, SocketService];
    constructor(private http: HttpClient, private socketService: SocketService) {
        this.http = http;
        this.SocketService = socketService;
    }

    ngOnInit() {
        return this.http.get('/api/notas')
            .subscribe((notas: Nota[]) => {
                this.awesomeNotas = notas;
                this.SocketService.syncUpdates('nota', this.awesomeNotas);
            });
    }

    ngOnDestroy() {
        this.SocketService.unsyncUpdates('nota');
    }

    addNota() {
        if(this.newNota) {
            let textName = this.name;
            let textBody = this.body;
            let textTipoNota = this.tipoNota;
            this.newNota = [];

            return this.http.post('/api/notas', { name: textName, body: textBody, tipoNota: textTipoNota })
                .subscribe(nota => {
                    console.log('Added Nota:', nota);
                });
        }
    }

    deleteNota(nota) {
        return this.http.delete(`/api/notas/${nota._id}`)
            .subscribe(() => {
                console.log('Deleted Nota');
            });
    }
}
