
import { Validators, FormControl, ValidatorFn } from '@angular/forms';
export class Validacion {

  static getCampo(required: boolean) {
    const parameter: Array<ValidatorFn> = [];
    if (required) {
      parameter.push(Validators.required);
    }
    return new FormControl('', parameter);
  }

  static getCampoLetras(required: boolean) {
    const parameter: Array<ValidatorFn> = [];
    if (required) {
      parameter.push(Validators.required);
    }
    parameter.push(Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));

    return new FormControl('', parameter);
  }

  static getCampoEmail(required: boolean) {
    const parameter: Array<ValidatorFn> = [];
    if (required) {
      parameter.push(Validators.required);
    }
    parameter.push(Validators.email);
    return new FormControl('', parameter);
  }

  static getCampoNumero(required: boolean, min: number, max: number) {
    const parameter: Array<ValidatorFn> = [];
    if (required) {
      parameter.push(Validators.required);
    }
    if (max !== 0) {
      parameter.push(Validators.minLength(min));
    }
    if (max !== 0) {
      parameter.push(Validators.maxLength(max));
    }
    parameter.push(Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'));
    return new FormControl('', parameter);
  }

  static getPassword(required: boolean, min: number, max: number) {
    const parameter: Array<ValidatorFn> = [];
    if (required) {
      parameter.push(Validators.required);
    }
    parameter.push(Validators.minLength(min));
    parameter.push(Validators.maxLength(max));
    return new FormControl('', parameter);
  }

  static getCampoDate(required: boolean, ) {

    const parameter: Array<ValidatorFn> = [];
    if (required) {
      parameter.push(Validators.required);
    }
    return new FormControl('', parameter);
  }
}
