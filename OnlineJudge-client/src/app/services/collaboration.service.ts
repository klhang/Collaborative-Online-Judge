import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

declare var io: any;

@Injectable()
export class CollaborationService {
  collaborationSocket: any;
  private _userSource = new Subject<string>();

  constructor() { }

  //take two params
  init(editor: any, sessionId: string): Observable<string>  {
    this.collaborationSocket = io(window.location.origin, {query: 'sessionId=' + sessionId});

    //handle the cahnges sent from server
    this.collaborationSocket.on('change',(delta:string) => {
      console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      // apply the changes on editor
      editor.getSession().getDocument().applyDeltas([delta]);
    })

    this.collaborationSocket.on("userchange", (data: string[]) => {
      console.log('collaboration: user changes ' + data);

      this._userSource.next(data.toString());
    });

    return this._userSource.asObservable();
  }

  //emit event to make changes and inform server and other collaborators
  change(delta: string): void {
    //emit change envent
    this.collaborationSocket.emit("change", delta);
  }

  // send restoreBuffer request to server
  restoreBuffer(): void {
    this.collaborationSocket.emit("restoreBuffer");
  }

}
