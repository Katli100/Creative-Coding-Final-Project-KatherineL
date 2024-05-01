/* 
p5.video recorder
https://github.com/calebfoss/p5.videorecorder
-------------------
Example - Webcam

Record video and audio from webcam
Then display and download the recorded video
*/

/*
This code is modified for my final project use case
*/

//  Declare variable to store VideoRecorder object
let videoRecorder;
let capture;
let recordButton, stopButton, downloadButton, deleteButton;
let deleteCount;

function setup() {
  createCanvas(400, 400);
  
  //  Create a webcam capture with video and audio
  //  When the stream is ready, setup the buttons
  capture = createCapture({ video: true, audio: true }, setupButtons);
  //  Mute webcam audio to prevent feedback
  capture.volume(0);
  //  Hide capture element (because it will be displayed on canvas instead)
  capture.hide();
  
  //  Create a new VideoRecorder instance
  //    with webcam capture as input
  videoRecorder = new p5.VideoRecorder(capture);
  //  Set callback for when recording is completed
  //    and video file has been created
}

function draw() {
    image(capture, 0, 0, width, height);
    //  If recording
    if (videoRecorder.recording) {
      //  Display a red circle indicator
      noStroke();
      fill(200, 40, 20);
      circle(width - 50, 50, 50);
    }
}


//  Create buttons and hide all except record
function setupButtons() {
  recordButton = createButton("Record");
  recordButton.mousePressed(startRecording);
  stopButton = createButton("Stop");
  stopButton.hide();
  downloadButton = createButton("Download");
  downloadButton.hide();
  deleteButton = createButton("Delete take")
  deleteButton.hide()
}


function startRecording() {
  //  Set buttons to manage recording
  //    and show hidden buttons
  stopButton.mousePressed(() => videoRecorder.stop());
  stopButton.show();
  deleteButton.show();
  downloadButton.mousePressed(() => videoRecorder.save("webcam"));
  downloadButton.show();
}

function stopRecording() {
  downloadButton.mousePressed(() => videoRecorder.save("webcam"));
  downloadButton.show();
  deleteButton.show();
  deleteButton.mousePressed(deleteCount +=1)
  console.log(deleteCount)

}