/**
 * Initializes the game
 * Establishes connection to the webscoket
 */

(function(){
    //URL to establish conncetion to
    // const url = 'ws://10.33.34.32:8085'
    // connection = new WebSocket(url)
    // connection2 = new WebSocket(url)
    // connection3 = new WebSocket(url)
    // connection4 = new WebSocket(url)

    // connection.onerror = error => {
    //     console.error(error)
    // }
    // Defining world container that holds the game
    const world = new pyworld({
        element: document.querySelector(".rpg-container")
    });
    // Start the game
    world.init();

})();