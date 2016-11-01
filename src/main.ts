import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http'
import { App, providers } from './app';
import { Main, NotesContainer, About } from './app/containers';
import { routes } from './app/routes';
import { AppBar, NoteCard, NoteCreator, ColorPicker } from './app/ui';

@NgModule({
    declarations: [
        App,
        Main,
        AppBar,
        NoteCard,
        NotesContainer,
        NoteCreator,
        ColorPicker,
        About
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routes
    ],
    providers,
    bootstrap: [
        App
    ]
})
export class AppModule {};

platformBrowserDynamic().bootstrapModule(AppModule);
