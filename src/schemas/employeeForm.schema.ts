import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeFormDocument = HydratedDocument<EmployeeForm>;

@Schema({ timestamps: true })
export class EmployeeForm {
  @Prop({ required: true })
  category: string;

  @Prop()
  subCategory: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  city: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop()
  cv: string;

  @Prop()
  acceptPolicy: boolean;
}

export const EmployeeFormSchema = SchemaFactory.createForClass(EmployeeForm);
