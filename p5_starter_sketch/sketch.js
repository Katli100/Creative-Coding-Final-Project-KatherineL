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
let recordIcon, stopIcon, downloadIcon, deleteIcon,nextIcon; 
let sceneProgress = false;
let currentSceneIndex = 0;



function preload() {
  recordIcon = loadImage('record_icon.png');
  stopIcon = loadImage('stop_icon.png');
  downloadIcon = loadImage('download_icon.png');
  deleteIcon = loadImage('delete_icon.png');
  nextIcon = loadImage('arrowIcon.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupCapture();

}

function nextScene() {
  if (sceneProgress) {
    currentSceneIndex++;
    if (currentSceneIndex >= scenes.length) {
      currentSceneIndex = 0;
    }
    sceneProgress = false; // Reset scene progress
    console.log("Next scene index:", currentSceneIndex); // Log the current scene index
  }
}


function setupCapture() {
  background('#ff6666');
  // Adjust capture size to fit the canvas
  const captureWidth = min(windowWidth, windowHeight) * 0.9;
  const captureHeight = captureWidth * 0.75; // Assuming 4:3 aspect ratio
  capture = createCapture({ video: true, audio: true }, setupButtons);
  capture.size(captureWidth, captureHeight);
  capture.volume(0);
  capture.hide();
  
  videoRecorder = new p5.VideoRecorder(capture);
}

function draw() {
  // Center the capture
  scenes[currentSceneIndex]();

}

function setupButtons() {
  let buttonY;
  const buttonSize = 50;
  const buttonGap = 10;

  // Remove existing buttons if any
  if (recordButton) {
    recordButton.remove();
    stopButton.remove();
    downloadButton.remove();
    deleteButton.remove();
  }

  // Center buttons horizontally
  const buttonX = (windowWidth - (4 * buttonSize + 3 * buttonGap)) / 2;
  if (currentSceneIndex === 0) { // Assuming scene 1
    buttonY = height / 2 + 50 + buttonSize + buttonGap; // Position below the text box
  } else {
    buttonY = (windowHeight + capture.height) / 2 + buttonGap; // Center vertically
  }

  // Show buttons only if the current scene is scene 4
  if (currentSceneIndex === 3) {
    recordButton = createImg('record_icon.png','record button');
    recordButton.size(buttonSize, buttonSize);
    recordButton.position(buttonX, buttonY);
    recordButton.mousePressed(startRecording);

    stopButton = createImg('stop_icon.png', 'stop button');
    stopButton.size(buttonSize, buttonSize);
    stopButton.position(buttonX + buttonSize + buttonGap, buttonY);
    stopButton.hide();

    downloadButton = createImg('download_icon.png', 'download button');
    downloadButton.size(buttonSize, buttonSize);
    downloadButton.position(buttonX + 2 * (buttonSize + buttonGap), buttonY);
    downloadButton.hide();

    deleteButton = createImg('delete_icon.png', 'delete button');
    deleteButton.size(buttonSize, buttonSize);
    deleteButton.position(buttonX + 3 * (buttonSize + buttonGap), buttonY);
    deleteButton.hide();
  } else{
        // Button with arrow icon
        nextButton = createImg('arrowIcon.png', 'next button')
        nextButton.size(buttonSize, buttonSize);
        nextButton.position(buttonX + 3 * (buttonSize + buttonGap), buttonY)
        nextButton.mousePressed(nextScene);
        console.log("nextbutton")
  }
}

function startRecording() {
  // Set buttons to manage recording
  stopButton.show();
  videoRecorder.start();
  stopButton.mousePressed(stopRecording);
}

function stopRecording() {
  videoRecorder.stop();
  downloadButton.mousePressed(() => videoRecorder.save("webcam"));
  downloadButton.show();
  deleteButton.show();
  deleteButton.mousePressed(deleteStuff);
  recordButton.hide();
  stopButton.hide();
}

function deleteStuff() {
  deleteCount += 1;
  deleteButton.hide();
  downloadButton.hide();
  setupButtons();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupCapture(); // Redraw background and adjust capture size
}

let scenes = [
  function scene1() {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text("Scene 1", width / 2, height / 2);
    // Text input
    let input = createInput();
    input.position(width / 2 - 100, height / 2 + 50);


  },
  function scene2() {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text("Scene 2", width / 2, height / 2);

  },
  function scene3() {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text("Scene 3", width / 2, height / 2);

  },
  function scene4() {
    const x = (windowWidth - capture.width) / 2;
    const y = (windowHeight - capture.height) / 2;
    image(capture, x, y);
  
    if (videoRecorder.recording) {
      // Draw the red indicator at the top right corner of the capture canvas
      const indicatorX = x + capture.width - 50; // Adjusted to be relative to the capture canvas
      const indicatorY = y + 50; // Adjusted to be relative to the capture canvas
      noStroke();
      fill(200, 40, 20);
      circle(indicatorX, indicatorY, 50);
    }
  },
  function scene5() {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text("Final Scene", width / 2, height / 2);
  }
];