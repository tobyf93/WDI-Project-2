Drawsome:
=========

Contents:
---------

- Introduction and Background
- Versions
- User Guide
- Testing
- Related Resources
- Future Considerations 

1. Introduction and Background
------------------------------

Drawsome is the brainchild of four bright-eyed General Assembly Web Development Immersive students: Toby, Michael, Reena and Charles. Drawsome is a game designed for 3-8 players which features real-time HTML5 Canvas drawing in a pictionary styled game. 

In an attempt to learn more about web sockets, responsive design, HTML5 Canvas and different rails gems, Drawsome allowed us to combine these features to make a clone of one of our favorite games, Drawful by Jackful games.

The project is built using websockets, paper.js for the canvas element ,rails and backbone and uses timer.js javascript library for timers 

2. Version
----------

v1.0 
####

The first version of this software will allow for a single game to be played with 3-8 players. There will be a chat window for communication and real-time drawing using websockets.

3. User Guide
-------------

Please Note: To play Drawsome, users are required to create an account on the drawsome.heroku.com website.

After signing in, users are automatically taken to a lobby screen where they wait for other players. This screen will automatically update when players join or leave the game and when players update their status to ready.

In order for a game to begin, there must be at least 3 players and every active player must have marked themselves as ready. Once this condition has been met, the game will begin automatically.

4. Testing
-----------

The game is tested with a couple of playgroups. There is no test suite for this projet .

5. Resources Used
------------------

http://websocket-rails.github.io - websockets 

http://paperjs.org  - paperjs for the canvas part

http://backbonejs.org - backbone

http://underscorejs.org - underscore

https://jquery.com - jquery

https://github.com/husa/timer.js/ - timer.js

6. Future Considerations
-------------------------

Update the design 
cleaner code 
support for multiple games
reset the game
extended color palatte
mouse scroll shortcut for brush resize
canvas anti-aliasing
saving and sharing the image
chat across multiple rounds



