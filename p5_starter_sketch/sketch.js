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
// Declare variable to store VideoRecorder object
let videoRecorder;
// Declare variables for capture and buttons
let capture;
let recordButton, stopButton, downloadButton, deleteButton;
// Declare a variable to count deletions
let deleteCount;
// Declare variables to store icons for buttons
let recordIcon, stopIcon, downloadIcon, deleteIcon;

// Preload function to load images before setup
function preload() {
  // Load icons for buttons
  recordIcon = loadImage('record_icon.png');
  stopIcon = loadImage('stop_icon.png');
  downloadIcon = loadImage('download_icon.png');
  deleteIcon = loadImage('delete_icon.png');
}

// Setup function
function setup() {
  // Create canvas with the size of the window
  createCanvas(windowWidth, windowHeight);
  // Initialize capture setup
  setupCapture();
}

// Function to set up capture
function setupCapture() {
  // Set background color
  background('#ff6666');
  
  // Calculate capture size to fit the canvas
  const captureWidth = min(windowWidth, windowHeight) * 0.9;
  const captureHeight = captureWidth * 0.75; // Assuming 4:3 aspect ratio
  
  // Create capture device with video and audio
  capture = createCapture({ video: true, audio: true }, setupButtons);
  // Set capture size
  capture.size(captureWidth, captureHeight);
  // Mute capture audio
  capture.volume(0);
  // Hide capture element
  capture.hide();
  
  // Initialize video recorder with the capture device
  videoRecorder = new p5.VideoRecorder(capture);
}

// Draw function
function draw() {
  // Center the capture on the canvas
  const x = (windowWidth - capture.width) / 2;
  const y = (windowHeight - capture.height) / 2;
  // Display capture on the canvas
  image(capture, x, y);

  // If currently recording, draw red indicator
  if (videoRecorder.recording) {
    const indicatorX = x + capture.width - 50; // Adjusted to be relative to the capture canvas
    const indicatorY = y + 50; // Adjusted to be relative to the capture canvas
    noStroke();
    fill(200, 40, 20);
    circle(indicatorX, indicatorY, 50);
  }
}

// Function to set up buttons
function setupButtons() {
  // Define button size and gap between buttons
  const buttonSize = 50;
  const buttonGap = 10;
  // Calculate Y position for buttons
  const buttonY = (windowHeight + capture.height) / 2 + buttonGap; 

  // Remove existing buttons if any
  if (recordButton) {
    recordButton.remove();
    stopButton.remove();
    downloadButton.remove();
    deleteButton.remove();
  }

  // Calculate X position for buttons to center them horizontally
  const buttonX = (windowWidth - (4 * buttonSize + 3 * buttonGap)) / 2;

  // Create record button
  recordButton = createImg('record_icon.png','record button');
  recordButton.size(buttonSize, buttonSize);
  recordButton.position(buttonX, buttonY);
  recordButton.mousePressed(startRecording);

  // Create stop button and hide it initially
  stopButton = createImg('stop_icon.png', 'stop button');
  stopButton.size(buttonSize, buttonSize);
  stopButton.position(buttonX + buttonSize + buttonGap, buttonY);
  stopButton.hide();

  // Create download button and hide it initially
  downloadButton = createImg('download_icon.png', 'download button');
  downloadButton.size(buttonSize, buttonSize);
  downloadButton.position(buttonX + 2 * (buttonSize + buttonGap), buttonY);
  downloadButton.hide();

  // Create delete button and hide it initially
  deleteButton = createImg('delete_icon.png', 'delete button');
  deleteButton.size(buttonSize, buttonSize);
  deleteButton.position(buttonX + 3 * (buttonSize + buttonGap), buttonY);
  deleteButton.hide();
}

// Function to start recording
function startRecording() {
  // Show stop button and start video recording
  stopButton.show();
  videoRecorder.start();
  // Set stop button to stop recording when pressed
  stopButton.mousePressed(stopRecording);
}

// Function to stop recording
function stopRecording() {
  // Stop video recording
  videoRecorder.stop();
  // Set download button to save recording and redirect to end.html
  downloadButton.mousePressed(() => {videoRecorder.save("webcam"); window.location.href='end.html';});
  downloadButton.show();
  // Show delete and download buttons, hide record and stop buttons
  deleteButton.show();
  recordButton.hide();
  stopButton.hide();
}

// Function to delete recording
function deleteStuff() {
  // Increment delete count, hide delete and download buttons, and set up buttons again
  deleteCount += 1;
  deleteButton.hide();
  downloadButton.hide();
  setupButtons();
}

// Function to handle window resize
function windowResized() {
  // Resize canvas to fit window and adjust capture setup
  resizeCanvas(windowWidth, windowHeight);
  setupCapture(); // Redraw background and adjust capture size
}
