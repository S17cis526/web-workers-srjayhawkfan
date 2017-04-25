/** @function permutations
 * Computes a list of all permutations of [1,2,...,size].
 * This is a brute-force approach with exponential complexity
 * on the size of n.
 * @param {integer} size, a non-negative integer
 * @returns {Array} answer, an array of all permutations
 */
function permutations(size) {
  if(size >= 0) { // Sanity check - we can't create negative permutations.
    if(size == 0) { // Base case for recursion
      // only 1 permuation for a 0-element array - an empty array
      return [[]];
    } else { // Reduction case for recursion
      // compute permutations of a list one size smaller
      var sublist = permutations(size - 1);
      var answer = [];
      sublist.forEach(function(permutation) {
        // insert size in all possible positions in permutation
        for(var i = 0; i < permutation.length + 1; i++) {
          answer.push(
            // use Array.prototype.slice to create two shallow
            // copies of the array before and after position i.
            // Then concatenate these back together with i in the
            // middle, and store them as a parital answer.
            permutation.slice(0, i).concat(size, permutation.slice(i))
          );
        }
      });
      // return the permutations
      return answer;
    }
  }
}

/**
 * When the clear-permutations button is clicked, empty
 * the list of permutations.
 */
$('#clear-permutations').on('click', function(event){
  event.preventDefault();
  $('#permutation-results').empty();
})

/**
 * When the calculate-in-main button is clicked,
 * calculate the permutations in the main thread.
 */
$('#permute-in-main').on('click', function(event) {
  event.preventDefault();
  var n = $('#n').val();

  // Prepare for permutations
  $('#permutation-message').text("Calculating in main...");
  $('#permutation-results').empty();
                         
  var worker = new Worker('permutations.js');
  worker.postMessage($('#n').val());
  worker.onmessage(function(permutations){
    permutations.forEach(function(perm){
                         $('<li>').text(perm).appendTo('#permutation-results');
                         });
                   });

  // Perform permutatations
  permutations(n).forEach(function(perm) {
    $('<li>').text(perm).appendTo('#permutation-results');
  });

  // Finish by clearing the processing message
  $('#permutation-message').text('');
});

/**
 * When the calculate-in-web-worker button is clicked,
 * calculcate the permutations in a web worker.
 */
$('#permutate-in-web-worker').on('click', function(event){
  event.preventDefault();

  // Perform preparations
  $('#permutation-results').empty();
  $('#permutation-message').text("Calculating in web worker...");

  // TODO: Calculate permutations using a web worker
})


$('#image-chunk-list > img').on('click', function(event){
  event.preventDefault();
  // Create a canvas the same size as the image
  var canvas = document.createElement('canvas');
  canvas.width = this.width;
  canvas.height = this.height;
  // Create a 2D context
  var ctx = canvas.getContext('2d');
  // Draw the image into it
  ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
  // Get the image pixel data
  var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // TODO: Process Data
})
