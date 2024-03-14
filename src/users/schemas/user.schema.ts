import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })



export class User  {
  // Define your properties here using @Prop decorator if needed
  @Prop({ required: true })
  name:string;

  @Prop({ required: true, unique: true })
  email:string;

  @Prop({ required: true })
  password:string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }])
  posts: mongoose.Schema.Types.ObjectId[];

}

export const UserSchema = SchemaFactory.createForClass(User);