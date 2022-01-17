
let KEY_SPACE = false; //32
let KEY_UP = false; //38
let KEY_DOWN = false; //40  
let KEY_B = false; //66
let KEY_F = false; // 70
let KEY_S = false; // 83
let KEY_Q = false; // 81
let KEY_N = false; //78
let npressed=false;
let Fpressed = false, Spressed = false;

let canvas;
let ctx ;
let updInterval, colInterval, shotInterval, objInterval;
let backgroundImage = new Image();
let bgAudio;
bgAudio = new Audio('../sounds/backgroundsound.mp3');
let shit = new Image();
const CWIDTH = 1280;
const CHEIGHT = 700; 

let shotfired =false;
window.hitcounter = 0;
let ufoIntervalCount = 0;

window.level = 0;  
let endbossspeed = 0 ;
let createEB = false;
let eb = 0; 
let randEBshot=[];
let gameData=[];
class gDat {constructor (type, text, time, rem, effectStyle, effectSize, ftsize, ftWeight, x, y, fCol, bCol){
    this.type=type; this.text=text; this.time=time; this.rem=rem; this.effectStyle=effectStyle; this.effectSize=effectSize; this.ftsize=ftsize; this.fCol=fCol; this.bCol=bCol; this.ftWeight=ftWeight; this.x=x; this.y=y;}};
    



let guns = [
    {name:"empty",
    power:0,
    speed: 15,
    width: 10,
    height: 6,
    pwidth:80,
    pheight:40,
    charge:0,
    shotsound: '../sounds/zap2.mp3',
    src: '../img/Transp.png'},

    {name:"Zapp",
    power:1,
    speed: 15,
    width: 10,
    height: 6,
    pwidth:80,
    pheight:40,
    charge:-1,
    shotsound: '../sounds/zap2.mp3',
    src: '../img/zap1.png'},

    {name:"Kapow",
    power:50, 
    speed: 10,
    width: 10,
    height: 800, 
    pwidth:500,
    pheight:300,
    charge:1,
    shotsound: '../sounds/superzap.mp3',
    src: '../img/zap2.png'},
    
    {name:"bean",
    power:1,
    speed: -12,
    width: 10,
    height: 6,
    pwidth:40,
    pheight:40,
    charge:-1,
    shotsound: '../sounds/bean.mp3',
    src: '../img/bean.png'}
];

let levels = [

    {lifeadd:0,
    shieldadd:0,
    poweradd:0,
    baseshield:0,
    backgr: '../img/background.png',
    hitsrequired:00,
    eb:0,
    ebcount : 0,
    src: '../img/ship1.png'},

    {lifeadd:0,
    shieldadd:3,
    poweradd:0,
    baseshield:3,
    backgr: '../img/background.png',
    hitsrequired:25,
    eb:'1',
    ebcount : 1,
    src: '../img/ship1.png'},

    {lifeadd:1,
    shieldadd:5,
    poweradd:1,
    baseshield:5,
    backgr: '../img/background.png',
    hitsrequired:100,
    eb:'1',
    ebcount : 1,
    src: '../img/ship2.png'},

    {lifeadd:0,
    shieldadd:5,
    poweradd:0,
    baseshield:5,
    backgr: '../img/background.png',
    hitsrequired:200,
    eb:'1',
    ebcount : 1,
    src: '../img/ship2.png'},

    {lifeadd:0,
    shieldadd:10,
    poweradd:0,
    baseshield:10,
    backgr: '../img/background.png',
    hitsrequired:500,
    eb:'1',
    ebcount : 1,
    src: '../img/ship2.png'}

];


    
let flyObjects = [{
    //0
    type:'ufo',
    x: 0,
    y: 00,
    width:100,
    height:40,
    lifes:1,
    power:1,
    speed:5,
    points:1,
    subtype: 'ufo',
    src: '../img/cup1.png',
    appsound : '../sounds/UfoAppear.mp3',
    hitsound : '../sounds/ufoHit.mp3',
    destsound: '../sounds/ufoDestroy.mp3'},
    //1
    { type:'ufo',
    x: 0,
    y: 00,
    width:100,
    height:40,
    lifes:2,
    power:1,
    speed:8,
    points:2,
    subtype: 'ufo',
    src: '../img/cup2.png',
    appsound : '../sounds/UfoAppear.mp3',
    hitsound : '../sounds/ufoHit.mp3',
    destsound: '../sounds/ufoDestroy.mp3'},
    //2
    {type:'ufo',
    x: 0,
    y: 00,
    width:100,
    height:80,
    lifes:2,
    power:2,
    speed:4,
    points:5,
    subtype: 'ufo',
    src: '../img/mug2.png',
    appsound : '../sounds/UfoAppear.mp3',
    hitsound : '../sounds/ufoHit.mp3',
    destsound: '../sounds/ufoDestroy.mp3'},
    //3
    {type:'ufo',
    x: 0,
    y: 00,
    width:100,
    height:80,
    lifes:3,
    power:2,
    speed:4,
    points:7,
    subtype: 'ufo',
    src: '../img/mug1.png',
    appsound : '../sounds/UfoAppear.mp3',
    hitsound : '../sounds/ufoHit.mp3',
    destsound: '../sounds/ufoDestroy.mp3'},
    //4
    {type:'powerup',
    x: 0,
    y: 00,
    width:100,
    height:80,
    lifes:1,
    power:0,
    speed:4,
    points:0,
    subtype:'life',
    src: '../img/sugar.png',
    appsound : '../sounds/powerupAppear.mp3',
    hitsound : '../sounds/ooh.mp3',
    destsound: '../sounds/powerup.mp3'},
    //5
    {type:'powerup',
    x: 0,
    y: 00,
    width:100,
    height:80,
    lifes:0,
    power:0,
    speed:4,
    points:3,
    subtype:'shield',
    src: '../img/EinSchild.png',
    appsound : '../sounds/powerupAppear.mp3',
    hitsound : '../sounds/ooh.mp3',
    destsound: '../sounds/powerup.mp3'},

    {type:'powerup',
    x: 0,
    y: 00,
    width:100,
    height:80,
    lifes:0,
    power:2,
    speed:5,
    points:0,
    subtype:'power',
    src: '../img/power.png',
    appsound : '../sounds/powerupAppear.mp3',
    hitsound : '../sounds/ooh.mp3',
    destsound: '../sounds/powerup.mp3'},

    {type:'powerup',
    x: 0,
    y: 00,
    width:100,
    height:80,
    lifes:0,
    power:20,
    speed:10,
    points:1,
    subtype:'Kapow',
    src: '../img/present.png',
    appsound : '../sounds/powerupAppear.mp3',
    hitsound : '../sounds/ooh.mp3',
    destsound: '../sounds/powerup.mp3'},

    {type:'powerup',
    x: 0,
    y: 00,
    width:100,
    height:80,
    lifes:0,
    power:10,
    speed:10,
    points:2,
    subtype:'Kapow',
    src: '../img/present.png',
    appsound : '../sounds/powerupAppear.mp3',
    hitsound : '../sounds/ooh.mp3',
    destsound: '../sounds/powerup.mp3'},
    //6
    {type:'endboss',
    x: 0,
    y: 00,
    width:200,
    height:200,
    lifes:15,
    power:2,
    speed:4,
    points:20,
    level:'1',
    subtype: 'ufo',
    src: '../img/can.png',
    appsound : '../sounds/endboss.mp3',
    hitsound : '../sounds/ufoHit.mp3',
    destsound: '../sounds/endbossDest.mp3'}
];

