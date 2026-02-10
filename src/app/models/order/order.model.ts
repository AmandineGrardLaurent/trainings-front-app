import { TrainingModel } from '../training/training.model';
import { UserModel } from '../user/user.model';

/**
 * Model representing an order.
 */
export class OrderModel {
  id: number;
  user: UserModel;
  trainingsList: TrainingModel[];
  totalPrice: number;

  constructor(id: number, user: UserModel, trainingsList: TrainingModel[], totalPrice: number) {
    this.id = id;
    this.user = user;
    this.trainingsList = trainingsList;
    this.totalPrice = totalPrice;
  }
}
