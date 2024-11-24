import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Validators, FormBuilder } from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-add-data',
  standalone: true,  // standalone-Komponente
  imports: [SharedModule, MatCheckboxModule, MatInputModule],  // Import der benötigten Module
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, public storeService: StoreService, private backendService: BackendService) {
  }
  public registrationForm: any;

  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      birthdate: [null, Validators.required],
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
      this.backendService.addRegistration(this.registrationForm.value, this.storeService.currentPage);
    }
  }
}
