import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css'],
})
export class RegisterScreenComponent implements OnInit {
  passwordsMatch: boolean = false;
  usernameError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(8),
        Validators.pattern(
          /^(?:[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-]+\s*[a-z]*|[a-z]+\s*[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-]*)$/
        ),
      ],
    ],
    confirmPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /^(?:[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-]+\s*[a-z]*|[a-z]+\s*[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-]*)$/
        ),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.miFormulario.get('username')!.valueChanges.subscribe(() => {
      this.validateUsername();
    });

    this.miFormulario.get('password')!.valueChanges.subscribe(() => {
      this.validatePassword();
    });

    this.miFormulario.get('confirmPassword')!.valueChanges.subscribe(() => {
      this.validatePassword();
    });
  }

  registerUsuario() {
    if (this.miFormulario.valid) {
      const formData = this.miFormulario.value;

      if (formData.password === formData.confirmPassword) {
        this.registerService.registrarUsuario(formData).subscribe((res) => {
          if (res === true) {
            Swal.fire({
              title: 'OPERACIÓN EXITOSA',
              text: 'Usuario registrado exitosamente.',
              icon: 'success',
            });
            // Redireccionar
            this.router.navigateByUrl('/auth/login');
          } else {
            Swal.fire({
              title: 'OPERACIÓN DENEGADA',
              text: 'No se pudo registrar el usuario.',
              icon: 'error',
            });
          }
        });
      } else {
        Swal.fire({
          title: 'ERROR',
          text: 'Las contraseñas no coinciden.',
          icon: 'error',
        });
      }
    } else {
      // El formulario no es válido, identificar qué campo está presentando problemas
      const invalidControls = Object.keys(this.miFormulario.controls).filter(
        (control) => this.miFormulario.controls[control].invalid
      );

      if (invalidControls.length > 0) {
        // Obtener el nombre del primer control inválido
        const firstInvalidControl = invalidControls[0];
        const errorMessage = this.getErrorMessage(firstInvalidControl);

        Swal.fire({
          title: 'ERROR',
          text: errorMessage,
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'ERROR',
          text: 'Por favor, completa el formulario correctamente.',
          icon: 'error',
        });
      }
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.miFormulario.get(controlName);
    let errorMessage = '';

    if (control!.errors) {
      if (control!.errors['required']) {
        errorMessage = 'Este campo es obligatorio.';
      } else if (control!.errors['email']) {
        errorMessage = 'El formato del correo electrónico es incorrecto.';
      } else if (control!.errors['minlength']) {
        errorMessage = `La longitud mínima permitida es de ${
          control!.errors['minlength'].requiredLength
        } caracteres.`;
      } else if (control!.errors['pattern']) {
        errorMessage = 'El valor proporcionado no es válido.';
      }
    }

    return errorMessage;
  }

  validateUsername(): void {
    const usernameControl = this.miFormulario.get('username');
    const pattern = /^[a-zA-Z0-9]+$/;
    const usernameValue = usernameControl!.value;
    const isUsernameValid = pattern.test(usernameValue);
    if (!isUsernameValid) {
      this.usernameError =
        'El username solo acepta de 4 a 10 caracteres alfanuméricos. No acepta minúsculas al inicio. No se permiten caracteres especiales al inicio. No se permiten espacios';
    }
  }

  validatePassword(): void {
    const passwordControl = this.miFormulario.get('password');
    const confirmPasswordControl = this.miFormulario.get('confirmPassword');

    if (passwordControl!.value !== confirmPasswordControl!.value) {
      this.passwordsMatch = false;
      return;
    }

    const passwordValue = passwordControl!.value;
    const confirmPasswordValue = confirmPasswordControl!.value;

    const pattern =
      /^(?:[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-]+\s*[a-z]*|[a-z]+\s*[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-]*)$/;

    const isPasswordValid = pattern.test(passwordValue);
    const isConfirmPasswordValid = pattern.test(confirmPasswordValue);

    if (!isPasswordValid || !isConfirmPasswordValid) {
      this.passwordsMatch = false;
      if (!isPasswordValid) {
        this.passwordError =
          'La contraseña debe contener únicamente letras minúsculas y un carácter especial al principio, al final o en ambos lados.';
      }
      if (!isConfirmPasswordValid) {
        this.confirmPasswordError =
          'La contraseña debe contener únicamente letras minúsculas y un carácter especial al principio, al final o en ambos lados.';
      }
      return;
    }

    this.passwordsMatch = true;
    this.passwordError = '';
    this.confirmPasswordError = '';
  }
}
