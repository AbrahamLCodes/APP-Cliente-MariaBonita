import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClikForms } from '../cliktools/clikforms';
import { ClikTools } from '../cliktools/cliktools';
import { ApiclientService } from '../servicios/apiclient.service';
import { SesionService } from '../servicios/sesion.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {

  public usuario: any
  public usuarioForm: FormGroup

  constructor(
    private clikTools: ClikTools,
    private clikForms: ClikForms,
    private sesionService: SesionService,
    private fb: FormBuilder,
    private apiclient: ApiclientService,
    private location: Location
  ) {
    this.usuarioForm = this.fb.group({
      username: [null, [Validators.required]],
      nacimiento: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null],
      passwordConfirm: [null]
    })
  }

  ngOnInit() {
    this.usuario = this.sesionService.getObjectUsuario()    
    this.usuarioForm.patchValue({
      username: this.usuario.username,
      nacimiento: this.usuario.nacimiento,
      email: this.usuario.email
    })    
  }

  submitInfo() {
    console.log(this.usuarioForm.value);
    
    if (this.usuarioForm.valid) {
      const data = this.usuarioForm.value
      if (data.password == null || data.password == undefined) delete data["password"];
      if (data.hasOwnProperty("password")) {
        if (data.password == data.passwordConfirm) {
          this.actualizarUsuario(data)
        } else {
          this.clikTools.warningToast("Password does not match")
        }
      } else {
        this.actualizarUsuario(data)
      }
    } else {
      this.clikForms.presentInvalidEnToast()
    }
  }

  actualizarUsuario(data) {
    this.apiclient.actualizarDato("users", this.usuario.id, data).subscribe(response => {
      if (response.hasOwnProperty("id")) {
        this.clikTools.customToast("Your info was updated succesfully!", "primary")
        this.location.back()
      }
    })
  }
}
