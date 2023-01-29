import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularForms';
  reactiveForm!: FormGroup;
  formStatus: any;
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  IsHidden= true;


  ngOnInit() {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required,this.noSpaceAllowed,]),
      lastname: new FormControl(null, [Validators.required, this.noSpaceAllowed, ]),
      age: new FormControl(null, [ Validators.required, Validators.min(16), ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    })
    this.reactiveForm.statusChanges.subscribe((value) => {
      console.log(value);
      this.formStatus = value;
    });
  }
  
  onSubmit() {
    this.IsHidden= !this.IsHidden;
    this.firstName=this.reactiveForm.get('firstname')?.value;
    this.lastName=this.reactiveForm.get('lastname')?.value;
    this.email=this.reactiveForm.get('email')?.value;
    this.age=this.reactiveForm.get('age')?.value;
  }
  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true }
    }
    return null;
  }
}
