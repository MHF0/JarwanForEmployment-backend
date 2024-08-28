import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type CompaniesDocument = HydratedDocument<Companies>;

@Schema({ timestamps: true })
export class Companies {
  @Prop({ type: String, required: true })
  companyName: string;

  @Prop({ type: String, required: true })
  companyMobileNumber: string;

  @Prop({ type: String, required: true })
  companyNature: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  address: {
    governorate: string;
    street: string;
    area: string;
    buildingNumber: string;
    near: string;
    floor: string;
    officeNumber: string;
  };

  @Prop({ type: [MongooseSchema.Types.Mixed], required: true })
  jobPosition: [Record<string, any>];

  @Prop({ type: MongooseSchema.Types.Mixed })
  ageRange: {
    from: string;
    to: string;
  };

  @Prop({ type: String })
  nationality: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  education: {
    highSchool: boolean;
    diploma: boolean;
    bachelor: boolean;
    master: boolean;
    notRequired: boolean;
  };

  @Prop({ type: String })
  fieldWork: string;

  @Prop({ type: String })
  preferredConditions: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  commission: {
    exists: boolean;
    percentage: string;
  };

  @Prop({ type: Boolean })
  incentives: boolean;

  @Prop({ type: Boolean })
  overtime: boolean;

  @Prop({ type: Boolean })
  securedTransport: boolean;

  @Prop({ type: Boolean })
  healthInsurance: boolean;

  @Prop({ type: Boolean })
  socialSecurity: boolean;
}

export const CompaniesSchema = SchemaFactory.createForClass(Companies);
