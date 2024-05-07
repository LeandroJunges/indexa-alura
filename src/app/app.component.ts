import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { SeparadorComponent } from './components/separador/separador.component';
import { ContatoComponent } from './components/contato/contato.component';
import { FormsModule } from '@angular/forms';
interface Contato {
  id: number
  nome: string
  telefone: string
}
import agenda from './agenda.json'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ContainerComponent,
    CabecalhoComponent,
    SeparadorComponent,
    ContatoComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  alfabeto: string ='abcdefghijklmnopqrstuvwxyz';
  contatos: Contato[] = agenda;

  filtroPorTexto: string = ''

  private removerAcentos(text:string):string{
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  filtrarContatosPorTexto(): Contato[] {
    if(!this.filtroPorTexto){
      return this.contatos
    }
    return this.contatos.filter(contato=>{
      return this.removerAcentos(contato.nome).toLowerCase().includes(this.filtroPorTexto.toLowerCase())
    })
  }

  filtrarContatosPorLetraInicial(letra:string): Contato[]{
    return this.filtrarContatosPorTexto().filter((contato)=>{
      return contato.nome?.toLocaleLowerCase().startsWith(letra)
    })

  }
}
