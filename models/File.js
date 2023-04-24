import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  name: String,
  data: String,
});
export default mongoose.model('File', FileSchema);
