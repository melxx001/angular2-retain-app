import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http'
import { App, providers } from './app';
import { Main, NotesContainer } from './app/containers';
import { AppBar, NoteCard, NoteCreator, ColorPicker } from './app/ui';

@NgModule({
    declarations: [
        App,
        Main,
        AppBar,
        NoteCard,
        NotesContainer,
        NoteCreator,
        ColorPicker
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers,
    bootstrap: [
        App
    ]
})
export class AppModule {};

platformBrowserDynamic().bootstrapModule(AppModule);
