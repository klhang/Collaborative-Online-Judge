import { Component, OnInit } from '@angular/core';
import { CollaborationService } from '../../services/collaboration.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs/Subscription';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  editor: any;
  languages: string[] = ['Java', 'Python'];
  language: string = 'Java';

  sessionId: string;
  output: string = ""; //for storing the build and run output

  userList: string[];
  users: string;
  subscriptionUsers: Subscription;

  constructor(private collaboration: CollaborationService,
              private route: ActivatedRoute,
              private dataService: DataService) { }

  defaultContent = {
    'Java': `public class Example {
      public static void main(String[] args) {
        // Type your Java code here.
      }
    }`,
    'Python': `# write your python code here.`
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.initEditor();
      this.collaboration.restoreBuffer();
    })
  }

  initEditor(): void {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();

    // setup collaboration socket
    this.subscriptionUsers = this.collaboration.init(this.editor, this.sessionId)
      .subscribe(users => this.users = users);


    this.editor.lastAppliedChange = null;

    //register change callback
    this.editor.on("change", e => {
      console.log('editor changes:' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }

    })

    // if(this.users != null){
    //   this.userList = this.users.split("");
    // }
  }

  resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode(
      "ace/mode/" + this.language.toLowerCase()
    )
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  // submit
  submit(): void {
    let user_code = this.editor.getValue();
    console.log(user_code);
    // create object that contains user's code and language
    const data = {
      user_code: user_code,
      lang: this.language.toLocaleLowerCase()
    };

    // send the data to server
    // build and run return a Promise
    this.dataService.buildAndRun(data)
      .then(res => {
        this.output = res;
        console.log(this.output);
      });
  }

}
