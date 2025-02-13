import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { departments, jobTitles, User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  private formSubscription!: Subscription;
  departments = departments; //assigning departments to those stored in service
  jobTitles = jobTitles;
  profilePic: string = 'assets/new-user.png'; //default profile picture
  storedValues: any = {}; // Store old values for suggestions
  users: User[] = []; // Array to store users



  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService
  ) {
    // Creating the form and form controls
      this.userForm = this.fb.group({
      fullName: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
      }),
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      address: this.fb.group({
        address1: ['', [Validators.required]],
        address2: [''],
      }),
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      department: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      profilePic: [''],
    });
    // Bind beforeUnloadHandler to retain `this` context
    this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);
  }

  ngOnInit() {  
    this.loadFormData();
    
    // ✅ Ensure users is always an array
    this.users = this.userDataService.getUsers() || [];
  
    console.log('Total users:', this.users.length)
  
    // Save form changes in local storage (store partially filled form)
    this.formSubscription = this.userForm.valueChanges.subscribe(values => {
      this.userDataService.savePartialForm(values); // Save partial form data
    });
  
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }
  

  private loadFormData() {
    const savedValues = this.userDataService.getPartialForm();
    if (savedValues) {
      this.storedValues = savedValues;
    }
  }
  

  // Preventing the default behaviour of reloading the page until the user confirms
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent) {
    if (this.userForm && this.userForm.dirty ) {
      event.preventDefault(); // Standard approach
    }
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }
  
    

  onProfilePicUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePic = e.target.result; // Set preview immediately
        this.userForm.patchValue({ profilePic: e.target.result }); // Update form field
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmitForm() {
    const newUser = this.userDataService.addUserAfterSubmission(this.userForm, this.profilePic);

    console.log('Total users:', this.userDataService.getUsers().length);
    alert('User data saved successfully!');
    console.log('Form Submitted', newUser);

    this.userDataService.clearPartialForm(); // Clear stored partial data
    this.userForm.reset({
      department: '', // Resets to the default "Select Department" option
      jobTitle: ''   // Resets to the default "Select Job Title" option
    });    this.profilePic = 'assets/new-user.png';
  }
}
