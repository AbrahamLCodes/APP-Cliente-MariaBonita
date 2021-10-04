import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClikForms } from '../cliktools/clikforms';
import { ApiclientService } from '../servicios/apiclient.service';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  public usuario: any
  public formComentario: FormGroup

  constructor(
    private sesionService: SesionService,
    private fb: FormBuilder,
    private apiclient: ApiclientService,
    private router: Router,
    private clikForms: ClikForms
  ) {
    this.formComentario = fb.group({
      nombre: [null, [Validators.required]],
      telefono: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.required]],
      asunto: [null, Validators.required],
      motivo: [null, Validators.required],
      comentarios: [null, Validators.required],
      usuario: null
    })
  }

  ngOnInit() {
    this.usuario = this.sesionService.getObjectUsuario()
    this.formComentario.patchValue({
      usuario: this.usuario.id
    })
  }

  submitComentario() {
    if (this.formComentario.valid) {
      this.formComentario.patchValue({
        telefono: this.formComentario.value.telefono + ""
      })
      this.apiclient.crearDato("queysugs", this.formComentario.value).subscribe(response => {
        if (response.hasOwnProperty("id")) {
          this.router.navigateByUrl("/typage")
        }
      })
    } else {
      this.clikForms.presentInvalidEnToast()
    }
  }
}
