import { Component, OnInit } from '@angular/core';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

  constructor() { }
  editor: any;
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
    // "editor" is the id in html
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.editor.session.setMode("ace/mode/java");
    // set the java
    this.editor.setValue(this.defaultContent["Java"]);
  }

}
