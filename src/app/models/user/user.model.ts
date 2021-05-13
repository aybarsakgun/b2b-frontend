import {BaseModel} from '../base.model';
import {UserRoleEnum} from './user-role.enum';
import {UserBranchModel} from './user-branch.model';
import {SalesRepresentativeModel} from './sales-representative.model';

export class UserModel extends BaseModel {
  id: number;
  username: string;
  email: string;
  currency: string;
  name: string;
  customerId: number;
  role: UserRoleEnum;
  isActive: boolean;
  branches: UserBranchModel[];
  salesRepresentative: SalesRepresentativeModel;
  priceOrder: number;
  branch: number;
}
