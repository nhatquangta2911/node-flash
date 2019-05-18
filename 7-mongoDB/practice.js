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
      name: "비올레타 (Violeta)",
      artist: "아이즈원",
      producers: ["Shinsadog Horangi"],
      peakMelOnRank: 8,
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

// createSong();
getSongs();