let rocket={
    x:10,
    y:CHEIGHT/2-50/2,
    width:100,
    height:80,
    speed:7,
    lifes:2,
    shield:10,
    poweradd:0,
    gun1:guns[1],
    gun2:guns[0],
    level: 1,
    src: '',
    img: new Image()
};
let ufos=[];
let shots = [];



/*window.addEventListener ("load", function(){
        if (document.getElementById("GameStart")) {
            document.getElementById("GameStart").addEventListener("click", startGame);

        }
        /*if (document.getElementById("shipfaster")) {
            document.getElementById("shipfaster").addEventListener("click", adjustSpeed(1));
        }
        if (document.getElementById("shipslower")) {
            document.getElementById("shipslower").addEventListener("click", adjustSpeed(-1));
        } 
    });
    */


document.onkeydown = function(e){
    //console.log("key: " + e.keyCode);
    if (e.keyCode==32){KEY_SPACE=true;} //Leertaste gedrückt
    if (e.keyCode==38){KEY_UP=true;} //Pfeil Up gedrückt
    if (e.keyCode==40){KEY_DOWN=true;} //Pfeil Down gedrückt
    if (e.keyCode==66){KEY_B=true;} //B gedrückt
    if (e.keyCode==70){KEY_F=true;} //F gedrückt
    if (e.keyCode==83){KEY_S=true;} //S gedrückt
    if (e.keyCode==81){KEY_Q=true;} //Q gedrückt
    if (e.keyCode==78){
        KEY_N=true;
        if (!npressed){
            //console.log("Game started" + e.keyCode);
            clearInterval(updInterval); 
            clearInterval(colInterval);
            clearInterval(shotInterval);
            clearInterval(objInterval);
            bgAudio.pause();
            
            bgAudio.volume = 0.75;
            bgAudio.play(); 

            startGame();} //N gedrückt
        };  
        npressed = KEY_N;

}

document.onkeyup = function(e){

    if (e.keyCode==32){KEY_SPACE=false;} //Leertaste losgelassen
    if (e.keyCode==38){KEY_UP=false;} //Pfeil Up losgelassen
    if (e.keyCode==40){KEY_DOWN=false;} //Pfeil Down losgelassen
    if (e.keyCode==66){KEY_B=false;} //B losgelassen
    if (e.keyCode==70){KEY_F=false;} //F losgelassen
    if (e.keyCode==83){KEY_S=false;} //S losgelassen
    if (e.keyCode==81){KEY_Q=false;} //Q losgelassen
    if (e.keyCode==78){KEY_N=false;} //N losgelassen
    npressed = KEY_N;
}

function adjustSpeed(increment){
    rocket.speed = limit(rocket.speed + increment, 4 , 15);
};

function startGame(){
    shotfired =false;
    hitcounter = 0;
    ufoIntervalCount = 0;
    Fpressed = false, Spressed = false;
    level = 0;  
    endbossspeed = 0 ;
    createEB = false;
    eb = 0; 
    randEBshot=[];
    for (var i = 0; i < 10; i++)
    gameData.push(gDat/*{
        text:'',
        time:0000,
        rem:0000,
        x:0,
        y:0

    }*/);
    addPopup(gameData,'lvl', "Level " + rocket.level, CWIDTH/2, CHEIGHT/2, 5000, 'zm', 1, 300, 'bold', 'yellow','yellow')


    

    rocket={
        x:10,
        y:CHEIGHT/2-50/2,
        width:100,
        height:80,
        speed:7,
        lifes:2,
        shield:0,
        
        poweradd:0,
        gun1:guns[1],
        gun2:guns[0],
        level: 1,
        src: '',
        img: new Image()
    };
    ufos=[];
    shots = [];
    
    

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // document.getElementById("GameStart").style.visibility = 'hidden';
    

    
    //LevelChange();
    ////console.log("lives " + rocket.lifes);
    
    rocket.gun1=guns[1];
    //rocket.gun2=guns[0];
    updInterval = setInterval(update, 1000/50 );
    shotInterval = setInterval(shooting, 1000/50 );
    objInterval = setInterval(createObjects,1000/20 );
    colInterval = setInterval(checkColision, 10);
    
        
    
    draw();

    //calc
}


