import { Component, OnInit } from '@angular/core';
import { CollaborationService } from '../../services/collaboration.service';
import { ActivatedRoute, Params } from '@angular/router';

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

  constructor(private collaboration: CollaborationService,
              private route: ActivatedRoute) { }

  defaultContent = {
    'Java': `public class Example {
      public static void main(String[] args) {
        // Type your Java code here.
      }
    }`,
    'Python': `class solution:
      def example():
        # write your python code here.
    `
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

    //setup collaboration socket;
    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    //register change callback
    this.editor.on("change", e => {
      console.log('editor changes:' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }

    })
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

  submit(): void {
    let user_code = this.editor.getValue();
    console.log(user_code);
  }

}
