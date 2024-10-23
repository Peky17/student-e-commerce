import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservarMuseoComponent } from '../../reservar-museo/reservar-museo.component';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-museo',
  templateUrl: './info-museo.component.html',
  styleUrls: ['./info-museo.component.css'],
})
export class InfoMuseoComponent {
  formulario!: FormGroup;

  constructor(
    private reservarMuseoComponent: ReservarMuseoComponent,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit() {
    this.formulario = new FormGroup({
      cantidadEntradas: new FormControl(1, [
        Validators.required,
        Validators.min(1),
      ]),
      nombrePersona: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      const form = this.formulario.value;
      this.dataSharingService.sendDataToSharedPayement(form);
      this.reservarMuseoComponent.next();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, rellena correctamente el formulario',
      }).then(() => {
        this.formulario.reset();
      });
    }
  }

  getSharedData() {
    this.dataSharingService.dataObservable.subscribe((data) => {
      console.log(data);
    });
  }
}
