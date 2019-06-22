# Forgotten

#### A retro-styled 2D platformer game built in Phaser 3

![](forgotten_screenshot.png)

#### Preamble

This is a short platformer game that I made for two main reasons:

1. To work out how to use [Phaser 3](https://phaser.io/phaser3)

2. To understand what Webpack is

I find that I am much more *au fait* with both technologies now, and I have learnt a lot. It is only a short game, but I tried to fill it with all the standard platformer staples. I got to play with particle effects and compile HTML templates. 

#### Installation & use

Download everything, and then run "npm install" from the command line in the relevant place. 

- "npm run build" will pack all the source files together and output a playable game in /dist

- "npm run serve" will start a dev server so you can make changes and watch them appear immediately at localhost:8080

Webpack does everything automatically, so you only need the contents of /dist to actually play it. There is, of course, a playable version [here](https://peritract.github.io/forgotten).

#### Playing

- Arrow keys to control the blob
- Space to move on from menus
- M to mute/unmute

Collect coins, lives and keys as you navigate through 8 levels displaying the various available mechanics. There is wall-jumping, if you're into that kind of thing.

#### Adding levels

Currently there are only eight levels, but it is easy to add more. Build your own using [Tiled](https://www.mapeditor.org) and the base_level file in /src/assets/levels. Name it level_[next number] and then increment the max_level counter in /src/scripts/scenes/BootScene.js and the last level before victory in /src/scripts/scenes/LevelScene.js. Once you've done that and repackaged everything, it should pick up those levels automatically and add them onto the end.

Actually constructing working levels is somewhat harder. Mostly, you want to edit the midground layer, as that contains all the things the player interacts with. Foreground and background displaying in front of and behind the player respectively. The game populates the level with objects determined by the midground tiles, so just drop in what you want to appear. For animated things, the first image is the trigger for the in-game object.

#### Credits

- Designed and developed by me, [Dan Keefe](https://peritract.github.io)
- Graphics by [Safwyl](https://safwyl.itch.io/oubliette-tileset)
- Sound by [Luke.RUSTLD](https://opengameart.org/content/10-8bit-coin-sounds) & [Sauer2](https://opengameart.org/content/dark-8bit-song)

#### Comments and Criticism

Please do get in touch if you love/hate it, or if you've made a bunch of new levels and would like them added to the main game. 
