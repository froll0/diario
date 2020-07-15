import config from './config';

export default class {
    constructor () {
        this.dictionary = new Array("IT", "EN");

        this.dictionary["IT"].push({
            error: "ERRORE: ",
            invalidInput: "variabili errate."
        });
        this.dictionary["EN"].push({
            error: "ERROR: ",
            invalidInput: "wrong variables."
        });

        this.settings = new config();
    }

    currLang = this.dictionary[this.settings._LANG];
}