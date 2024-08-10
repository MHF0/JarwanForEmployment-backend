import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema({ timestamps: true })
export class Categories {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  status: boolean;

  @Prop([String])
  subCategory: string[];
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
