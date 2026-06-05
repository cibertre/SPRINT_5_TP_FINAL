import mongoose from "mongoose";

const paisSchema = new mongoose.Schema({

  tipo: {
    type: String,
    default: "pais"
  },

  name: {

    official: {
      type: String,
      required: true
    }
  },

  capital: {
    type: [String],
    default: []
  },

  borders: {
    type: [String],
    default: []
  },

  area: {
    type: Number,
    required: true
  },

  population: {
    type: Number,
    required: true
  },

  gini: {
    type: Number,
    default: 0
  },

  timezones: {
    type: [String],
    default: []
  },

  creador: {
    type: String,
    default:
      "Renato G. Trentini"
  }

},
{
    timestamps: true,
    versionKey: false
}
);

export default mongoose.model(
  "Pais",
  paisSchema,
  "Grupo-27"
);