import * as PIXI from 'pixi.js';
import { Application} from 'pixi.js';
import PixiFps from 'pixi-fps';
import * as particles from 'pixi-particles';

const loader = new PIXI.Loader();
const cardFrames = [ 
    "/res/card1.png",
    "/res/card2.png",
    "/res/card3.png",
    "/res/card4.png",
    "/res/card5.png",
    "/res/card6.png",
];
const emotionStr = [ 
  "Very Good",
  "Awsome",
  "Nice",
  "Yuck",
  "Too Bad",
  "Go for it",
];
const emotionTexture = [ 
  "/res/Char1.png",
  "/res/Char2.png",
  "/res/Char3.png",
];
const coinTexture="/res/coin.png";
const prices = [ 10,23,54,1,44];
const MAINMENU=0;
const CARDMENU=1;
const BANNERMENU=2;
//const FIREMENU=3;

class Game {
  private app: Application;
  //mainmenu
  private CardsBtn:PIXI.Text;
  private TextComboBtn:PIXI.Text;
  private FireButton:PIXI.Text;
  private BackButton:PIXI.Text;
  
  //cardsStack
  private cards:PIXI.Sprite[];
  private cardCounter:number;
  private stack1Pos_x:number;
  private stack1Pos_y:number;
  private stack2Pos_x:number;
  private stack2Pos_y:number;

//textcombo
  private banner:any[];


//particles

  //miscellaneous
  private currentTime:number;
  private menuScene:PIXI.Container;
  private cardStack:PIXI.Container;
  private textCombo:PIXI.Container;
  private fireScene:PIXI.Container;
  private currentScreen:number;

  private cardTicker:PIXI.Ticker;
  private comboTicker:PIXI.Ticker;
  //private animationTicker:PIXI.Ticker;

  constructor() {
    // instantiate app
    this.app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb // light blue
    });
    
    //this.app.view.style.position = "absolute";
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
   // this.app.renderer.resize(window.innerWidth, window.innerHeight
    // create view in DOM
 
    document.body.appendChild(this.app.view);
    this.menuScene = new PIXI.Container();
    this.app.stage.addChild(this.menuScene);
    
    this.fireScene = new PIXI.ParticleContainer();//Container();
    this.app.stage.addChild(this.fireScene);
    this.cardStack = new PIXI.Container();
    this.cardStack.sortableChildren=true;
    this.app.stage.addChild(this.cardStack);
    this.textCombo = new PIXI.Container();
    this.app.stage.addChild(this.textCombo);

    

     this.currentTime=0.0;
     this.cardCounter=0;

     this.stack1Pos_x=window.innerWidth*0.1;
     this.stack1Pos_y=window.innerHeight*0.25;
     this.stack2Pos_x=window.innerWidth*0.5;
     this.stack2Pos_y=window.innerHeight*0.25;


     this.cardTicker=new PIXI.Ticker();
     this.comboTicker=new PIXI.Ticker();
    // preload needed assets
  
   loader.load(this.loadAssets.bind(this)); 
 
 //launch the app

   this.currentScreen=MAINMENU;
   loader.load(this.setup.bind(this));  
  }

  loadAssets():void
  {
   loader.add(cardFrames);
   loader.add(emotionTexture);
   loader.add(coinTexture);
  }

  setup(): void {  
    
    const fpsCounter = new PixiFps();
    this.app.stage.addChild(fpsCounter);
    fpsCounter.y = 0;
    fpsCounter.x=0;

    
    
    this.menuScene.visible=true;
    //this.cardStack.visible=false;
    this.CardsBtn = new PIXI.Text('show Cards');
    this.CardsBtn.x = window.innerWidth*0.25;
    this.CardsBtn.y = window.innerHeight*0.45;
    this.CardsBtn.interactive = true;
    this.CardsBtn.buttonMode = true;

    //this.textCombo.visible=false;
    this.TextComboBtn = new PIXI.Text('show Text Combo');
    this.TextComboBtn.x = window.innerWidth*0.25;
    this.TextComboBtn.y = window.innerHeight*0.55;
    this.TextComboBtn.interactive = true;
    this.TextComboBtn.buttonMode = true;

    this.FireButton = new PIXI.Text('show Fire Particle');   
    this.FireButton.x = window.innerWidth*0.25;
    this.FireButton.y = window.innerHeight*0.65;
    this.FireButton.interactive = true;
    this.FireButton.buttonMode = true;


    this.BackButton = new PIXI.Text('Back to main menu');
    this.BackButton.x = window.innerWidth*0.01;
    this.BackButton.y = window.innerHeight*0.1;
    this.BackButton.interactive = true;
    this.BackButton.buttonMode = true;



    this.CardsBtn.on('pointerdown',this.showCardsStack,this);
    this.TextComboBtn.on('pointerdown',this.showTextCombo,this);
    this.FireButton.on('pointerdown',this.showParticles,this);
    this.BackButton.on('pointerdown',this.showMainMenu,this);


    this.menuScene.addChild(this.CardsBtn);
    this.menuScene.addChild(this.TextComboBtn);
    this.menuScene.addChild(this.FireButton);
    this.menuScene.addChild(this.BackButton); 
    this.hideAll();
    this.showMainMenu();

  }

