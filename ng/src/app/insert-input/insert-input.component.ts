import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InputService} from '../input.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-insert-input',
  templateUrl: './insert-input.component.html',
  styleUrls: ['./insert-input.component.scss']
})
export class InsertInputComponent implements OnInit {
  form;
  types;
  inputs: any = [];
  constructor(
    private _fb: FormBuilder,
    private inputService: InputService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedOut()) {
      this.router.navigate(['login']);
    }
    if (!this.authService.havePermission(48)) {
      this.router.navigate(['']);
    }
    this.types = this.inputService.types;
    this.inputService.inputs.subscribe(data => {
      this.inputs = data;
    });

    this.form = this._fb.group({
      name: [
        '', [
          Validators.required,
          this.usedName.bind(this)
        ]
      ],
      type: ['', Validators.required],
      value: '',
      // attributes: this._fb.array([
      // ]),
      required: [],
      order: [-1, Validators.required],
      options: this._fb.array([])
    });
  }

  onSubmit() {
    let order = this.form.controls.order.value;
    const inputsLength = this.inputs.length;
    // order
    if (order === -1) {
      order = this.inputs.length + 1;
    } else {
      for (let i = order; i < inputsLength; i++) {
        this.inputs[i]['order']++;
      }
      order++;
    }
    const newInput = {
      name: this.form.controls.name.value,
      type: this.form.controls.type.value,
      value: this.form.controls.value.value,
      required: this.form.controls.required.value,
      order: order,
      options: this.form.controls.options.value,
    };
    this.inputService.addInput(newInput);
    this.form.reset({order: -1});
  }

  usedName(control) {
    const name = control.value;
    if (name === '') {
      return null;
    }
    for (const option of this.inputs) {
      if (option.name === name) {
        return {'error': 'used name'};
      }
    }
    return null;
  }

  createOption(): FormGroup {
    return this._fb.group({
      name: ['', Validators.required]
    });
  }

  addOption() {
    const control = <FormArray>this.form.controls['options'];
    control.push(this.createOption());
  }

  removeOption(i: number) {
    const control = <FormArray>this.form.controls['options'];
    control.removeAt(i);
  }

  // createAttribute(): FormGroup {
  //   return this._fb.group({
  //     attributeName: ['', Validators.required],
  //     attributeValue: ['', Validators.required]
  //   });
  // }

  // addAttribute() {
  //   const control = <FormArray>this.form.controls['attributes'];
  //   control.push(this.createAttribute());
  // }

  // removeAttribute(i: number) {
  //   const control = <FormArray>this.form.controls['attributes'];
  //   control.removeAt(i);
  // }

  onTypeChange() {
    const type = <FormControl>this.form.controls['type'];
    const options = <FormArray>this.form.controls['options'];
    if (type.value === '1') {
      this.addOption();
      this.addOption();
      // this.addOption();
    } else {
      if (typeof options !== 'undefined') {
        for (let i = 0, l = options.controls.length; i < l; i++) {
          this.removeOption(0);
        }
      }
    }
  }

}