function checkColision(){
    if (rocket.lifes >0){

        // Collision of ufos with rocket
        ufos.filter(u => u.type != "powerup").forEach(function(ufo){
                    
            if (collision(rocket, ufo)){
                //console.log("rocketHitUfo ")
                let shield =  rocket.shield; 
                //ufo.power = Math.trunc((rocket.power * 100  - rocket.shield)/100);
               
                if (rocket.shield > 0){addPopup(gameData,'shp', '-' + ufo.power, ufo.x, ufo.y, 3000, 'up', 0, 50, 'bold','blue','skyblue' ) }
                rocket.shield -= ufo.power;

                ufo.power =0;
                if (rocket.shield < 0){

                    rocket.lifes -= 1;
                    rocket.shield = 0;
                    ufo.power =0;
                    addPopup(gameData,'lif', '-1' , ufo.x, ufo.y, 3000, 'up', 0, 50, 'bold','red','red' )

                };
            
                playsound('../sounds/ShipHit.mp3', 1);
                if (rocket.lifes <=0){
                    rocket.img.src = '../img/shit.png';
                    playsound('../sounds/ShipDestroyed.mp3', 1);
                    addPopup(gameData,'lvl', "Game over " , CWIDTH/2, CHEIGHT/2, 5000, 'zm', 1, 300, 'bold', 'red','red')
                    ufos = ufos.filter(u => u.type != "ufo");
                                                
                };
                
                if ( ufo.power <=0){ufos = ufos.filter(u=> u !=ufo);};
                
            };
            // Collision of rocket shots with ufos

            shots.forEach(function(shot){
                if (collision(ufo,shot)){
                    let lifes = ufo.lifes
                // //console.log("shotHitUfo Ufolifes" + ufo.lifes + "shotPower " + shot.power); 
                shot.power = shot.power ;
                    ufo.lifes -= shot.power;

                    if (ufo.lifes > 0){playsound(ufo.hitsound, 1);};
                    
                    shot.power -= lifes;
                    if (ufo.lifes <= 0){
                        playsound(ufo.destsound, 1);
                        if (ufo.type == 'endboss'){
                        
                            eb -= 1;
                            if (eb ==0){
                                rocket.level += 1;
                                shots.length = 0;
                            };
                            
                        }
                    // if (hitcounter>levels[rocket.level].hitsrequired){rocket.level +=1 };

                        

                        hitcounter += ufo.points;
                        addPopup(gameData,'obj', '+' + ufo.points, ufo.x, ufo.y, 5000 *ufo.y/CHEIGHT, 'up', 0, 50, 'bold' ,'yellow','yellow')

                        ufos = ufos.filter(u=> u != ufo);
                        
                        
                    };
                    
                        // cause damage to UFO
                        
                    if (shot.power <= 0){
                        shots = shots.filter(i=> i != shot);};  // deduct power from shot 
                    ////console.log("shotHitUfo Ufolifes" + ufo.lifes + "shotPower " + shot.power); 
                };
            })
        })
        // Collision of  ufo shots with rocket
        shots.forEach(function(shot){
                if (collision(rocket,shot)){
                    //rocket.lifes -= shot.power;

                    let shield =  rocket.shield; 
                    //ufo.power = Math.trunc((rocket.power * 100  - rocket.shield)/100);
                    if (rocket.shield > 0){ addPopup(gameData,'shp', '-' + shot.power, shot.x, shot.y, 3000, 'up', 0, 50, 'bold' ,'blue','skyblue')}
                    rocket.shield -= shot.power;
                    


                    shot.power -= shield;
                    if (rocket.shield < 0){
                        rocket.lifes -=1;
                        rocket.shield = 0;//levels[rocket.level - 1 ].baseshield;
                        shot.power = 0;
                        addPopup(gameData,'lif', '-1', shot.x, shot.y, 3000, 'up', 0, 50, 'bold'  ,'red','red' )
                        
                    };
                     
                    
                    playsound('../sounds/ShipHit.mp3', 1);   
                    if (rocket.lifes <=0){
                        rocket.img.src = '../img/shit.png';
                        playsound('../sounds/ShipDestroyed.mp3', 1);
                        
                    };
                    if (shot.power <= 0){
                            shots = shots.filter(i=> i != shot);
                    };
                
            };
        });

        // Collision of rocket with powerup
        ufos.filter(u => u.type == "powerup").forEach(function(goodie){
                    
            if (collision(rocket, goodie)){
                //console.log("rocketHit powerup")
                playsound(goodie.destsound, 1);
                //console.log(goodie.subtype)
                switch(goodie.subtype){
                    case 'shield': 
                        addPopup(gameData,'shp', '+' + goodie.points, goodie.x + 0, goodie.y, 3000, 'up', 0, 50, 'bold','yellow','red' ) 
                        addPopup(gameData,'obj', '+' + goodie.points, goodie.x + 20, goodie.y, 3000, 'up', 0, 50, 'bold','yellow','red' )
                        rocket.shield += goodie.points;
                        break;
                    case 'power': 
                        addPopup(gameData,'obj', '+' + goodie.power, goodie.x + 40, goodie.y, 3000, 'up', 0, 50, 'bold','blue','skyblue' ) 
                        rocket.poweradd += goodie.power;
                        break;
                    case 'life': 
                        addPopup(gameData,'lif', '+' + goodie.lifes, goodie.x + 0, goodie.y, 3000, 'up', 0, 50, 'bold','yellow','red' ) 
                        addPopup(gameData,'obj', '+' + goodie.lifes, goodie.x + 60, goodie.y, 3000, 'up', 0, 50, 'bold','red','red' )
                        rocket.lifes += goodie.lifes;
                        break;
                    case 'Kapow': 
                        //console.log(goodie)
                        //console.log(rocket.gun2)
                        addPopup(gameData,'Kapoow' , goodie.x + 20, goodie.y, 3000, 'up', 0, 150, 'bold','blue','skyblue' )
                        let power=rocket.gun2.power;
                        let charge = rocket.gun2.charge;
                        //console.log(guns.filter(u=> u.name=='Kapow'))
                        rocket.gun2 = guns.filter(u=> u.name=='Kapow')[0]
                        if(power<goodie.power) {rocket.gun2.power = goodie.power}
                        charge += goodie.points;
                        rocket.gun2.charge = charge; 
                        break;

                    
                }  



                goodies = goodies.filter(u=> u !=goodie)
                ufos = ufos.filter(u=> u !=goodie)
            };
            shots.filter(u => u.name != 'bean').forEach(function(shot){
                if (collision(goodie,shot)){
                    //console.log("shot hit goodie")
                    //console.log(shot)
                    //console.log(goodie)
                    playsound(goodie.hitsound, 1);
                    
                    shot.power =0 ;
                    goodies = goodies.filter(u=> u !=goodie);
                    ufos = ufos.filter(u=> u !=goodie)
                    shots = shots.filter(i=> i != shot);

                };
            })
        })
    };
}

