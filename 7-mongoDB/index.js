const mongoose = require("mongoose");

mongoose
   .connect("mongodb://localhost:27017/firstlane", { useNewUrlParser: true })
   .then(() => console.log("Connected!"))
   .catch(err => console.log("Could not connect!", err));

const groupSchema = new mongoose.Schema({
   name: String,
   company: String,
   debut: { type: Date, default: Date.now },
   songs: [String],
   isNugu: Boolean
});

const Group = mongoose.model("group", groupSchema);

async function createGroup() {
   // const group = new Group({
   //    name: "OHMYGIRL",
   //    company: "WM",
   //    songs: [
   //       "Cupid",
   //       "Close",
   //       "Liar Liar",
   //       "One Step Two Step",
   //       "Windy Day",
   //       "Listen To My Word",
   //       "Coloring Book",
   //       "Secret Garden",
   //       "Banana Allergy Monkey",
   //       "Remember Me",
   //       "The Fifth Season"
   //    ],
   //    isNugu: false
   // });
   const group = new Group({
      name: "APRIL",
      company: "DSP",
      songs: [
         "Tinkerbell",
         "Muah!",
         "April Story",
         "Mayday",
         "Take My Hand",
         "The Blue Bird",
         "Oh! My Mistake"
      ],
      isNugu: true
   });

   const result = await group.save();
   console.log(result);
}

async function getGroup() {
   const groups = await Group
      .find()
      .limit(10)
      .sort({ name: 1 })
      .select({ name: 1, debut: 1 });
   console.log(groups);
}

// createGroup();
getGroup();