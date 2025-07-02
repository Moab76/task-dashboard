import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }            from './mocks/in-memory-data.service';
import { environment }                    from '../../environments/environment';

@NgModule({
  imports: [
    HttpClientModule,
    ...(environment.useMocks
      ? [ HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService,
            { dataEncapsulation: false, passThruUnknownUrl: true }
          ) ]
      : []
    ),
    // … outros imports do Core
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('CoreModule já foi carregado. Importe apenas no AppModule.');
    }
  }
}
