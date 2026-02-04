import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrainingModel } from '../../models/training/training.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiTrainingService {
  constructor(private http: HttpClient) {}

  public getTrainings() {
    return this.http.get<TrainingModel[]>(`${environment.apiUrl}/trainings`);
  }

  public getTrainingById(id: number) {
    return this.http.get<TrainingModel>(`${environment.apiUrl}/trainings/${id}`);
  }

  public deleteTraining(id: number) {
    return this.http.delete(`${environment.apiUrl}/trainings/${id}`);
  }
}
