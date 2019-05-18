const mongoose = require("mongoose");

mongoose
   .connect("mongodb://localhost/practice", { useNewUrlParser: true })
   .then(() => console.log("Connected!"))
   .catch(err => console.error("Something wrong ", err));

const songSchema = new mongoose.Schema({
   name: String,
   artist: String,
   releasedDate: { type: Date, default: Date.now },
   producers: [String],
   peakMelOnRank: Number,
   isWin: Boolean
});

const Song = mongoose.model("Song", songSchema);

async function createSong() {
   const song = new Song({
      name: "비밀정원",
      artist: "오마이걸",
      producers: ["Steven Lee"],
      peakMelOnRank: 2,
      isWin: true
   });

   const result = await song.save();
   console.log(result);
}

async function getSongs() {
   const song = await Song
      .find()
      .sort({peakMelOnRank: -1})
      .limit(10)
      .select({name: 1, artist: 1});
   console.log(song);
}

async function getSongsByComparisonOperators() {
   const songs = await Song
      // .find({ peakMelOnRank: { $gte: 5, $lte: 15 } })
      .find( {peakMelOnRank: { $nin: [2, 4, 6, 8, 10, 12, 14] }} )
      .limit(10)
      .sort({peakMelOnRank: -1})
      .select({name: 1, artist: 1, peakMelOnRank: 1});
   console.log(songs);
}

async function getSongsByLogicalOperators() {
   const songs = await Song
      .find()
      .or([ {isWin: false}, {peakMelOnRank: {$in: [1, 2, 3]}} ])
      .limit(10)
      .sort({peakMelOnRank: -1})
      .select({name: 1, artist: 1, peakMelOnRank: 1});
   console.log(songs);
}

async function getSongsByRegEx() {
   const songs = await Song
      .find({ name: /.*비+.*/gi })
      .limit(10)
      .sort({peakMelOnRank: 1})
      .select({name: 1, artist: 1, peakMelOnRank: 1});
   console.log(songs)   ;
}


// createSong();
// getSongs();
// getSongsByComparisonOperators();
// getSongsByLogicalOperators();
getSongsByRegEx();