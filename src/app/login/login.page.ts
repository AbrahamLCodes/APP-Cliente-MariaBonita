import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import LoginResponse from 'src/modelos/login_response';
import { ClikForms } from '../cliktools/clikforms';
import { ClikTools } from '../cliktools/cliktools';
import { ApiclientService } from '../servicios/apiclient.service';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup

  constructor(
    private sesionService: SesionService,
    private clikTools: ClikTools,
    private clikForms: ClikForms,
    private fb: FormBuilder,
    private apiclient: ApiclientService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      identifier: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  ngOnInit() {
  }

  public loginProvider(provider: string, event: any) {
    event.preventDefault();
    window.location.href = `https://strapi.togofreshco.com/connect/${provider}`;
  }

  public login() {
    const email = this.loginForm.value.identifier
    const password = this.loginForm.value.password
    if (this.loginForm.valid) {
      this.apiclient.login(email, password).subscribe((response: LoginResponse) => {
        if (!response.hasOwnProperty('_isScalar')) {
          this.sesionService.setToken(response.jwt),
            this.sesionService.setUsuario(JSON.stringify(response.user))
          this.router.navigateByUrl("/home").then(_ => {
            this.clikTools.customToast("Welcome " + response.user.username + "!", "primary")
          })
        }
      })
    } else {
      this.clikForms.presentInvalidEnToast()
    }
  }
}