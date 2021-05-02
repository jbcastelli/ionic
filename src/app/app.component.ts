import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Componentes } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  componentes: Observable<Componentes[]>;

  constructor(
    private dataService: DataService,
    private pushService: PushService
    ) { }

  ngOnInit() {
    this.pushService.configInicial();
    this.componentes = this.dataService.getMenuOpciones();
  }
}