hideAll():void
{
  this.cardStack.visible=false;
  this.textCombo.visible=false;
  this.fireScene.visible=false;
  this.menuScene.visible=false;
  this.CardsBtn.visible=false;
  this.TextComboBtn.visible=false;
  this.FireButton.visible=false;
}
showMainMenu():void
{
  this.hideAll();
  if(this.currentScreen == BANNERMENU)
  {  
    this.resetBanner();
    this.comboTicker.stop(); 
  }
  else if(this.currentScreen == CARDMENU)
  {
    this.resetCardsMenu();
  }
 //
// this.app.ticker.start();
  this.menuScene.visible=true;
  this.BackButton.visible=false;
  this.CardsBtn.visible=true;
  this.TextComboBtn.visible=true;
  this.FireButton.visible=true;
  this.currentScreen=MAINMENU;
  this.currentTime=0.0;
}

showCardsStack():void
{
  this.hideAll();
  this.currentScreen=CARDMENU;
  this.cardStack.visible=true;
  this.menuScene.visible=true;
  this.BackButton.visible=true;
  this.setupCardStack();
  //console.log("onlick");
}
showTextCombo():void
{ 
  this.hideAll();
  this.currentScreen=BANNERMENU;
  this.textCombo.visible=true;   
  this.menuScene.visible=true;
  this.BackButton.visible=true;
  this.setupTextCombo();
  
//console.log("onlick");
}
showParticles():void
{
  this.hideAll();
  this.currentScreen=BANNERMENU;
  this.fireScene.visible=true;   
  this.menuScene.visible=true;
  this.BackButton.visible=true;
  this.setupFireParticle();
}
setupFireParticle():void
{
  var emitter = new particles.Emitter(this.fireScene,coinTexture,
    
    // Emitter configuration, edit this to change the look
    // of the emitter
    {
      alpha: {
        list: [
          {
            value: 0.8,
            time: 0
          },
          {
            value: 0.1,
            time: 1
          }
        ],
        isStepped: false
      },
      scale: {
        list: [
          {
            value: 1,
            time: 0
          },
          {
            value: 0.3,
            time: 1
          }
        ],
        isStepped: false
      },
      color: {
        list: [
          {
            value: "fb1010",
            time: 0
          },
          {
            value: "f5b830",
            time: 1
          }
        ],
        isStepped: false
      },
      speed: {
        list: [
          {
            value: 200,
            time: 0
          },
          {
            value: 100,
            time: 1
          }
        ],
        isStepped: false
      },
      startRotation: {
        min: 0,
        max: 360
      },
      rotationSpeed: {
        min: 0,
        max: 0
      },
      lifetime: {
        min: 0.5,
        max: 0.5
      },
      frequency: 0.008,
      spawnChance: 1,
      particlesPerWave: 1,
      emitterLifetime: 0.31,
      maxParticles: 1000,
      pos: {
        x: 0,
        y: 0
      },
      addAtBack: false,
      spawnType: "circle",
      spawnCircle: {
        x: 0,
        y: 0,
        r: 10
      }
    }
  );
  
  // Calculate the current time
  var elapsed = Date.now();
      
  // Update function every frame
  var update = function(){
        
    // Update the next frame
    requestAnimationFrame(update);
  
    var now = Date.now();
    
    // The emitter requires the elapsed
    // number of seconds since the last update
    emitter.update((now - elapsed) * 0.001);
    elapsed = now;
    
    // Should re-render the PIXI Stage
    // renderer.render(stage);
  };
  
  // Start emitting
  emitter.emit = true;
  
  // Start the update
  update();
}

  //Cards module
