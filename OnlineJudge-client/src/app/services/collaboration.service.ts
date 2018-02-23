import { Injectable } from '@angular/core';

declare var io: any;

@Injectable()
export class CollaborationService {
  collaborationSocket: any;

  constructor() { }

  //take two params
  init(editor: any, sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, {query: 'sessionId=' + sessionId});

    //handle the cahnges sent from server
    this.collaborationSocket.on('change',(delta:string) => {
      console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      // apply the changes on editor
      editor.getSession().getDocument().applyDeltas([delta]);
    })
  }

  //emit event to make changes and inform server and other collaborators
  change(delta: string): void {
    //emit change envent
    this.collaborationSocket.emit("change", delta);
  }

  restoreBuffer(): void {
    this.collaborationSocket.emit("restoreBuffer");
  }

}
