/**
 * Nota model events
 */

import {EventEmitter} from 'events';
var Nota = require('../../sqldb').Nota;
var NotaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NotaEvents.setMaxListeners(0);

// Model events
var events = {
    afterCreate: 'save',
    afterUpdate: 'save',
    afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents() {
    for(var e in events) {
        let event = events[e];
        Nota.hook(e, emitEvent(event));
    }
}

function emitEvent(event) {
    return function(doc, options, done) {
        NotaEvents.emit(`${event}:${doc._id}`, doc);
        NotaEvents.emit(event, doc);
        done(null);
    };
}

registerEvents(Nota);
export default NotaEvents;
