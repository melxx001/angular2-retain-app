import { Component } from '@angular/core';
import { NoteService } from '../services';

@Component({
    selector: 'notes-container',
    styles: [`
        .notes {
            padding-top: 50px;
        }
        .cell {
            padding-top: 15px;
        }
        .creator {
            margin-bottom: 40px; 
        }
    `],
    template: `
        <div class="row center-xs notes">
            <div class="col-xs-6 creator">
                <note-creator (createNote)="onCreateNote($event)"></note-creator>
            </div>
            <div class="notes col-xs-8">
                <div class="row">
                    <note-card 
                        class="col-xs-4 cell" 
                        [note]="note"
                        *ngFor="let note of notes"
                        (checked)="onNoteChecked($event)"
                    ></note-card>
                </div>
            </div>
        </div>
    `
})
export class NotesContainer {
    notes = [];

    constructor(private noteService: NoteService) {
        this.noteService.getNotes().subscribe(response => this.notes = response.data)
    }

    onNoteChecked(note) {
        this.noteService.completeNote(note).subscribe(note => {
            const i = this.notes.findIndex(localNote => localNote.id === note.id);
            this.notes.splice(i, 1);
        })
    }

    onCreateNote(note) {
        this.noteService.createNote(note).subscribe(note => this.notes.push(note));
    }
};
