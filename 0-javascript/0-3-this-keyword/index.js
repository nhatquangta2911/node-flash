
/*

TODO: Rule1: method -> obj
      Rule2: function -> global object (window in browser, global in node)

*/

// TODO: Rule 1
const video = {
   title: 'NodeJS',
   tags: ['A', 'B', 'C'],
   play() {
      console.log(this.title);
   },
   showTags() {
      this.tags.forEach(function(tag) {
         console.log(this.title, tag);
      }, this); 
   }

}

video.play();
video.showTags();


//TODO: Rule 2

function playVideo() {
   console.log(this.global.process.versions.v8);
}  

playVideo();