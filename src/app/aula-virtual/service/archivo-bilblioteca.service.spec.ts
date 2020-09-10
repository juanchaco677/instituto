import { TestBed } from '@angular/core/testing';

import { ArchivoBilbliotecaService } from './archivo-bilblioteca.service';

describe('ArchivoBilbliotecaService', () => {
  let service: ArchivoBilbliotecaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivoBilbliotecaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
