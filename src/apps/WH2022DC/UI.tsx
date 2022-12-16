import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import ans2 from './assets/images/ans2.png';
import controllerimg from './assets/images/controller.png';
import floortile from './assets/images/floor tile.png';
import fork from './assets/images/fork.png';
import loadingScreen from './assets/images/loading.png';
import puddle from './assets/images/puddle.png';
import startscreen from './assets/images/start screen.png';
import tabletile from './assets/images/table tile.png';
import treasurechest from './assets/images/treasure chest.png';
import treasurechestpart from './assets/images/treasure chest partial.png';
import treasurechestopen from './assets/images/treasure chest open.png';
import waffle from './assets/images/waffle character.png';
import "./assets/game.css";


function copy(arr: number[][]){
    let newarr = [];
    for(let i = 0; i < arr.length; i++){
        newarr.push(arr[i].slice());
    }
    return newarr;
}

// 0 = empty, 1 = floor tile, 2 = table tile, 3 = fork, 4 = puddle, 5 = treasure chest, 6 = treasure chest partially open, 7 = treasure chest open
// game layout with a grid of tiles 10 x 29
// tile size is 18x18

var layout = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,2,0,0,0,0,0,0,2,2,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,2,2,0,0,4,0,2,2,2,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,3,3,3,3,1,1,1]
];

var backuplayout = copy(layout);

interface Sprites {
    [key: string]: string | HTMLImageElement
}

