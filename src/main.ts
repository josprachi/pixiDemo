import * as PIXI from 'pixi.js';
import { Application, loader } from 'pixi.js';
import PixiFps from 'pixi-fps';

//import { Character } from '@app/character.class';
class Game {
  private app: Application;
  constructor() {
  const loader = new PIXI.Loader();

    // instantiate app
    this.app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb // light blue
    });

    // create view in DOM
    document.body.appendChild(this.app.view);

    // preload needed assets
  
    // then launch app
   loader.load(this.setup.bind(this));
  
  }

  setup(): void {
    // append hero
   console.log("hello world"); 
  /*  const hero = new Character(loader.resources['samir'].texture);
    const heroSprite = hero.sprite;
    this.app.stage.addChild(heroSprite);
    heroSprite.y = 300;

    //  animate hero
    let moveLeft = true;
    this.app.ticker.add(() => {
      const speed = 2;
      if (heroSprite.x < this.app.view.width && moveLeft) {
        heroSprite.x += speed;
      } else {
        heroSprite.x -= speed;
        moveLeft = heroSprite.x <= 0;
      }
    });
    */
  const fpsCounter = new PixiFps();
  console.log("here");
  this.app.stage.addChild(fpsCounter);
   fpsCounter.y = 0;
   fpsCounter.x=0;

  }


}

new Game();


/*import * as PIXI from "pixi.js";

//Create the renderer
var renderer = PIXI.autoDetectRenderer(256, 256);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();

//Tell the `renderer` to `render` the `stage`
renderer.render(stage);
*/