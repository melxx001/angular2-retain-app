import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { StoreHelper } from './store-helper';
import {Store} from "../store";

@Injectable()
export class NoteService {
    path: string = '/notes';
    constructor(private api: ApiService, private storeHelper: StoreHelper) {}

    createNote(note) {
        return this.api.post(this.path, note).do(savedNote => this.storeHelper.add('notes', savedNote));
    }

    getNotes() {
        return this.api.get(this.path).do((response: any) => this.storeHelper.update('notes', response.data));
    }

    completeNote(note) {
        return this.api.delete(`${this.path}/${note.id}`).do((res: any) => this.storeHelper.findAndDelete('notes', res.id));
    }

}