function update(){//call every 50 milliseconds
    updatePopup(gameData,50)
   

    if (rocket.lifes>0){
        if (hitcounter>=levels[rocket.level].hitsrequired && eb==0){
            createEB = true;
        };

        if (KEY_F &&  !Fpressed){
                adjustSpeed(1);
        };
        if (KEY_S &&  !Spressed){
                adjustSpeed(-1);
        };
        Spressed = KEY_S;
        Fpressed = KEY_F;


        if (rocket.level>level){LevelChange();};
        level = rocket.level ;

        if (KEY_UP &&  (rocket.y > 0)){
            rocket.y -= rocket.speed;
        };
        if (KEY_DOWN && (rocket.y < CHEIGHT-rocket.height)){
            rocket.y += rocket.speed;
        };   

        shots.forEach(function(shot){
            shot.x +=shot.speed;
            //if (shot.x > CWIDTH  || shot.x < (0- shot.pwidth)){shots.filter(u=> u !=shot);}; 
        })

        
    
        ufos.forEach(function(ufo){
            if (ufo.type == 'ufo'){
            ufo.x -= ufo.speed;};

            if (ufo.type == 'powerup'){
                ufo.x -= ufo.speed;};

            if (ufo.type == 'endboss'){

                if (ufo.y <= 50 ) {
                    ufo.speed = endbossspeed;
                };
                    if (ufo.y > CHEIGHT - ufo.height){
                        ufo.speed = - 1* endbossspeed;
                    };
                ufo.y += ufo.speed;
                ufoshoot();
        
            };
            

            if (ufo.x <= - ufo.width){ufos = ufos.filter(u=> u !=ufo);};              
        });

    /* document.getElementById('cLife').innerHTML = rocket.lifes ;
    // document.getElementById('cShield').innerHTML = rocket.shield ;
    document.getElementById('cPower').innerHTML = rocket.poweradd + guns[0].power ;
    document.getElementById('cSpeed').innerHTML = rocket.speed ;
    if (rocket.gun2!=null){
        document.getElementById('cGuns').innerHTML = rocket.gun1.type + ", " + rocket.gun2.type}
    document.getElementById('cGuns').innerHTML =  rocket.gun1.type  ;
    document.getElementById('cHits').innerHTML = hitcounter ;
    document.getElementById('cLevel').innerHTML = rocket.level ;
    document.getElementById('cHitsReq').innerHTML = levels[rocket.level].hitsrequired - hitcounter;
        */   

        
    return null;}
}

function ufoshoot(){
    
    ufos.filter(u => u.type == "endboss").forEach(function(boss){ //(let i = 1; i<=eb; 1++){
        if (getRandomInt(1000) < rocket.level*15){
            
        let shot = {x:0,
            y:0 ,
            width:guns[3].width,
            height:guns[3].height,
            pwidth:guns[3].pwidth,
            pheight:guns[3].pheight,
            py:0,
            speed :  guns[3].speed,
            name: guns[3].name,
            power : rocket.level - 1 + guns[3].power,    
            shotsound : guns[3].shotsound,
            src: guns[3].src,
            img: new Image()};
            
            shot.x = boss.x - 5 - boss.width;
            shot.y = boss.y + (boss.height/2) - (shot.height/2) ;
            shot.py = boss.y + (boss.height/2) - (shot.pheight/2);
            
            shot.img.src=shot.src;
            shots.push(shot);
            playsound(shot.shotsound, 0.55);
    };
    });
    
};

