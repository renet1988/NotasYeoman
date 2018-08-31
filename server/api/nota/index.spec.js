/* globals sinon, describe, it */
/* expect */

var proxyquire = require('proxyquire').noPreserveCache();

var notaCtrlStub = {
    index: 'notaCtrl.index',
    show: 'notaCtrl.show',
    create: 'notaCtrl.create',
    upsert: 'notaCtrl.upsert',
    patch: 'notaCtrl.patch',
    destroy: 'notaCtrl.destroy'
};

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
};

// require the index with our stubbed out modules
var notaIndex = proxyquire('./index.js', {
    express: {
        Router() {
            return routerStub;
        }
    },
    './nota.controller': notaCtrlStub
});

describe('Nota API Router:', function() {
    it('should return an express router instance', function() {
        notaIndex.should.equal(routerStub);
    });

    describe('GET /api/notas', function() {
        it('should route to nota.controller.index', function() {
            routerStub.get
                .withArgs('/', 'notaCtrl.index')
                .should.have.been.calledOnce;
        });
    });

    describe('GET /api/notas/:id', function() {
        it('should route to nota.controller.show', function() {
            routerStub.get
                .withArgs('/:id', 'notaCtrl.show')
                .should.have.been.calledOnce;
        });
    });

    describe('POST /api/notas', function() {
        it('should route to nota.controller.create', function() {
            routerStub.post
                .withArgs('/', 'notaCtrl.create')
                .should.have.been.calledOnce;
        });
    });

    describe('PUT /api/notas/:id', function() {
        it('should route to nota.controller.upsert', function() {
            routerStub.put
                .withArgs('/:id', 'notaCtrl.upsert')
                .should.have.been.calledOnce;
        });
    });

    describe('PATCH /api/notas/:id', function() {
        it('should route to nota.controller.patch', function() {
            routerStub.patch
                .withArgs('/:id', 'notaCtrl.patch')
                .should.have.been.calledOnce;
        });
    });

    describe('DELETE /api/notas/:id', function() {
        it('should route to nota.controller.destroy', function() {
            routerStub.delete
                .withArgs('/:id', 'notaCtrl.destroy')
                .should.have.been.calledOnce;
        });
    });
});
