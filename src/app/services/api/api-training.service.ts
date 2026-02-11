import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrainingModel } from '../../models/training/training.model';
import { environment } from '../../../environments/environment';

/**
 * Service responsible for handling API calls related to trainings.
 *
 * This service communicates with the backend to retrieve,
 * fetch, and delete training data.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiTrainingService {
  // Constructor injecting Angular HttpClient.
  constructor(private http: HttpClient) {}

  // Retrieves the list of all trainings.
  // returns Observable containing an array of TrainingModel
  public getTrainings() {
    return this.http.get<TrainingModel[]>(`${environment.apiUrl}/trainings`);
  }

  // Retrieves a single training by its identifier.
  // returns Observable containing the requested TrainingModel
  public getTrainingById(id: number) {
    return this.http.get<TrainingModel>(`${environment.apiUrl}/trainings/${id}`);
  }

  // Deletes a training by its identifier.
  // returns Observable representing the delete operation
  public deleteTraining(id: number) {
    return this.http.delete(`${environment.apiUrl}/trainings/${id}`);
  }

  // Creates a new training in the backend.
  public postTraining(trainingForm: TrainingModel) {
    const training = {
      ...trainingForm,
      quantity: 1,
    };
    return this.http.post<TrainingModel>(`${environment.apiUrl}/trainings`, training);
  }

  // Updates an existing training by its identifier.
  public updateTraining(id: number, trainingForm: Partial<TrainingModel>) {
    return this.http.patch<TrainingModel>(`${environment.apiUrl}/trainings/${id}`, trainingForm);
  }
}
