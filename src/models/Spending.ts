import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface ISpending extends Document {
  title: string;
  amount: number;
  category?: string;
  owner: IUser;
}
const spendingSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
},{
  timestamps: true,});

const Spending = mongoose.models.spendings || mongoose.model<ISpending>("spendings", spendingSchema);
export default Spending