import mongoose from "mongoose";

const petsSchema = new mongoose.Schema({
    name: { type: String },
    image: String,
    birthday: String,
    nutrition: { type: String, enum: ['Solida', 'Humeda', 'Latas'] },
    diseases: { type: [String || null] },
    exercice: {type:  String, enum:  ['30-60 min', '60-120 min', '+120min']},
    maxNumberGifts: Number

},
{
    timestamps: true
});


const Pet = mongoose.model('Pet', petsSchema);

export default Pet;