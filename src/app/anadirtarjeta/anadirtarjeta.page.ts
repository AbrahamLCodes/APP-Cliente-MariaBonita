import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClikForms } from '../cliktools/clikforms';
import { ClikTools } from '../cliktools/cliktools';
import { ApiclientService } from '../servicios/apiclient.service';
import { SesionService } from '../servicios/sesion.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-anadirtarjeta',
  templateUrl: './anadirtarjeta.page.html',
  styleUrls: ['./anadirtarjeta.page.scss'],
})
export class AnadirtarjetaPage implements OnInit {

  public tarjetaForm: FormGroup
  private usuario: any

  constructor(
    private clikForms: ClikForms,
    private cliktools: ClikTools,
    private apiclient: ApiclientService,
    public fb: FormBuilder,
    private sesionService: SesionService,
    private location: Location
  ) {
    this.tarjetaForm = fb.group({
      titular: [null, Validators.required],
      numero: [null, Validators.required],
      mes: [null, Validators.required],
      anio: [null, Validators.required],
      nombre: [null, Validators.required],
      usuario: [null]
    })
  }

  ngOnInit() {
    this.usuario = this.sesionService.getObjectUsuario()
    this.tarjetaForm.patchValue({
      usuario: this.usuario.id
    })
  }

  public submitTarjeta() {
    if (this.tarjetaForm.valid) {
      this.apiclient.crearDato("tarjetas", this.tarjetaForm.value).subscribe(response => {
        if (response.hasOwnProperty("id")) {
          this.cliktools.customToast("Card saved succesfully", "primary")
          this.location.back()
        }
      })
    } else {
      this.clikForms.presentInvalidEnToast()
    }
  }
}
