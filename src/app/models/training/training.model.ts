/**
 * Model representing a training item.
 */
export class TrainingModel {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;

  /**
   * Constructor to initialize a TrainingModel instance.
   * @param id - The unique identifier for the training
   * @param name - The name of the training
   * @param description - The description of the training
   * @param price - The price of the training
   * @param quantity - The quantity of the training
   */
  constructor(id: number, name: string, description: string, price: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }
}
