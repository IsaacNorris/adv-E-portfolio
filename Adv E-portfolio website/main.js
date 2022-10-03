const btn = document.querySelector('.btn');
const contactLink = document.querySelector('.cntLNK');
const cntLNKK = document.querySelector('.cntLNKK');
const contactPopUp = document.querySelector('.contactprt');

let DMstate = false;
let DM = false
let CPstate = false;

let Bkgclr = 'whitesmoke';
contactLink.onclick = () => {
    HandleCP();
}
cntLNKK.onclick = () => {
    HandleCPbtm();
}
btn.onclick = () => {
   HandleDM();
}
function HandleCPbtm(){
    if (CPstate == false) {
        contactPopUp.style.display = 'flex';

        CPstate = true;
        return;
    }
}
//turning ontact On and Off
function HandleCP(){
    if (CPstate == false) {
        contactPopUp.style.display = 'flex';

        CPstate = true;
        return;
    }
    if (CPstate == true) {
        contactPopUp.style.display = 'none';

        CPstate = false;
        return;
    }
}
//turning On and Off darkmode
function HandleDM(){
    if (DMstate == false) {
        document.querySelector('body').style.background = 'black';
        document.querySelector('body').style.color = 'whitesmoke';
        DM = true;
        Bkgclr = 'black';

        DMstate = true;
        return;
    }
    if (DMstate == true) {
        document.querySelector('body').style.background = 'whitesmoke';
        document.querySelector('body').style.color = 'black';
        Bkgclr = 'whitesmoke';
        DM = false;

        DMstate = false;
        return;
    }
}


//cool background FXs
var w = window.innerWidth; // get the width of the browser window
var h = window.innerHeight; // get the height of teh browser window
var bgcan   // something to store our canvas
var ctx     // somethign to store our canvas context

var x = 0   // store mouse pointer x
var y = 0;  // store mous pointer y

var initMS = 0  // store the milliseconds since page load
var pitwo = 2*Math.PI; // pi * 2 for drawing circles
var sndrop = [] // an array for storing each drawn object

function setupCanvas(){
    bgcan = document.createElement('canvas'); // make a new canvas object
    bgcan.id = 'bgcan'; // give it a name

    // set the webpage body's margin and padding to 0 (no gap between webpage contents and browser wall)
    document.body.style.margin = "0" 
    document.body.style.padding = "0"
    document.body.appendChild(bgcan); // adds the canvas to the webpage body

	bgcan.width = w;    // set width of canvas to window width
	bgcan.height = h;   // same as above for height
    bgcan.style.position = "fixed"   // set position (absolute,fixed)
    bgcan.style.top = "0"   // pixels from top
    bgcan.style.left = "0"  // pixels from left
    bgcan.style.zIndex = "-99"  // place behind 
	ctx = bgcan.getContext("2d");   // set canvas to 2d mode
}

// if window is resized do canvas too
function resize(){
    w = window.innerWidth;
    h = window.innerHeight;
    bgcan.width = w;
	bgcan.height = h;
}

// store mouse pointer position
function storemp(mpx,mpy){
    x = mpx;
    y = mpy
}


function update(){
    initMS=initMS+1 //increase our timer

    //clear canvas
    ctx.fillStyle = Bkgclr;
    ctx.fillRect(0, 0, w,h);
    ctx.beginPath()

    // create new drop 
    if(initMS%15 == 0){ // once every 4 frames
        // create new drop/snowflake at a random width and add to array
        sndrop.push({posx:Math.random()*w,posy:-10,size:1+Math.floor(Math.abs(Math.sin(initMS*0.1))*10)})
    }

    ctx.fillStyle='#ff8001'; // set drop colour

    //draw drop falling/flowwing
    sndrop.forEach(function(item,index){
        ctx.beginPath();    // start a new drawing path
		ctx.arc(item.posx,item.posy,item.size,0,pitwo);         // draw a filled circle
		//item.posx += Math.sin(initMS*0.01) * item.size*0.15 ;   //add hosrizontal  motion
		item.posy += item.size*0.15;    //add vertical motion
		ctx.fill(); // fill the drawn shape(works as endpath)

        // if item is off screen
		if(item.posy > ((item.size*2)+h)){
            sndrop.splice( index, 1 ); // removes element at index position
		}
    });

    // make drop avoid mouse
    sndrop.forEach(function(item,index){
        //is close to mp
        var xdist = (item.posx - x) // x distance from mouse
        var ydist = (item.posy - y) // y distance from mouse
        var squaredDist = xdist * xdist + ydist * ydist // squared distance
        var incircl = (squaredDist < 50000) // is less than roughly 707 squared
        var invertCircle = (50000 - squaredDist)/50000 //0-1 range ofr items in 707px range

        //if in range
        if(incircl){
            item.posx +=xdist * invertCircle * 0.05 // move away from mouse
            item.posy +=ydist * invertCircle * 0.05
        }
    });
}



// MAIN //
// when page finishes loading
window.addEventListener("load", function(){
    // create and add canvas
    setupCanvas("bgcanvas");

    // run 1 frame every 16 milliseconds
    window.setInterval(update, 16);

    // listen for resize event from browser
    window.addEventListener('resize', resize, false);

    // when mouse  moves
    onmousemove = function(e){ storemp(e.x, e.y)} 
});