setupCardStack():void
{
 this.cards=[];    
 this.cardTicker.start();
 //this.cardTicker.deltaTime
 if(this.cardStack.children.length>0)
 {
   this.cardStack.removeChildren(0,this.cardStack.children.length);
 }
 for(var i=0;i<144;i++)
  {
    var _rand=Math.floor((Math.random() * 6));    
    let card = new PIXI.Sprite(loader.resources[cardFrames[_rand]].texture);
    this.cardStack.addChild(card);  
    card.y = this.stack1Pos_y+i;
    card.x = this.stack1Pos_x+i;    
    card.zIndex=i;
    this.cards.push(card);
   }   
 this.cardCounter=this.cards.length-1;
 if(this.currentScreen==CARDMENU)
 {
   this.cardTicker.add(delta => this.releaseCard(delta),this);
 }

}

 releaseCard(delta:number):void 
 {
  if(this.cardCounter>=0)
  {
   this.currentTime+=delta; 
   //console.log(this.cardTicker.deltaTime);
   if(this.currentTime>120)
     {              
        this.cards[this.cardCounter].x=this.stack2Pos_x+(this.cardCounter);
        this.cards[this.cardCounter].y=this.stack2Pos_y-(this.cardCounter);   
        this.cards[this.cardCounter].zIndex=(this.cards.length-1)-this.cards[this.cardCounter].zIndex;
        this.cardStack.sortChildren();
        this.cardCounter-=1;
        this.currentTime=0.0;
     } 
    }  
  }
resetCardsMenu():void
{
  this.cardTicker.stop();
}

  //text combo module
  setupTextCombo():void
  {   
    this.comboTicker.start(); 
    if(this.currentScreen==BANNERMENU)
    {    
    this.comboTicker.add(delta => this.displayMessage(delta),this.textCombo);    
    }  
  }

  displayMessage(delta:number):void
  { this.currentTime+=delta; 
    if(this.currentTime>240)
      { 
        this.resetBanner();
         this.banner=[];  
        for(var i=0;i<3;i++)
        {
          var _rand=Math.floor((Math.random() * 4)); 
          var _randFontSize=Math.floor((Math.random()*30)+10);  
          var style = new PIXI.TextStyle({fontSize: _randFontSize, });
          
          if(_rand==0)
          {
            var _randText=Math.floor((Math.random() * emotionStr.length)); 
            var emoText=  new PIXI.Text(emotionStr[_randText],style);           
            //emoText.pivot.set(0.5,0);
            this.banner.push(emoText);
          } 
          if(_rand==1)
          {
            var _randText=Math.floor((Math.random() * prices.length));     
            var emoText=  new PIXI.Text(prices[_randText].toString(),style); 
           // emoText.pivot.set(0.5,0);        
            this.banner.push(emoText);
          } 
          if(_rand==2)
          {          
            var emospr=  new PIXI.Sprite(loader.resources[coinTexture].texture);
            //emospr.pivot.set(0,0);           
            this.banner.push(emospr);
          } 
          if(_rand==3)
          {
            var _randText=Math.floor((Math.random() * emotionTexture.length));     
            var emospr= new PIXI.Sprite(loader.resources[emotionTexture[_randText]].texture);
          //  emospr.pivot.set(0,0);
            this.banner.push(emospr);
          } 
         } 
        
         for(var i=0;i<this.banner.length;i++)
         {
           this.textCombo.addChild(this.banner[i]);
           if(i>0)
           {
             this.banner[i].x=(this.banner[i-1].x+(this.banner[i].width*1.5));
           }
           else
           {
             this.banner[i].x=window.innerWidth*0.1;
           }
           this.banner[i].y=window.innerHeight*0.5;
         }
         this.currentTime=0.0;  

     }
  }
  resetBanner():void
  {
    if(this.textCombo.children.length>0)
    {
      this.textCombo.removeChildren(0,this.textCombo.children.length);
    }    
  }
}

new Game();

