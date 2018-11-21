import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../clases/marcador.class';
import { MatSnackBar } from '@angular/material';
import { MapaEditarComponent } from './mapa-editar.component';

import {MatDialog, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;

  marcadores:Marcador[]=[];

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) {
  //    const nuevoMarcador = new Marcador(51.678418,7.809007);

  //    this.marcadores.push(nuevoMarcador)

    if(localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'))
    }
  }

  ngOnInit() {
  }

  agregarMarcador(evento){
    const coords : { lat:number, lng:number } = evento.coords;

    const nuevoMarcador = new Marcador(coords.lat,coords.lng);

    this.marcadores.push(nuevoMarcador);

    this.guardarStorage();

    this.snackBar.open('Marcador Agregado','Cerrar',{ duration:3000});
  }

  guardarStorage(){
    localStorage.setItem('marcadores',JSON.stringify(this.marcadores))
  }

  borrarMarcador(index:number){
    this.marcadores.splice(index,1);
    this.guardarStorage();
    this.snackBar.open('Marcador Borrado','Cerrar',{ duration:3000});
  }

  editarMarcador(marcador:Marcador){
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, descripcion: marcador.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
        //console.log('The dialog was closed');

        if (!result){
          return;
        }
        marcador.titulo = result.titulo;
        marcador.descripcion = result.descripcion;

        this.guardarStorage();

        this.snackBar.open('Marcador Actualizado','Cerrar',{ duration:3000});
    });
  }



}
