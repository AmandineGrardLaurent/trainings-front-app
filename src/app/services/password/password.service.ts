import { Injectable } from '@angular/core';
import bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  // Hash a password
  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10); // 10 rounds of salting
    return bcrypt.hashSync(password, salt);
  }

  // Compare a password with a hash
  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
