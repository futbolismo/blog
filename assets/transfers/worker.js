onmessage = function(e) {
  console.log('Worker: Message received from main script');
  var workerResult = e.data;
  console.log('Worker: Posting message back to main script');
  postMessage(workerResult);
}
