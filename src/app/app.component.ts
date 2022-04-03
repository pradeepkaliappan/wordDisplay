import { Component } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ServerService } from './server.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  words: any[] = [];
  wordValue:any;
  hide:any;
  newWord:any;
  displaySectionHide:any;
  hideInput1:any;
  hideLabel1:any;
  Id:any;
  updatedWord:any;
  hideEdit1:any;
  hideSave1:any;
  hideInput: any[] = [];
  hideLabel: any[] = [];
  hideEdit: any[] = [];
  hideSave: any[] = [];
  

  currentEvent: any = { word: ''};

  constructor(@Inject(DOCUMENT) public document: Document,
    private server: ServerService) { }

    ngOnInit() {
      this.hide="hidden"; 
      this.displaySectionHide="";
      this.getEvents();
      // this.hideInput = "hidden";
      // this.hideLabel = "";
      // this.hideEdit="";
      // this.hideSave="hidden";
    }

  title = 'wordDisplay';
  inputValue = '';


  editWord(id:any){
      console.log('id'+id);
      $('#hideInput_'+id).removeClass('hidden');
      $('#hideLabel_'+id).addClass('hidden');
      $('#hideEdit_'+id).addClass('hidden');
      $('#hideSave_'+id).removeClass('hidden');
  };
  saveWord(id:any){
    this.newWord = this.updatedWord;
    this.Id = id;
    this.updateEvent();
  };

  showNewMode(){
    this.hide="";
    this.newWord="";
    //this.displaySectionHide="hidden";
  }

  updateEvent() {
    const newEvent = {
      word: this.newWord,
      Id:this.Id
    };
    this.server.updateEvent(newEvent).then(() => {
      this.getEvents();
      // this.hideInput="hidden";
      // this.hideLabel="";
      // this.hideEdit="";
      // this.hideSave="hidden";
    });
  }



  createEvent() {
    const newEvent = {
      word: this.newWord,
    };
    this.server.createEvent(newEvent).then(() => {
      this.getEvents();
    });
  }

  deleteWord(id:any){
    this.Id = id;
    const newEvent = {
      Id:  this.Id,
    };
    this.server.deleteEvent(newEvent).then(() => {
      this.getEvents();
    });
  }


  private getEvents() {
    this.hide="hidden"; 
    this.displaySectionHide = "";
    this.server.getEvents().then((response: any) => {
      console.log('Response', response);
      this.words = response.map((ev:any) => {
        ev.Id = ev.ID;
        ev.Value = ev.value;
       
        return ev;
      });
    });
  }
}
