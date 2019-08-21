import * as PIXI from 'pixi.js';
import { Application} from 'pixi.js';
import PixiFps from 'pixi-fps';

const loader = new PIXI.Loader();

const cardFrames = [ 
    "/res/card1.png",
    "/res/card2.png",
    "/res/card3.png",
    "/res/card4.png",
    "/res/card5.png",
    "/res/card6.png",
];


class Game {
  private app: Application;
  
  private cards:PIXI.Sprite[];
  constructor() {
 

    // instantiate app
    this.app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb // light blue
    });
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
 
    // create view in DOM
 
    document.body.appendChild(this.app.view);


    // preload needed assets
  
   loader.load(this.loadAssets.bind(this)); 
 
 //launch the app
   loader.load(this.setup.bind(this));
  
  }

  loadAssets():void
  {
   loader.add(cardFrames);
  }

  setup(): void {

  this.cards=[];
    
  for(var i=0;i<144;i++)
  {
  	var _rand=Math.floor((Math.random() * 6));
    
    let cat = new PIXI.Sprite(loader.resources[cardFrames[_rand]].texture);
  
 
    this.app.stage.addChild(cat);

    if(i<120)
    {
	    cat.y = 300;
	    cat.x = 100;
    }
    else
    {
	    cat.y = 300-((i+5)-120);
	    cat.x = 100+((i+5)-120);
    }
 
    this.cards.push(cat);
 
  }  
  console.log(this.cards.length); 
  
  
    const fpsCounter = new PixiFps();
    console.log("here");
    this.app.stage.addChild(fpsCounter);
    fpsCounter.y = 0;
    fpsCounter.x=0;
  }


}

new Game();

