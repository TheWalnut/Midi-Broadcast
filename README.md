# Midi-Broadcast

Simple program that allows a user to start a server which broadcasts MIDI signals to clients

## Computational and Musical Components
With this broadcast system one can play midi at their home plugged in to their computer and someone else, anywhere in the world, can listen in real time to their production.  Other midi-message-independent factors can be changed, such as master volume, instrument, effects, etc.

## Technology/How it was created
On the backend this project is run using Node.js and AngularJS as the frontend.  Node offers a very quick and simple interface for a project like this.  Had this been any more than a PoC I would likely code using Java and the Java Sound API, as it is has much more to offer than this c++ midi wrapper.  The node library node-midi allows event-driven control, in which I send an event whenever a midi message (note on, note off) is received.  Socket.io allows for an open connection between the client and server, which is used to communicate these midi messages live.  When the message arrives at the client, MIDI.js is used to play the midi message, whether it be a note on or note off event.

At the start of the program, node will start a server on port 8000.  It will also prompt the user as to which midi device to listen for events.

## Dependencies
Dependencies can be installed via NPM. (Run npm install)
## Troubleshooting
The node-midi library has different dependencies for different operating systems. See the node-midi repo for dependencies on your OS.
