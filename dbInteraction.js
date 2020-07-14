import db from 'pouchdb';
import dictionary from './dictionary';

/**
 * Gestione DB con PouchDB
 * Author @froll0
 */
export default class {
    constructor () {
        this.connection = new PouchDB('diario');

        this.error = {
            generic: dictionary.error,
            invalidInput: this.error.generic + dictionary.invalidInput
        };
    }

    /**
     * Inserire un nuovo documento nel db passandogli gli argomenti e generando automaticamento l'id.
     * @param {*} args oggetto campi documento
     */
    insert (args) {
        if (typeof args === 'object' && args !== null) {
            this.connection.post(args).then(function (response) {
                if (response.ok === true) {
                    return {
                        status: 'success', 
                        id: response.id
                    };
                } else {
                    return false;
                }
            }).catch(function (err) {
                console.log(this.error.generic + err);
            });
        } else {
            console.log(this.error.invalidInput);
        }
    }

    /**
     * Aggiornamento del documento tramite ricerca id.
     * @param {*} id id del documento
     * @param {*} args oggetto campi del documento
     */
    update (id, args) {
        if (id !== null && (typeof args === 'object' && args !== null)) {
            this.connection.get(id).then(function (doc) {
                return db.put({
                    _id: id,
                    _rev: doc._rev,
                    title: args.title,
                    content: args.content,
                    date: args.date
                });
            }).then(function (response) {
                if (response.ok === true) {
                    return {
                        status: 'success',
                        id: response.id
                    };
                } else {
                    return false;
                }
            }).catch(function (err) {
                console.log(this.error.generic + err);
            });
        } else {
            console.log(this.error.invalidInput);
        }
    }

    /**
     * Ottenere un documento dato uno specifico id.
     * @param {*} id id del documento 
     */
    fetch (id) {
        if (id !== null) {
            this.connection.get(id).then(function (doc) {
                return doc;
            }).catch(function (err) {
                console.log(this.error.generic + err);
            });
        } else {
            console.log(this.error.invalidInput);
        }
    }

    fetchBy (args) {
        // ???
    }

    /**
     * Eliminare un determinato documento dato uno specifico id.
     * @param {*} id id del documento
     */
    delete (id) {
        if (id !== null) {
            let conn = this.connection;

            conn.get(id).then(function (doc) {
                return conn.remove(doc);
            }).then(function (response) {
                if (response.ok === true) {
                    return {
                        status: 'success',
                        id: response.id
                    };
                } else {
                    return false;
                }
            }).catch(function (err) {
                console.log(this.error.generic + err);
            });
        } else {
            console.log(this.error.invalidInput);
        }
    }
}