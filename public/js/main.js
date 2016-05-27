angular.module('app', [])
			.controller('mainCtrl', function($scope) {

				//Instantiate Variables
				$scope.channel = 0;
				$scope.time = new Date().getTime();
				$scope.messages = []
				$scope.effects = [{
						type: "MoogFilter",
						bufferSize: 4096,
						bypass: false,
						cutoff: 0.065,
						resonance: 3.5
					},{
						type: "PingPongDelay",
						wetLevel: 0.25,
						feedback: 0.3,
						delayTimeLeft: 200,
						delayTimeRight: 200
					},{
						type: "Bitcrusher",
						bits: 6,
						normfreq: 0.2,
						bufferSize: 1024
					}]
				$scope.instruments = ["acoustic_grand_piano", "xylophone", "trumpet", "synth_drum", "recorder", "overdriven_guitar"];


				//Set up MIDI
				MIDI.loadPlugin({
					soundfontUrl: "./soundfont/",
					instruments: $scope.instruments,
					onsuccess: function() {
						MIDI.setVolume(0, 127);
						MIDI.chordOn(0, [60, 64, 67, 71, 72], 20, 0);
						MIDI.chordOff(0, [60, 64, 67, 71, 72], 1.25);
						console.log(new Date().getTime() - $scope.time);
					}
				});

				
				//Set up Socket.io
				var socket = io();
				//Events
				socket.on('noteOn', function(msg) {
					$scope.$apply($scope.noteOn(msg));
				})
				socket.on('noteOff', function(msg) {
					$scope.$apply($scope.noteOff(msg));
				})



				//Methods
				$scope.noteOn = function(msg) {
					var delay = 0;
					var note = msg[1]
					var velocity = msg[2]
					MIDI.noteOn($scope.channel, note + parseInt($scope.pitchShift), velocity, delay);
					$scope.messages.push(MIDI.noteToKey[msg[1]]);
					if ($scope.messages.length > 20)
						$scope.messages.shift()
				}

				$scope.noteOff = function(msg) {
					var delay = 0;
					var note = msg[1]
					var velocity = msg[2]
					MIDI.noteOff($scope.channel, note + parseInt($scope.pitchShift), delay)
				}

				$scope.setInstrument = function() {
					console.log($scope.instrument)
					MIDI.programChange($scope.channel, $scope.instrument)					
				}

				$scope.setVol = function() {
					MIDI.setVolume(0, $scope.vol)
				}

				$scope.updateEffects = function(effect) {
					effect.active = true;
					MIDI.setEffects([effect]);
				}

			})