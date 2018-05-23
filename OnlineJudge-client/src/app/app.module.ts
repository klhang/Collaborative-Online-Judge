import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataService } from './services/data.service';
import { routing } from './app.routes';

import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchInputService } from './services/search-input.service';
import { SearchPipe } from './pipes/search.pipe';
import { HttpClientModule } from '@angular/common/http';
import { EditorComponent } from './components/editor/editor.component';

import { CollaborationService } from './services/collaboration.service';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavBarComponent,
    SearchPipe,
    EditorComponent,

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    FormsModule,
      ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    CollaborationService,
    SearchInputService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
