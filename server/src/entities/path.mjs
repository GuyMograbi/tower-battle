import { v4 as uuidv4 } from 'uuid';

export class Path {
     constructor({castle1, castle2}) {
         this._id = uuidv4();
         this._castle1 = castle1;
         this._castle2 = castle2;
     }

     get id() {
         return this._id;
     }

     get castle1 () {
         return this._castle1;
     }

     get castle2 () {
         return this._castle2;
     }

     toJSON() {
         return {
             id: this.id,
             castle1: { id: this.castle1.id},
             castle2: { id: this.castle2.id},
         }
     }
}
