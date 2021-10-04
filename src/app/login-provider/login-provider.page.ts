import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClikTools } from '../cliktools/cliktools';
import { ApiclientService } from '../servicios/apiclient.service';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-login-provider',
  templateUrl: './login-provider.page.html',
  styleUrls: ['./login-provider.page.scss'],
})
export class LoginProviderPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private apiclient: ApiclientService,
    private sesionService: SesionService,
    private clikTools: ClikTools,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.apiclient.obtenerUsuarioSocial(queryParams, "google").subscribe((response: any) => {
        this.sesionService.setToken(response.jwt),
          this.sesionService.setUsuario(JSON.stringify(response.user))
        this.router.navigateByUrl("/home").then(_ => {
          this.clikTools.customToast("Welcome " + response.user.username + "!", "primary")
        })
      })
    })
  }
}
