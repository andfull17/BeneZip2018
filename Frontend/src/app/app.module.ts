import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { ElasticsearchService } from '../services/elasticsearch.service';
import { HttpClientModule } from '@angular/common/http';
import { PrincipalComponent } from './principal/principal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgMultiSelectDropDownModule
  ],
  providers: [ElasticsearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