const UI = () => {
    let gravity = 0.5
    let canvas = useRef(null);
    let cntx = useRef(null);
    let stscreen = useRef(null);
    let sprites = useRef<Sprites>({});
    let spritesLoaded = useRef(0);
    let introAnimation = useRef(false);
    let playing = useRef(false);
    let playerCoords = useRef({x: 0, y: 0});
    let playerVel = useRef({x: 0, y: 0});
    let jumping = useRef(false);
    let onGround = useRef(true);
    let slipping = useRef(0);
    let screenScroll = useRef(0);
    let prevInputs = useRef('');
    let konamiUsed = useRef(false);
    let konamiAnimation = useRef(0);
    let completed = useRef(false);
    let completedAnimation = useRef(0);
    let keyspressed = useRef({up: false, down: false, left: false, right: false, a: false, b: false, start: false, select: false});
    let [loading, setLoading] = useState(true);
    let [page, setPage] = useState(0);
    let lastTime = useRef(0);

    // load sprites`
    useEffect(() => {
        let toload: any = {controllerimg, floortile, fork, puddle, tabletile, treasurechest, treasurechestpart, treasurechestopen, ans2, waffle};
        for (let key in toload){
            let img = new Image();
            img.src = toload[key];
            img.onload = () => {
                sprites.current[key] = img;
                spritesLoaded.current++;
                if (spritesLoaded.current === Object.keys(toload).length){
                    setLoading(false);
                }
            }
        }
    }, []);

    // load pages
    useEffect(() => {
        canvas.current.width = 360;
        canvas.current.height = 180;
        let ctx = canvas.current.getContext('2d');
        cntx.current = ctx;
        
        if (page === 0){
            if (loading){
                let img = new Image();
                img.src = loadingScreen;
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, 360, 180);
                }
                return;
            }
            let img = new Image();
            img.src = startscreen;
            img.onload = () => {
                stscreen.current = img;
                ctx.drawImage(img, 0, 0, 360, 180);
            }  
        }
        else if (page === 1){
            ctx.fillStyle = '#d8bd9f';
            ctx.fillRect(0, 0, 360, 180);
            drawBackground(0);
            playerAnimation(18);
        }
        
    }, [page, loading]);

    function getMouseXY(e: any){
        let rect = canvas.current.getBoundingClientRect();
        let scalex = canvas.current.width / rect.width;
        let scaley = canvas.current.height / rect.height;
        let x = Math.floor((e.clientX - rect.left) * scalex);
        let y = Math.floor((e.clientY - rect.top) * scaley);
        return {x: x, y: y};
    }

    function mouseMove(e: any){
        let ctx = canvas.current.getContext('2d');
        if (page === 0){
            let {x, y} = getMouseXY(e);
            ctx.clearRect(0, 0, 360, 180);
            ctx.drawImage(stscreen.current, 0, 0, 360, 180);
            if (x >= 114 && x <= 244 && y >= 108 && y <= 144){
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.fillRect(114, 108, 130, 36);
            }

        }
    }
    function mouseClick(e: any){
        if (page === 0){
            let {x, y} = getMouseXY(e);
            if (x >= 114 && x <= 244 && y >= 108 && y <= 144){
                setPage(1);
            }
        }
    }

    function drawBackground(x: number) {
        let ctx = cntx.current;
        ctx.fillStyle = '#d8bd9f';
        ctx.fillRect(0, 0, 360, 180);
        for (let i = layout.length - 1; i >= 0; i--){
            for (let j = 0; j < layout[i].length; j++){
                let tile = layout[i][j];
                if (tile === 1){
                    ctx.drawImage(sprites.current.floortile, j * 18 - x, i * 18);
                }
                else if (tile === 2){
                    ctx.drawImage(sprites.current.tabletile, j * 18 - x, i * 18);
                }
                else if (tile === 3){
                    ctx.drawImage(sprites.current.fork, j * 18 - x, i * 18);
                }
                else if (tile === 4){
                    ctx.drawImage(sprites.current.puddle, j * 18 - x + 5, i * 18 + 14);
                }
                else if (tile === 5){
                    ctx.drawImage(sprites.current.treasurechest, j * 18 - x, i * 18);
                }
                else if (tile === 6){
                    ctx.drawImage(sprites.current.treasurechestpart, j * 18 - x, i * 18);
                }
                else if (tile === 7){
                    ctx.drawImage(sprites.current.treasurechestopen, j * 18 - x, i * 18 - 3);
                }
            }
        }

        ctx.drawImage(sprites.current.controllerimg, 0, 0);
        ctx.fillStyle='white';
        if (keyspressed.current.up){
            ctx.fillRect(7, 13, 2, 2);
        }
        if (keyspressed.current.down){
            ctx.fillRect(7, 19, 2, 2);
        }
        if (keyspressed.current.left){
            ctx.fillRect(4, 16, 2, 2);
        }
        if (keyspressed.current.right){
            ctx.fillRect(10, 16, 2, 2);
        }
        if (keyspressed.current.start){
            ctx.fillRect(21, 19, 3, 1);
        }
        ctx.fillStyle='pink';
        if (keyspressed.current.a){
            ctx.fillRect(33, 18, 2, 2);
        }
        if (keyspressed.current.b){
            ctx.fillRect(28, 18, 2, 2);
        }

    }

    // player will appear from the bottom of the screen move to the row 5th from the bottom, then land on the ground (4th row from the bottom)
    // framerate is 30fps
    function playerAnimation(x: number) {
        let ctx = cntx.current;
        let y = 180;
        let speed = -5;
        function animate() {
            y += speed;
            speed += 0.1;
            ctx.clearRect(0, 0, 360, 180);
            drawBackground(0);
            ctx.drawImage(sprites.current.waffle, x, y);
            if (speed > 0 && y >= 18*6){
                y = 18*6;
                introAnimation.current = false;
                playing.current = true;
                playerCoords.current = {x: x, y: 18*6};
                requestAnimationFrame(drawScene);
            }
            else{
                let mils = Date.now();
                while (Date.now() - mils < 10){}
                requestAnimationFrame(animate);
            }
        }
        animate();
    }

    function drawScene(time: number){
        if (time - lastTime.current < 1000/45){
            requestAnimationFrame(drawScene);
            return;
        }
        lastTime.current = time;

        let ctx = cntx.current;
        ctx.clearRect(0, 0, 360, 180);
        let coords = playerCoords.current;
        screenScroll.current = Math.min(Math.max(0, coords.x - 180), 18*(layout[0].length-20));
        drawBackground(screenScroll.current);
        ctx.drawImage(sprites.current.waffle, coords.x - screenScroll.current, coords.y);
        let pressed = keyspressed.current;

        if (konamiUsed.current && konamiAnimation.current < 140){
            playerCoords.current = {x: 18, y: 18*6};
            if (konamiAnimation.current > 15){
                let curscroll = (konamiAnimation.current - 15)*3;
                if (curscroll < 18*(layout[0].length-20)) drawBackground(curscroll);
                else{
                    drawBackground(18*(layout[0].length-20));
                    if (curscroll === 18*(layout[0].length-20) + 15*3) layout[6][25] = 2;
                    if (curscroll === 18*(layout[0].length-20) + 17*3) layout[5][25] = 2;
                    if (curscroll === 18*(layout[0].length-20) + 19*3) layout[6][24] = 2;
                    if (curscroll === 18*(layout[0].length-20) + 21*3) layout[6][23] = 2;
                    if (curscroll === 18*(layout[0].length-20) + 23*3) layout[5][24] = 2;
                    if (curscroll === 18*(layout[0].length-20) + 25*3) layout[4][25] = 2;
                    if (curscroll === 18*(layout[0].length-20) + 27*3) layout[4][26] = 2;
                }
            }

            konamiAnimation.current++;
            if (playing.current){
                requestAnimationFrame(drawScene);
            }
            return;
        }

        if (completed.current && onGround.current){
            if (completedAnimation.current < 10){}
            else if (completedAnimation.current === 10){ // jump up
                playerCoords.current.y--; 
                onGround.current = false;
                playerVel.current.y = -6;
            }
            else {
                if (playerCoords.current.x < 18*layout[0].length){
                    playerCoords.current.x += 2;
                    if (playerCoords.current.x >= 18*layout[0].length && completedAnimation.current > 60) completedAnimation.current = 55;
                }
                else {
                    
                    if (completedAnimation.current === 60) layout[6][layout[0].length - 2] = 6;
                    if (completedAnimation.current === 70) layout[6][layout[0].length - 2] = 7;
                    if (completedAnimation.current >= 80 && completedAnimation.current < 100) {
                        ctx.drawImage(sprites.current.ans2, 335, 18*5 + 10 - (completedAnimation.current - 80));
                    }
                    if (completedAnimation.current >= 100) {
                        let pos = Math.sin((completedAnimation.current - 100) / 10)*3;
                        ctx.drawImage(sprites.current.ans2, 335, 18*5 - 10 - pos);
                    }
                }
            }

            completedAnimation.current++;

            if (playing.current){
                requestAnimationFrame(drawScene);
            }
            return;
        }

        if (slipping.current === 0){
            if (pressed.right) playerVel.current.x = 2;
            else if (pressed.left) playerVel.current.x = -2;
            else playerVel.current.x = 0;
        
            if (pressed.up && !jumping.current && onGround.current){
                playerVel.current.y = -6;
                jumping.current = true;
            }
        }
        else {
            slipping.current -= 1;
        }

        playerVel.current.y += gravity;

        coords.x += playerVel.current.x;
        if (coords.x < 0) coords.x = 0;
        coords.y += playerVel.current.y;
        collisions();

        if (playing.current){
            requestAnimationFrame(drawScene);
        }
    }

    function rectOverlap(c1: any, w: number, h: number, c2: any, w2: number, h2: number){
        return c1.x < c2.x + w2 && c1.x + w > c2.x && c1.y < c2.y + h2 && c1.y + h > c2.y;
    }
    function bounds(x: number, low: number, hi: number){
        if (x < low) return low;
        if (x > hi) return hi;
        return x;
    }

    function endGame(){
        playing.current = false;
        playerVel.current = {x: 0, y: 0};
        layout = copy(backuplayout);
        playerCoords.current = {x: 0, y: 0};
        playerVel.current = {x: 0, y: 0};
        completed.current = false;
        completedAnimation.current = 0;
        konamiUsed.current = false;
        konamiAnimation.current = 0;
        setPage(0);
    }

    function collisions(){
        // load the 9 blocks around the player
        let coords = playerCoords.current;
        onGround.current = false;
        let collided = false;

        for (let i = -1; i <= 1; i++){
            for (let j = -1; j <= 1; j++){
                let blockCoords = {x: bounds(Math.floor(coords.x/18) + j, 0, layout[0].length - 1), y: bounds(Math.floor(coords.y/18) + i, 0, layout.length - 1)};
                let block = layout[blockCoords.y][blockCoords.x];
                blockCoords.x *= 18;
                blockCoords.y *= 18;
                let vel = playerVel.current;
                
                // ground or table
                if (block === 1 || block === 2){
                    if (rectOverlap(coords, 18, 18, blockCoords, 18, 18)){
                        // if collision is from below
                        if (vel.y > 0 && blockCoords.y > coords.y){
                            coords.y = blockCoords.y - 18;
                            vel.y = 0;
                            jumping.current = false;
                            onGround.current = true;
                        }
                        collided = true;
                    }
                    if (rectOverlap(coords, 18, 18, blockCoords, 18, 18)){
                        // if collision is from the left
                        if (vel.x < 0 && blockCoords.x < coords.x){
                            coords.x = blockCoords.x + 18;
                            vel.x = 0;
                            slipping.current = 0;
                        }
                        // if collision is from the right
                        if (vel.x > 0 && blockCoords.x > coords.x){
                            coords.x = blockCoords.x - 18;
                            vel.x = 0;
                            slipping.current = 0;
                        }
                        collided = true;
                    }
                }
                
                // fork
                if (block === 3){
                    let spike = {...blockCoords};
                    spike.x += 5;
                    spike.y += 2;
                    if (rectOverlap(coords, 18, 18, spike, 7, 16)){
                        collided = true;
                        endGame();
                    }
                }
                
                // puddle
                if (block === 4){
                    let spike = {...blockCoords};
                    spike.x += 5;
                    spike.y += 14;
                    if (playerVel.current.x !== 0 && rectOverlap(coords, 18, 18, spike, 10, 4)){
                        if (slipping.current === 0) slipping.current = 15;
                    }
                }

                // treasure chest{
                if (block === 5){
                    if (rectOverlap(coords, 18, 18, blockCoords, 36, 18)){
                        completed.current = true;
                    }    
                
                }

                
            }
        }

        if (!collided){
            onGround.current = false;
        }

    }

    function keyDown(e: any){
        let key = e.key;
        if (key === 'ArrowUp'){
            keyspressed.current.up = true;
            prevInputs.current += 'u';
        }
        else if (key === 'ArrowDown'){
            keyspressed.current.down = true;
            prevInputs.current += 'd';
        }
        else if (key === 'ArrowLeft'){
            keyspressed.current.left = true;
            prevInputs.current += 'l';
        }
        else if (key === 'ArrowRight'){
            keyspressed.current.right = true;
            prevInputs.current += 'r';
        }
        else if (key.toLowerCase() === 'a'){
            keyspressed.current.a = true;
            prevInputs.current += 'a';
        }
        else if (key.toLowerCase() === 'b'){
            keyspressed.current.b = true;
            prevInputs.current += 'b';
        }
        else if (key.toLowerCase() === 's'){
            keyspressed.current.start = true;
            prevInputs.current += 's';
        }

        let konami = 'uuddlrlrba';
        if (prevInputs.current.length > konami.length) prevInputs.current = prevInputs.current.substring(1);
        if (prevInputs.current === konami){
            konamiUsed.current = true;
        }

        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            case 32: e.preventDefault(); break; // Space
            default: break; // do not block other keys
        }

    }
    function keyUp(e: any){
        let key = e.key;
        if (key === 'ArrowUp') keyspressed.current.up = false;
        else if (key === 'ArrowDown')  keyspressed.current.down = false;
        else if (key === 'ArrowLeft')  keyspressed.current.left = false;
        else if (key === 'ArrowRight') keyspressed.current.right = false;
        else if (key.toLowerCase() === 'a') keyspressed.current.a = false;
        else if (key.toLowerCase() === 'b') keyspressed.current.b = false;
        else if (key.toLowerCase() === 's') keyspressed.current.start = false;
    }

    function exit(){
        playing.current = false;
        layout = copy(backuplayout);
        playerCoords.current = {x: 0, y: 0};
        playerVel.current = {x: 0, y: 0};
        completed.current = false;
        completedAnimation.current = 0;
        konamiUsed.current = false;
        konamiAnimation.current = 0;
    }
    
    return (
      <canvas ref={canvas} id='wh2022dc-game-canv' tabIndex={0} onMouseMove={mouseMove} onClick={mouseClick} onKeyDown={keyDown} onKeyUp={keyUp} className='pixelated' style={{width: '100%', height: '100%', outline: 'none'}}></canvas>
    )
}

export default UI