function createObjects(){//call every 50 milliseconds   
    if (rocket.lifes>0 ){
        //if (ufos.length == 0 ){ufoInterval = 1};
        //if (ufos.length != 0 ){ufoInterval = 30 - getRandomInt(level * 4) };
        ////console.log("ufoIntervall " + ufoInterval);
        ////console.log("ufos count " + ufos.length);
        //ufoIntervalCount += 1;
        let ufoType;
        let killpoints;
        let spawnx;
        let speed ;
        let volume;
        if (getRandomInt(100) < rocket.level*10){//(ufoIntervalCount>=ufoInterval || createEB){
            //ufoIntervalCount = 0;
            if(!(createEB || eb!=0)){
                var opponents = flyObjects.filter(u => u.type == "ufo")
                ufoType = limit(getRandomInt(rocket.level),0,opponents.length); 
                console.log("ufotyp: " + ufoType +  " opponentlength " +opponents.length  )
                var random = getRandomInt(2*level+1);
                speed = Math.floor(opponents[ufoType].speed + random  );
                //console.log("heightpoints")
                    //console.log(100/opponents[ufoType].height)
                killpoints = opponents[ufoType].points +   limit(Math.floor((speed - opponents[ufoType].speed + 100/opponents[ufoType].height),0,1000000));
                spawnx = CWIDTH + opponents[ufoType].width;
                volume = 0.2;
                //console.log("basespeed " + opponents[ufoType].speed + " random " + random +  " resultspeed " + speed + " points " +killpoints );
                let ufo ={
                    x : spawnx,
                    y : getRandomInt(CHEIGHT - opponents[ufoType].height)  ,
                    type: opponents[ufoType].type,
                    width : opponents[ufoType].width,
                    height : opponents[ufoType].height,
                    lifes : opponents[ufoType].lifes + ( eb * rocket.level),
                    power : opponents[ufoType].power,
                    speed : speed,
                    points : killpoints ,
                    src : opponents[ufoType].src,
                    appsound : opponents[ufoType].appsound,
                    destsound: opponents[ufoType].destsound,
                    hitsound : opponents[ufoType].hitsound,
                    img: new Image()
                };
                
                

                
                //console.log("ufoType: "+ ufo.type + " spawnx " + spawnx + " spawny " + ufo.y );

                ufo.img.src = ufo.src; 
                playsound(ufo.appsound, volume);
                ufos.push(ufo); // ufo erzeugen
            
            };
            if (createEB) {
                // alle ufos rausfiltern, 
                ufos = ufos.filter(u => u.type != "ufo");
                var opponents = flyObjects.filter(u => (u.type == 'endboss' && u.level == levels[rocket.level].eb) )
                
                //endboss einfügen
                // in update endboss in x fliegen lassen statt y
                    ufoType = getRandomInt(opponents.length);
                    //console.log(opponents.length)
                    //console.log(opponents[ufoType])
                    killpoints = opponents[ufoType].points ;
                    speed = opponents[ufoType].speed;
                    spawnx = CWIDTH - opponents[ufoType].width - 100;
                    
                    eb += 1;
                    volume = 1;
                    
                    let ufo ={
                    x : spawnx,
                    y : getRandomInt(CHEIGHT - opponents[ufoType].height)  ,
                    type: opponents[ufoType].type,
                    width : opponents[ufoType].width,
                    height : opponents[ufoType].height,
                    lifes : opponents[ufoType].lifes + ( eb * rocket.level),
                    power : opponents[ufoType].power,
                    speed : speed,
                    points : killpoints ,
                    src : opponents[ufoType].src,
                    appsound : opponents[ufoType].appsound,
                    destsound: opponents[ufoType].destsound,
                    hitsound : opponents[ufoType].hitsound,
                    img: new Image()
                };
                endbossspeed = ufo.speed;

                if (eb>=levels[rocket.level].ebcount){createEB = false;};
                //console.log(eb)
                //console.log("ufoType: "+ ufo.type + " spawnx " + spawnx + " spawny " + ufo.y );

                ufo.img.src = ufo.src; 
                playsound(ufo.appsound, volume);
                ufos.push(ufo); // ufo erzeugen
            
            };

        };


//power und shield goodies
        goodies = flyObjects.filter(u => u.type == "powerup" && (u.subtype == 'shield' || u.subtype == 'power'))
        
        var glen = goodies.length
        if (getRandomInt(5000) < rocket.level*4){
           
            var random = getRandomInt(2*level+1);
            var type = limit(getRandomInt(rocket.level),0,limit(glen-1,0,glen)); 
            //console.log("goodies gun")
            //console.log(goodies)
            //console.log("type")
            //console.log(type)
            //console.log("length")
            //console.log(glen)
            speed = Math.floor(goodies[type].speed + random  );
            killpoints = getRandomInt(goodies[type].points +  rocket.level);
            spawnx = CWIDTH + goodies[type].width;
            volume = 0.2;
            //console.log("basespeed " + goodies[type].speed + " random " + random +  " resultspeed " + speed + " points " +killpoints );
            let ufo ={
                x : spawnx,
                y : getRandomInt(CHEIGHT - goodies[type].height)  ,
                type: goodies[type].type,
                width : goodies[type].width,
                height : goodies[type].height,
                lifes : goodies[type].lifes ,
                power : goodies[type].power,
                speed : speed,
                points : killpoints ,
                src : goodies[type].src,
                subtype: goodies[type].subtype,
                appsound : goodies[type].appsound,
                destsound: goodies[type].destsound,
                hitsound : goodies[type].hitsound,
                img: new Image()
            };
            
            //console.log (ufo)

            
            //console.log("GoodieType: "+ ufo.type + " spawnx " + spawnx + " spawny " + ufo.y );

            ufo.img.src = ufo.src; 
            playsound(ufo.appsound, volume);
            ufos.push(ufo); // ufo erzeugen
        };

//life  goodies
        goodies = flyObjects.filter(u => u.type == "powerup" && (u.subtype == 'life' ))

        var glen = goodies.length
        if (getRandomInt(5000) < rocket.level*1){
           
            var random = getRandomInt(2*level+1);
            var type = limit(getRandomInt(rocket.level),0,limit(glen-1,0,glen)); 
            //console.log("goodies gun")
            //console.log(goodies)
            //console.log("type")
            //console.log(type)
            //console.log("length")
            //console.log(glen)

            speed = Math.floor(goodies[type].speed + random  );
            killpoints = goodies[type].points +  limit(Math.floor((speed - goodies[type].speed ),0,1000000));
            spawnx = CWIDTH + goodies[type].width;
            volume = 0.2;
            //console.log("basespeed " + goodies[type].speed + " random " + random +  " resultspeed " + speed + " points " +killpoints );
            let ufo ={
                x : spawnx,
                y : getRandomInt(CHEIGHT - goodies[type].height)  ,
                type: goodies[type].type,
                width : goodies[type].width,
                height : goodies[type].height,
                lifes : goodies[type].lifes ,
                power : goodies[type].power,
                speed : speed,
                points : killpoints ,
                src : goodies[type].src,
                subtype: goodies[type].subtype,
                appsound : goodies[type].appsound,
                destsound: goodies[type].destsound,
                hitsound : goodies[type].hitsound,
                img: new Image()
            };
            
            //console.log (ufo)

            
            //console.log("GoodieType: "+ ufo.type + " spawnx " + spawnx + " spawny " + ufo.y );

            ufo.img.src = ufo.src; 
            playsound(ufo.appsound, volume);
            ufos.push(ufo); // ufo erzeugen
        };

//gun  goodies
        goodies = flyObjects.filter(u => u.type == "powerup" && (u.subtype == 'Kapow'))
 
        var glen = goodies.length
        if (getRandomInt(5000) < rocket.level*2){
           
            var random = getRandomInt(2*level+1);
            var type = limit(getRandomInt(rocket.level),0,limit(glen-1,0,glen)); 
            //console.log("goodies gun")
            //console.log(goodies)
            //console.log("type")
            //console.log(type)
            //console.log("length")
            //console.log(glen)
            speed = Math.floor(goodies[type].speed + random  );
            killpoints = goodies[type].points +  limit(Math.floor((speed - goodies[type].speed ),0,1000000));
            spawnx = CWIDTH + goodies[type].width;
            volume = 0.2;
            //console.log("basespeed " + goodies[type].speed + " random " + random +  " resultspeed " + speed + " points " +killpoints );
            let ufo ={
                x : spawnx,
                y : getRandomInt(CHEIGHT - goodies[type].height)  ,
                type: goodies[type].type,
                width : goodies[type].width,
                height : goodies[type].height,
                lifes : goodies[type].lifes ,
                power : goodies[type].power,
                speed : speed,
                points : killpoints ,
                src : goodies[type].src,
                subtype: goodies[type].subtype,
                appsound : goodies[type].appsound,
                destsound: goodies[type].destsound,
                hitsound : goodies[type].hitsound,
                img: new Image()
            };
            
            //console.log (ufo)

            
            //console.log("GoodieType: "+ ufo.type + " spawnx " + spawnx + " spawny " + ufo.y );

            ufo.img.src = ufo.src; 
            playsound(ufo.appsound, volume);
            ufos.push(ufo); // ufo erzeugen
        };
    };
}


