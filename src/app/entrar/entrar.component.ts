import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { InicioComponent } from '../inicio/inicio.component';
import { Tema } from '../model/Tema';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()
  listaTemas: Tema[]

  constructor(
    private authService: AuthService,
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    this.getAllTemas();
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  entrar() {
    this.authService.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token
      environment.nome = this.usuarioLogin.nome
      environment.foto = this.usuarioLogin.foto
      environment.id = this.usuarioLogin.id

      this.router.navigate(['/inicio'])
    }, erro => {
      if(erro.status == 401 || 500 ){
        alert('Usuario ou senha estão incorretos')
      }
    })
  }

}
