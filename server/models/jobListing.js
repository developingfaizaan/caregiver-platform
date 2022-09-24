const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const jobListingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: String,
      required: true,
    },

    facebookId: {
      type: String,
    },

    postedBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const JobListing = mongoose.model("JobListing", jobListingSchema);

module.exports = JobListing;
