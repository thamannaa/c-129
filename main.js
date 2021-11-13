leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
song="";
scoreleftwrist=0;
scorerightwrist=0;
function preload(){
song=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotposes);
}

function gotposes(results){
if(results.length>0){
    console.log(results);
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    console.log("leftwrist x="+leftwristx+"leftwrist y="+leftwristy);
    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    console.log("rightwrist x="+rightwristx+"rightwrist y="+rightwristy);
    scorerightwrist=results[0].pose.keypoints[10].score;
    scoreleftwrist=results[0].pose.keypoints[9].score;
}
}

function modelLoaded(){
    console.log("posenet model is initialized");
}

function draw(){
image(video,0,0,600,500);
fill("#FF0000");
stroke("#FF0000");
circle(rightwristx,rightwristy,20);
if(rightwristy>0&&rightwristy<=100){
  document.getElementById("speed_label").innerHTML="speed=0.5x";
  song.rate(0.5); 
  
}
else if(rightwristy>100&&rightwristy<=200){
    document.getElementById("speed_label").innerHTML="speed=1x";
    song.rate(1);
}
else if(rightwristy>200&&rightwristy<=300){
    document.getElementById("speed_label").innerHTML="speed=1.5x";
    song.rate(1.5);
}
else if(rightwristy>300&&rightwristy<=400){
    document.getElementById("speed_label").innerHTML="speed=2x";
    song.rate(2);
}
else if(rightwristy>400&&rightwristy<=500){
    document.getElementById("speed_label").innerHTML="speed=2.5x";
    song.rate(2.5);
}
if(scoreleftwrist>0.2){
    circle(leftwristx,leftwristy,20);
    innumberleftwristy=Number(leftwristy);
    removedecimals=floor(innumberleftwristy);
    volume=removedecimals/500;
    document.getElementById("volume_label").innerHTML="volume="+volume;
    song.setVolume(volume);  
}

}

function music(){
song.play();
song.setVolume(1);
song.rate(1);
}