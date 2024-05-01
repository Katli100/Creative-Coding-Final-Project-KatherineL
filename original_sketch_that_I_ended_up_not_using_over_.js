// This was the original sketch I was using to capture video using p5capture(<script src="https://cdn.jsdelivr.net/npm/p5.capture@1.4.1/dist/p5.capture.umd.min.js"></script>)
//, but then found out it can ONLY capture video and not video and audio. 

let webcam;
let date = new Date();
let day = date.getDate();
let hour = date.getHours();
let minute = date.getMinutes();
let month = date.getMonth() + 1; // Month is 0-indexed, so we add 1
let second = date.getSeconds();
let year = date.getFullYear();
let record_btn;
let is_recording = false;
let capture;
let num_capture = 0;
let email_entry;
let age_entry;
let mic;


P5Capture.setDefaultOptions({
  format: "mp4",
  framerate: 20,
  quality: 0.7,
  width: 500,
  disableUi: true,
  // verbose: true,
});

function setup() {
  createCanvas(2000,1000);
  createSpan("What's your email?")
  email_entry = createInput("email")
  createSpan("How old are you?")
  age_entry = createInput()
 
  webcam = createCapture(VIDEO)
  webcam.size(1080, 500);
  webcam.hide();
  record_btn = createButton('Record');
  record_btn.position(20, height - 50);
  record_btn.mousePressed(toggle_recording);
  capture = P5Capture.getInstance();

  mic = new p5.AudioIn();
}

function draw() {
  background(255);
  image(webcam, 0, 0, width, height)
}

function toggle_recording(){
  if (!is_recording) {
    capture.start(); // Start recording
    mic.connect();
    mic.start();
    console.log("recording started")
		num_capture +=1;
		console.log(num_capture)
    is_recording = true;
    record_btn.html('Stop');
  } else {
    capture.stop(); // Stop recording
    mic.stop();
    mic.disconnect();
    console.log("recording stopped")
    is_recording = false;
    record_btn.html('Record');
  }
}


function baseFilename(date) {
  const zeroPadding = (n) => n.toString().padStart(2, "0");
  const years = date.getFullYear();
  const months = zeroPadding(date.getMonth() + 1);
  const days = zeroPadding(date.getDate());
  const hours = zeroPadding(date.getHours());
  const minutes = zeroPadding(date.getMinutes());
  const seconds = zeroPadding(date.getSeconds());
  return `${years}${months}${days}-${hours}${minutes}${seconds}`;
}

