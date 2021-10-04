import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import RegistroResponse from 'src/modelos/response_registro';
import { ClikForms } from '../cliktools/clikforms';
import { ClikTools } from '../cliktools/cliktools';
import { ApiclientService } from '../servicios/apiclient.service';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public registroForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private clikTools: ClikTools,
    private clikForms: ClikForms,
    private apiclient: ApiclientService,
    private sesionService: SesionService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      telefono: [null, [Validators.required]],
      nacimiento: [null, [Validators.required]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      tipo: "CLIENTE"
    })
  }

  ngOnInit() {

  }

  submitRegistro() {
    if (this.registroForm.valid) {
      const password = this.registroForm.value.password
      const confirmPassword = this.registroForm.value.confirmPassword
      if (password === confirmPassword) {
        this.apiclient.crearUsuario(this.registroForm.value).subscribe((response: RegistroResponse) => {
          this.sesionService.setToken(response.jwt)
          this.sesionService.setUsuario(JSON.stringify(response.user))
          this.router.navigateByUrl("/home").then(_ => {
            this.clikTools.acceptMessage("Account succesfully created", "Welcome " + response.user.username + "!")
          })
        })
      } else {
        this.clikTools.warningToast("Password does not match")
      }
    } else {
      this.clikForms.presentInvalidEnToast()
    }
  }
}