function limit(value, min, max){
    let val = value;

    if (val<min){val = min;
    } else {
         if (val>max){val = max;}};

         if (min>max){
            return min}
    
    
    return val;
}

function shooting(){
    if (KEY_SPACE  && !shotfired && rocket.gun1.name !="empty"){
        var shot = {x:0,
        y:0,
        width:rocket.gun1.width,
        height:rocket.gun1.height,
        pwidth:rocket.gun1.pwidth,
        pheight:rocket.gun1.pheight,
        py:0,
        speed :  rocket.gun1.speed,
        name:rocket.gun1.name,
        power : rocket.poweradd + rocket.gun1.power,
        shotsound : rocket.gun1.shotsound,
        src: rocket.gun1.src,
        img: new Image()};
        
        shot.x = rocket.x + rocket.width;
        shot.y = rocket.y + (rocket.height/2) - (shot.height/2) ;
        shot.py = rocket.y + (rocket.height/2) - (shot.pheight/2);
        
        shot.img.src=shot.src;
        shots.push(shot);
        playsound(shot.shotsound, 0.45);
        }; 
    if (KEY_B  && !shotfired && rocket.gun2.name!="empty"){
        var shot = {x:0,
        y:0,
        width:rocket.gun2.width,
        height:rocket.gun2.height,
        pwidth:rocket.gun2.pwidth,
        pheight:rocket.gun2.pheight,
        py:0,
        speed :  rocket.gun2.speed,
        name:rocket.gun2.name,
        power : rocket.poweradd + rocket.gun2.power,
        shotsound : rocket.gun2.shotsound,
        src: rocket.gun2.src,
        img: new Image()};
        
        shot.x = rocket.x + rocket.width;
        shot.y = rocket.y + (rocket.height/2) - (shot.height/2) ;
        shot.py = rocket.y + (rocket.height/2) - (shot.pheight/2);
        
        shot.img.src=shot.src;
        //console.log(rocket.gun2)
        //console.log(shot)
        if (rocket.gun2.charge>0){   
            rocket.gun2.charge -=1;
        shots.push(shot);
            playsound(shot.shotsound, 0.55);
        } else {
            playsound('../sounds/emptygun.mp3', 0.55);
        };
    };      
    shotfired = KEY_SPACE || KEY_B;
};

function LevelChange(){
    backgroundImage.src=levels[rocket.level-1].backgr;
    //console.log("levels before add")
    //console.log(levels)
    //console.log("level len " +levels.length + " rocket level " +rocket.level)
    playsound('../sounds/LevelUp.mp3', 0.5);
    if (levels.length < rocket.level+2){
        var newLevel = levels[rocket.level]
        newLevel.ebcount +=1;
        newLevel.shieldadd +=5;
        newLevel.hitsrequired +=500;
        newLevel.poweradd += 5;
        levels.push(newLevel);

    }
    //console.log("levels after add")
    //console.log(levels)

    rocket.src = levels[rocket.level-1].src;
    rocket.shield += levels[rocket.level-1].shieldadd;
    rocket.poweradd += levels[rocket.level-1].poweradd;
    rocket.lifes += levels[rocket.level-1].lifeadd;
    rocket.img=new Image();
    rocket.img.src=rocket.src;
    rocket.y =(CHEIGHT-rocket.height)/2
    addPopup(gameData,'lvl', "Level " + rocket.level, CWIDTH/2, CHEIGHT/2, 4000, 'zm', 1, 300, 'bold' ,'yellow','yellow' )

    
}

