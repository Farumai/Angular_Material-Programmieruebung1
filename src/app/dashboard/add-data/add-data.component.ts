import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Validators, FormBuilder } from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [SharedModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule
  ],
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
  
  validPastDateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const today = new Date();
      const inputDate = new Date(control.value);

      if (control.value && inputDate >= today) {
        return { invalidDate: true };
      }
      return null;
    };
  }

  minimumAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const today = new Date();
      const birthDate = new Date(control.value);

      if (control.value) {
        const age = today.getFullYear() - birthDate.getFullYear();
        const ageMonth = today.getMonth() - birthDate.getMonth();
        const ageDay = today.getDate() - birthDate.getDate();
        if (age < minAge || (age === minAge && (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)))) {
          return { underage: true };
        }
      }
      return null;
    };
  }

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, private backendService: BackendService,
    private snackBar: MatSnackBar
  ) {
  }
  public registrationForm: any;

  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)]],
      birthdate: [null, [Validators.required, this.validPastDateValidator(), this.minimumAgeValidator(18)]],
      courseId: ['', Validators.required],
      subscribeNewsletter: [false],
      email: ['', Validators.email]
    });

    this.registrationForm.get('subscribeNewsletter')?.valueChanges.subscribe((isSubscribed: boolean) => {
      const emailControl = this.registrationForm.get('email');
      if (isSubscribed) {
        emailControl?.setValidators([Validators.required, Validators.email]);
      } else {
        emailControl?.clearValidators();
      }
      emailControl?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if(this.registrationForm.valid) {
      const formattedDate = new Date(this.registrationForm.value.birthdate).toISOString().split('T')[0];

      const formData = {
        ...this.registrationForm.value,
        birthdate: formattedDate
      };

      this.backendService.addRegistration(formData, this.storeService.currentPage);
      this.snackBar.open('Anmeldung erfolgreich!', 'Schließen', { duration: 3000 });
    } else {
      this.snackBar.open('Anmeldung nicht erfolgreich!', 'Schließen', { duration: 3000 })
    }
  }
}
