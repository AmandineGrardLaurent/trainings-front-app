import { TrainingModel } from '../training/training.model';
import { UserModel } from '../user/user.model';

/**
 * Model representing an order.
 */
export class OrderModel {
  // orderId: number;
  user: UserModel;
  trainingsList: TrainingModel[];
  totalPrice: number;

  constructor(
    // orderId: number,
    user: UserModel,
    trainingsList: TrainingModel[],
    totalPrice: number,
  ) {
    // this.orderId = orderId;
    this.user = user;
    this.trainingsList = trainingsList;
    this.totalPrice = totalPrice;
  }
}
