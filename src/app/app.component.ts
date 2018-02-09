import { Component, ChangeDetectorRef } from '@angular/core';
declare var window: any;
@Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
})
export class AppComponent {
        title = 'app';
        speech: any;
        textValue: any = '';
        constructor(private _cdRef: ChangeDetectorRef) {
                try {
                        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                        this.speech = new SpeechRecognition();
                        this.initEvents();
                }
                catch (e) {
                        console.error(e);
                }
        }
        initEvents() {
                this.speech.onresult = (event) => {
                        const current = event.resultIndex;
                        this.textValue = event.results[current][0].transcript;
                        this._cdRef.detectChanges();
                        this.readOutLoud(this.textValue);
                };
        }
        startRecording() {
                this.speech.start();
        }
        stop() {
                this.speech.stop();
        }
        readOutLoud(message) {
                try {
                        const speech = new SpeechSynthesisUtterance();

                        // Set the text and voice attributes.
                        speech.text = message;
                        speech.volume = 1;
                        speech.rate = 1;
                        speech.pitch = 1;

                        window.speechSynthesis.speak(speech);
                }
        }
}
