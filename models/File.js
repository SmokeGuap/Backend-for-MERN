import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  data: String,
});
export default mongoose.model('File', FileSchema);
