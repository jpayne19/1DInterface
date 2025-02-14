
// This is where your state machines and game logic lives


class Controller {

    // This is the state we start with.
    constructor() {
        this.gameState = "PLAY";
       
    }
    
    // This is called from draw() in sketch.js with every frame
    update() {

        // STATE MACHINE ////////////////////////////////////////////////
        // This is where your game logic lives
        /////////////////////////////////////////////////////////////////
        switch(this.gameState) {

            // This is the main game state, where the playing actually happens
            case "PLAY":

                // clear screen at frame rate so we always start fresh      
                display.clear();
            
                // show all players in the right place, by adding them to display buffer
                display.setPixel(playerOne.position, playerOne.playerColor);
                display.setPixel(playerTwo.position, playerTwo.playerColor);
                

                // now add the target
                //display.setPixel(target.position, target.playerColor);

                
                // check if player has caught target
                if (playerOne.position == playerTwo.position)  {
                    playerOne.score++;              // increment score
                    this.gameState = "COLLISION";   // go to COLLISION state
                }
                
                // check if other player has caught target        
                //if (playerTwo.position == target.position)  {
                 //   playerTwo.score++;              // increment their score
                //    this.gameState = "COLLISION";   // go to COLLISION state
                //}

                //break;

            // This state is used to play an animation, after a target has been caught by a player 
            case "COLLISION":
    // Clear screen before rendering animation frame
    display.clear();

    // Get the current frame of the collision animation
    let frameToShow = collisionAnimation.currentFrame();  

    // Render the explosion animation frame
    for (let i = 0; i < collisionAnimation.pixels; i++) {
        display.setPixel(i, collisionAnimation.animation[frameToShow][i]);                    
    }

    // If the animation has finished, reset player positions and return to play state
    if (frameToShow >= collisionAnimation.animation.length - 1) {
        
        // Reset player positions to a random location
        playerOne.position = parseInt(random(0, displaySize));
        playerTwo.position = parseInt(random(0, displaySize));

        // Check if playerOne has won
        if (playerOne.score >= score.max) {
            score.winner = playerOne.playerColor;
            this.gameState = "SCORE";  
        } else {
            this.gameState = "PLAY";  
        }
    }
    break;


            // Game is over. Show winner and clean everything up so we can start a new game.
            case "SCORE":       
            
                // reset everyone's score
                playerOne.score = 0;
                playerTwo.score = 0;

                // put the target somewhere else, so we don't restart the game with player and target in the same place
                target.position = parseInt(random(1,displaySize));

                //light up w/ winner color by populating all pixels in buffer with their color
                display.setAllPixels(score.winner);                    

                break;

            // Not used, it's here just for code compliance
            default:
                break;
        }
    }
}




// This function gets called when a key on the keyboard is pressed
function keyPressed() {

    // Move player one to the left if letter A is pressed
    if (key == 'A' || key == 'a') {
        playerOne.move(-1);
      }
    
    // And so on...
    if (key == 'D' || key == 'd') {
    playerOne.move(1);
    }    

    if (key == 'J' || key == 'j') {
    playerTwo.move(-1);
    }
    
    if (key == 'L' || key == 'l') {
    playerTwo.move(1);
    }
    
    // When you press the letter R, the game resets back to the play state
    if (key == 'R' || key == 'r') {
    controller.gameState = "PLAY";
    }
  }