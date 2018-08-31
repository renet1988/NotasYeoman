import {
    async,
    ComponentFixture,
    inject,
    TestBed,
} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../components/socket/socket.service';
import { SocketServiceStub } from '../../components/socket/socket.mock';
import { MainComponent } from './main.component';

describe('Component: MainComponent', function() {
    let comp: MainComponent;
    let fixture: ComponentFixture<MainComponent>;
    let httpTestingController: HttpTestingController;
    const mockNotas = ['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express'];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                TooltipModule.forRoot(),
                HttpClientTestingModule,
            ],
            declarations: [ MainComponent ], // declare the test component
            providers: [
                { provide: SocketService, useClass: SocketServiceStub },
            ],
        }).compileComponents();

        httpTestingController = TestBed.get(HttpTestingController);
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(MainComponent);
        // MainComponent test instance
        comp = fixture.componentInstance;

        /**
         * Trigger initial data binding and run lifecycle hooks
         */
        fixture.detectChanges();
    }));

    it('should attach a list of notas to the controller', () => {
        // `GET /api/notas` should be made once
        const req = httpTestingController.expectOne('/api/notas');
        expect(req.request.method).toEqual('GET');

        // Respond with mock data
        req.flush(mockNotas);

        // assert that there are no outstanding requests
        httpTestingController.verify();

//expect(comp.awesomeNotas).toEqual(mockNotas);
    });
});
