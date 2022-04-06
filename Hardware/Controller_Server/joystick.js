// /**
//  * Code used to control Hardware Components
//  * Connects Joystick, Button, and Buzzer to Arduino Node application using Johnny Five
//  * Reads data over websocket connected to server running controller node application
//  */

// // Initializing component variables
// const { Board, Joystick } = require('johnny-five')
// const board = new Board()

// // Intializing global connection variable
// var five = require("johnny-five"),
//   button;

// // Checks for the successful connection of the Arduino Board
// board.on('ready', () => {
//   button = new five.Button(2)
//   var piezo = new five.Piezo(3);
//   const joystick = new Joystick({
//     pins: ['A0', 'A1']
//   })

//   // Injects data stream directly into board for faster access
//   board.repl.inject({
//     button: button,
//     piezo: piezo
//   });

//   // Initializing WebSocket
//   const WebSocket = require('ws')
//   const wss = new WebSocket.Server({ port: '8085' })
//   // const wss = new WebSocket.Server('ws://http://10.93.48.143')

//   wss.on('connection', ws => {
//     ws.on('message', message => {
//       console.log(`Received message => ${message}`)
//     })

//     button.on("down", function() {
//       console.log("Enter");
//       ws.send('Enter')
//       // piezo.play({
        
//       //   song: "C A",
//       //   beats: 1 / 4,
//       //   tempo: 100
//       // });
//     });
  
//     // "hold" the button is pressed for specified time.
//     //        defaults to 500ms (1/2 second)
//     //        set
//     button.on("hold", function() {
//       console.log("hold");
//     });
  
//     // "up" the button is released
//     button.on("up", function() {
//       console.log("up");
//       ws.send('still')
//     });

//     joystick.on('change', function() {
//       // console.log(this.x)
//       // console.log(this.y)
//       if (this.x > 0.5) {
//         console.log('->')
//         // ws.send('right')
//         ws.send('down')
//       }
//       if (this.x < -0.5) {
//         console.log('<-')
//         // ws.send('left')
//         ws.send('up')
//       }
//       if (this.x > -0.5 && this.x < 0.5 ) {
//         // console.log('still')
//         ws.send('still')
//       }
//       if (this.y > 0.5) {
//         console.log('down')
//         // ws.send('down')
//         ws.send('left')
//       }
//       if (this.y < -0.5) {
//         console.log('up')
//         ws.send('up')
//         ws.send('right')
//       }
//     })
//   })
// })