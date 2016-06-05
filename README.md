# Midi-Broadcast

Simple program that allows a user to start a server which broadcasts MIDI signals to clients

##Computational and Musical Components
This project combines computation and music in a distinct way.  With this broadcast system one can play midi at their home plugged in to their computer and someone else, anywhere in the world, can listen in real time to their production.  There is a huge variety of applications that can be had with this technology.  One such application could be teaching, and because this is using the MIDI protocol, note names and octaves (C4) are saved and displayed to the user.  Other midi-message-independent factors can be changed as well, such as master volume, instrument, effects, etc.

The concept is to collaborate musically in real-time, regardless of physical limitations such as location.  With a wifi connection it is just as good as jamming with someone in the same room.

##Technology/How it was created
On the backend this project is run using Node.js as the backend and AngularJS as the frontend.  Node offers a very quick and simple interface for a project like this.  Had this been any more than a PoC I would likely code using Java and the Java Sound API, as it is has much more to offer than this c++ midi wrapper  The node library node-midi allows event-driven control, in which I send an event whenever a midi message (note on, note off) is received.  Socket.io allows for an open connection between the client and server, which is used to communicate these midi messages live.  When the message arrives at the client, MIDI.js is used to play the midi message, whether it be a note on or note off event.

At the start of the program, node will start a server on port 8000.  It will also prompt the user as to which midi device to listen for events.

**Powerpoint is attached as CS480Final.key



##Dependencies
Dependencies can be installed via NPM. (Run npm install)
###Troubleshooting
The node-midi library has different dependencies for different operating systems. See the node-midi repo for dependencies on your OS.