function collision(o1, o2){
    return  (o1.x + o1.width > o2.x) &&
    (o1.y + o1.height > o2.y) &&
    (o1.x < o2.x + o2.width) && 
    (o1.y < o2.y + o2.height);

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function playsound(sound, volume){
    let audio = new Audio(sound);

    audio.volume = volume;
    audio.play();
}

function updatePopup(gdat,interval){

    gdat.forEach(function(gdat){
            if (gdat.rem > 0){
                gdat.rem -= interval;
                };
        if (gdat.rem <= 0){
            gdat.rem = 0;};
    })
}

function variablePopup(gDat , fontType,  textAlign,textBaseline, context, canvash, canvasw){

 let    x,y;

    if (gDat.rem > 0){
        context.fillStyle = gDat.fCol;
        context.strokeStyle = gDat.bCol;
        context.font = gDat.ftWeight + ' ' + gDat.ftsize + ' ' + fontType ;
        context.textAlign = textAlign;
        context.textBaseline = textBaseline;
        x = gDat.x;
        y = gDat.y;
              
        switch(gDat.effectStyle){
            case 'up': 
                y = gDat.y * ( gDat.rem / gDat.time);
                break;
            case 'dn': 
                y = gDat.y + (canvash - gDat.y) * (1- gDat.rem / gDat.time);
                break;
            case 'lt': 
                x = gDat.x * ( gDat.rem / gDat.time);
                break;  
            case 'rt': 
                x = gDat.x + (canvasw - gDat.x) * (1- gDat.rem / gDat.time);
                break;    
            case 'zm': 
            context.font = " " + gDat.ftWeight + ' ' + Math.floor(gDat.ftsize * gDat.effectSize * (1- (gDat.rem / gDat.time))) + 'px ' + fontType + ' ';
                break;                                                   
        };

        

        context.fillText( gDat.text,  x,  y );
        context.strokeText(gDat.text, x,  y );
    };
}

function fixPopup(gDat ,x,y, fillStyle,strokeStyle,fontType,  textAlign,textBaseline, context, canvash, canvasw){

    var resY, resX;

    if (gDat.rem > 0){
        context.fillStyle = fillStyle;
        context.strokeStyle = strokeStyle;
        context.font = gDat.ftWeight + ' ' + gDat.ftsize + ' ' + fontType ;
        context.textAlign = textAlign;
        context.textBaseline = textBaseline;
        resY = y;
        resX = x;
                        
        switch(gDat.effectStyle){
            case 'up': 
            resY = y * ( gDat.rem / gDat.time);
                break;
            case 'dn': 
            resY = y + (canvash - gDat.y) * (1- gDat.rem / gDat.time);
                break;
            case 'lt': 
            resX = x * ( gDat.rem / gDat.time);
                break;  
            case 'rt': 
            resX = x + (canvasw - gDat.x) * (1- gDat.rem / gDat.time);
                break;    
            case 'zm': 
            context.font = " " + gDat.ftWeight + ' ' + Math.floor(gDat.ftsize * gDat.effectSize * (1- (gDat.rem / gDat.time))) + 'px ' + fontType + ' ';
                break;                                                   
        };
        context.fillText( gDat.text,  resX,  resY );
        context.strokeText(gDat.text, resX,  resY );
    };
}

function addPopup(buffer,type, text, x, y, time, effectStyle, effectSize, ftsize, ftWeight, bCol, fCol)// type= 'lvl','lif','shp', 'sco', 'obj'; style= 'up', 'dn', 'lt', 'rt', 'zm'
{
    let dat = Object.create(gDat);

    dat.type = type;
    dat.text = text;
    dat.x = x;
    dat.y = y;
    dat.effectStyle =effectStyle;
    dat.effectSize=effectSize;
    dat.time = dat.rem = time;
    dat.ftsize = ftsize;
    dat.ftWeight = ftWeight;
    dat.fCol=fCol;
    dat.bCol=bCol;
    switch(type){
        case 'lvl': 
            buffer[0] = dat;
            break;
        case 'lif': 
            buffer[1] = dat;
            break;
        case 'shp': 
            buffer[2] = dat;
            break;  
        case 'sco': 
            buffer[3]=dat;
            break;    
        case 'obj': 
            buffer.push(dat);
            break;                                                   
    };
    
}

function DataDisplay(){
    /*
    Indices for score update displays:
    0: Level/Game
    1: Life
    2: Shield
    3: Score
    4 ... n:obj
    */

    variablePopup(gameData[0],' Arial ','center','middle', ctx, CHEIGHT, CWIDTH);

    // Level
    ctx.fillStyle = 'white';
    ctx.font = "bold 30px Arial";
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('Level: ' + rocket.level, 1160, 25);

    // Life
    ctx.fillStyle = 'red';
    ctx.font = "bold 30px Arial";
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(' : ' + rocket.lifes, 40, 25);
    let ShipIcon = new Image();
    ShipIcon.src = rocket.src;
    ctx.drawImage(ShipIcon, 10, 4, 30,30);

    fixPopup(gameData[1],120, 20,'red','red','bold 50px Arial ','left','middle', ctx);

    // shield
    ctx.fillStyle = 'deepskyblue';
    ctx.strokeStyle ='blue'
    ctx.font = "bold 30px Arial";
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(': ' + rocket.shield, 190, 25);
    ctx.strokeText(': ' + rocket.shield, 190, 25);
    let shieldIcon = new Image();
    shieldIcon.src='../img/ShipShield.png'
    ctx.drawImage(shieldIcon, 155, 8, 30,30);

    fixPopup(gameData[2],250, 20,'blue','skyblue','bold 50px Arial ','left','middle', ctx);
    

    // score
    ctx.fillStyle = 'yellow';
    ctx.font = '30px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Score: ' + hitcounter, 660, 25);
    

    fixPopup(gameData[3], 900, 20,'yellow','yellow','bold 50px Arial ','left','middle', ctx);
    
    // HitsReq
    ctx.fillStyle = 'yellow';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    var level = rocket.level + 1;
    var hReq = levels[rocket.level].hitsrequired - hitcounter;
    ctx.fillText('Level up '  + hReq , 930, 25);

    // Speed
    ctx.fillStyle = 'deepskyblue';
    ctx.strokeStyle ='blue'
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(' : ' + rocket.speed, 320, 25);
    ctx.strokeText(' : ' + rocket.speed, 320, 25);
    let speedIcon = new Image();
    speedIcon.src='../img/speed.png'
    ctx.drawImage(speedIcon, 290, 8, 30,30);
    
    // main gun 
    ctx.fillStyle = 'skyblue';
    ctx.strokeStyle ='blue'
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Gun 1:' , 400, 15);
    ctx.strokeText('Gun 1:' , 400, 15);
    //ctx.fillText(' ' + rocket.gun1.name , 440, 15);
    //ctx.strokeText(' ' + rocket.gun1.name, 440, 15);
    ctx.fillText('Power: ' + (rocket.poweradd + rocket.gun1.power), 400, 33);
    ctx.strokeText('Power: ' + (rocket.poweradd + rocket.gun1.power), 400, 33);
    ctx.fillText('Charge: ' , 400, 50);
    ctx.strokeText('Charge: ' , 400, 50);
    ctx.font = '50px Arial';
    ctx.fillText('∞' , 470, 53);
    ctx.strokeText('∞' , 470, 53);
    let gun1Icon = new Image();
    gun1Icon.src=rocket.gun1.src;
    ctx.drawImage(gun1Icon, 475, 0, 40,40);

    // Addon gun 
    ctx.fillStyle = 'skyblue';
    ctx.strokeStyle ='blue'
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Gun 2:' , 520, 15);
    ctx.strokeText('Gun 2:' , 520, 15);
    //ctx.fillText(' ' + rocket.gun1.name , 440, 15);
    //ctx.strokeText(' ' + rocket.gun1.name, 440, 15);
    ctx.fillText('Power: ' + (rocket.poweradd + rocket.gun2.power), 520, 33);
    ctx.strokeText('Power: ' + (rocket.poweradd + rocket.gun2.power), 520, 33);
    ctx.fillText('Charge: ' + rocket.gun2.charge, 520, 53);
    ctx.strokeText('Charge: ' + rocket.gun2.charge, 520, 53);
    /*ctx.fillText(' ' + rocket.gun2.name , 570, 15);
    ctx.strokeText(' ' + rocket.gun2.name , 570, 15);
    ctx.fillText('Power ' + rocket.gun2.power, 570, 30);
    ctx.strokeText('Power ' + rocket.gun2.power, 570, 30);*/
    let gun2Icon = new Image();
    gun2Icon.src=rocket.gun2.src
    ctx.drawImage(gun2Icon, 595, 0, 40,40);

    gameData.filter(u => u.type == 'obj').forEach(function(obj){
        variablePopup(obj,'Arial','left','middle', ctx, CHEIGHT, CWIDTH)
    })

}

