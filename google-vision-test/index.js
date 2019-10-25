const express = require("express");
const app = express();

async function quickstart() {
  // Imports the Google Cloud client library
  const vision = require("@google-cloud/vision");

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./apiKey.json"
  });

  // Performs label detection on the image file
  const [result] = await client.documentTextDetection("./receipt.jpg");
  console.log(result);
  const labels = result.labelAnnotations;
  console.log("Labels:");
  labels.forEach(label => console.log(label.description));
}
quickstart();
console.log("hello");

app.listen(5000, () => {
  console.log("listening on  port 5000");
});
