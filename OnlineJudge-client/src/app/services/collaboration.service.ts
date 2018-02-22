import { Injectable } from '@angular/core';

declare var io: any;

@Injectable()
export class CollaborationService {
  collaborationSocket: any;

  constructor() { }

  init(editor: any, sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, {query: 'message=haha'});

    this.collaborationSocket.on('message',(message) => {
      console.log('message received from the server: ' + message);
    })
  }

}