function createHS(){
    
    

    const tabelle = document.getElementById('score');	  
    // schreibe Tabellenzeile
    for (var r = 1; r <= l; r++){
        const reihe = tabelle.insertRow(0);
        for (var i = 1; i <= 3; i++) {
            let inhalt = hsdata[r,i],
                zelle = reihe.insertCell();
            zelle.innerHTML = inhalt;	 
        }
    }
    
}

function draw(){
    ctx.drawImage(backgroundImage, 0, 0, CWIDTH,CHEIGHT);
    ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);

    
    
    ufos.filter(u => u.type == "endboss").forEach(function(boss){
        ctx.fillStyle =  'red';
        ctx.strokeStyle = 'yellow'
        ctx.font =  'bold 30px Arial ';
        ctx.textAlign =  'left';
        ctx.textBaseline =  'middle';
        ctx.fillText( boss.lifes ,  boss.x-60,   boss.y+  boss.height/2);
        ctx.strokeText( boss.lifes  ,  boss.x-60,   boss.y+  boss.height/2);
    });

    ufos.forEach(function(ufo){
        ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);  
        if (KEY_Q) {
                ctx.fillStyle =  'red';
                ctx.strokeStyle = 'yellow'
                ctx.font =  ' bold 20px Arial ';
                ctx.textAlign =  'left';
                ctx.textBaseline =  'middle';
                ctx.fillText( "x " + ufo.x ,  ufo.x,   ufo.y+  00);
                ctx.fillText( "y " + ufo.y ,  ufo.x,   ufo.y+  20);
                ctx.fillText( "s " + ufo.speed ,  ufo.x,   ufo.y+  40);
                ctx.fillText( "bs " + ufo.type ,  ufo.x,   ufo.y+  60);
                ctx.strokeText( "x " + ufo.x ,  ufo.x,   ufo.y+  00);
                ctx.strokeText( "y " + ufo.y ,  ufo.x,   ufo.y+  20);
                ctx.strokeText( "s " + ufo.speed ,  ufo.x,   ufo.y+  40);
                ctx.strokeText( "bs " + ufo.type ,  ufo.x,   ufo.y+  60);
                
                }; 
    });
    shots.forEach(function(shot){
        ctx.drawImage(shot.img, shot.x, shot.py, shot.pwidth, shot.pheight)
    });
    
    DataDisplay()
    requestAnimationFrame(draw);
}

