import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private storageKey = 'usersData';
  private partialFormKey = 'partialFormData'; // Key for storing partial form data

  // Save users array
  saveUsers(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Get users array
  getUsers(): User[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Save partial (unsaved) form data
  savePartialForm(formData: Partial<User>): void {
    localStorage.setItem(this.partialFormKey, JSON.stringify(formData));
  }

  // Retrieve partial form data
  getPartialForm(): Partial<User> | null {
    const data = localStorage.getItem(this.partialFormKey);
    return data ? JSON.parse(data) : null;
  }

  clearPartialForm(): void {
    localStorage.removeItem(this.partialFormKey);
  }

  // Add new user on submitting the form , by populating the form values into newUser object
  addUserAfterSubmission(form: FormGroup, profilePic: string): User {
    let users = this.getUsers(); // Get current users

    const newUser: User = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1, // Auto-increment ID
      firstName: form.value.fullName.firstName,
      lastName: form.value.fullName.lastName,
      username: form.value.userName,
      email: form.value.email,
      birthdate: form.value.birthDate,
      address1: form.value.address.address1,
      address2: form.value.address.address2 || '',
      phoneNumber: form.value.phoneNumber,
      department: form.value.departmentId,
      jobTitle: form.value.jobTitleId,
      profilePic: form.value.profilePic || profilePic,
    };

    users.push(newUser); // Add the new user
    this.saveUsers(users); // Save updated list

    return newUser;
  }
}
