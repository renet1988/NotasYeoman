/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newNota;

describe('Nota API:', function() {
    describe('GET /api/notas', function() {
        var notas;

        beforeEach(function(done) {
            request(app)
                .get('/api/notas')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    notas = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function() {
            notas.should.be.instanceOf(Array);
        });
    });

    describe('POST /api/notas', function() {
        beforeEach(function(done) {
            request(app)
                .post('/api/notas')
                .send({
                    name: 'Nuevo Name',
                    body: 'Este es el cuerpo de  la nota',
                    tipoNota: 'Este es el tipo de nota'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    newNota = res.body;
                    done();
                });
        });

        it('should respond with the newly created nota', function() {
            newNota.name.should.equal('Nuevo Name');
            newNota.body.should.equal('Este es el cuerpo de  la nota');
            newNota.tipoNota.should.equal('Este es el tipo de nota');
        });
    });

    describe('GET /api/notas/:id', function() {
        var nota;

        beforeEach(function(done) {
            request(app)
                .get(`/api/notas/${newNota._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    nota = res.body;
                    done();
                });
        });

        afterEach(function() {
            nota = {};
        });

        it('should respond with the requested nota', function() {
            nota.name.should.equal('Nueva Nota');
            nota.body.should.equal('Este es el cuerpo de  la nota');
            nota.tipoNota.should.equal('Este es el tipo de nota');
        });
    });

    describe('PUT /api/notas/:id', function() {
        var updatedNota;

        beforeEach(function(done) {
            request(app)
                .put(`/api/notas/${newNota._id}`)
                .send({
                    name: 'Updated Nota',
                    body: 'This is the updated nota!!!',
                    tipoNota: 'Updated tipo de nota'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if(err) {
                        return done(err);
                    }
                    updatedNota = res.body;
                    done();
                });
        });

        afterEach(function() {
            updatedNota = {};
        });

        it('should respond with the updated nota', function() {
            updatedNota.name.should.equal('Updated Nota');
            updatedNota.body.should.equal('This is the updated nota!!!');
            updatedNota.body.should.equal('Updated tipo de nota');
        });

        it('should respond with the updated nota on a subsequent GET', function(done) {
            request(app)
                .get(`/api/notas/${newNota._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    let nota = res.body;

                    nota.name.should.equal('Updated Nota');
                    nota.body.should.equal('This is the updated nota!!!');
                    nota.tipoNota.should.equal('Updated tipo de nota');

                    done();
                });
        });
    });

    describe('PATCH /api/notas/:id', function() {
        var patchedNota;

        beforeEach(function(done) {
            request(app)
                .patch(`/api/notas/${newNota._id}`)
                .send([
                    { op: 'replace', path: '/name', value: 'Patched Nota' },
                    { op: 'replace', path: '/body', value: 'This is the patched nota!!!' },
                    { op: 'replace', path: '/tipoNota', value: 'Patched tipo Nota' }
                ])
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if(err) {
                        return done(err);
                    }
                    patchedNota = res.body;
                    done();
                });
        });

        afterEach(function() {
            patchedNota = {};
        });

        it('should respond with the patched nota', function() {
            patchedNota.name.should.equal('Patched Nota');
            patchedNota.body.should.equal('This is the patched nota!!!');
            patchedNota.tipoNota.should.equal('Patched tipo Nota');
        });
    });

    describe('DELETE /api/notas/:id', function() {
        it('should respond with 204 on successful removal', function(done) {
            request(app)
                .delete(`/api/notas/${newNota._id}`)
                .expect(204)
                .end(err => {
                    if(err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when nota does not exist', function(done) {
            request(app)
                .delete(`/api/notas/${newNota._id}`)
                .expect(404)
                .end(err => {
                    if(err) {
                        return done(err);
                    }
                    done();
                });
        });
    });
});
