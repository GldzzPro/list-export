import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Report = mongoose.model('Report', ReportSchema);