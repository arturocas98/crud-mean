import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { throwError } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
declare var M :any;
@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css'],
  providers: [
    EmpleadoService
  ]
})
export class EmpleadoListComponent implements OnInit {
  public empleado: Empleado;
  empleados: Empleado[];
  constructor(
    private empleadoService: EmpleadoService
  ) {
    this.empleado = new Empleado();
    this.empleados = [];
  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  addEmpleado(f: NgForm) {
    // console.log("form:",f);

    if (this.empleado._id != "") {
      console.log("entro");
      let body = {
        "id":this.empleado._id,
        "nombre": this.empleado.nombre,
        "cargo": this.empleado.cargo,
        "oficina": this.empleado.oficina,
        "salario": this.empleado.salario,
      }
      console.log("body:",body);
      
      this.empleadoService.actualizarEmpleado(body).subscribe(resp=>{
        console.log("actualizacion:",resp);
        // this.limpiar(f);
        M.toast({html: 'Empleado actualizado satisfactoriamente'});
        this.getEmpleados();
      });
    }else{
      let body = {
        "nombre": this.empleado.nombre,
        "cargo": this.empleado.cargo,
        "oficina": this.empleado.oficina,
        "salario": this.empleado.salario,
      }
      console.log("empleado:", this.empleado);
      this.empleadoService.crearEmpleado(body).subscribe(resp => {
        console.log("respuesta:", resp);
        // this.empleado = new Empleado();
        this.limpiar(f);
        M.toast({html: 'Empleado guardado satisfactoriamente'});
        this.getEmpleados();
      });
    }
 
    
  }


  getEmpleados(){
  
    this.empleadoService.getEmpleados().subscribe(resp=>{
      this.empleados = resp as Empleado[];
      console.log("empleados:",this.empleados);
      
    });
  }

  limpiar(form: NgForm) {
    if (form) {
      form.reset();
    }
  }

  editEmpleado(empleado:Empleado){
    
    this.empleado = empleado;
  }

  removeEmpleado(empleado){
    // console.log("id:",empleado._id);
    if (confirm('Estas seguro que desea eliminar el registro?')) {
      this.empleadoService.eliminarEmpleado(empleado._id).subscribe(respuesta=>{
        // console.log("respuesta_elimina:",JSON.parse(respuesta.estado));
        // let resp = JSON.parse(respuesta.estado);
        M.toast({html: "Se elimino el empleado satisfactoriamente"});
        this.getEmpleados();
      });
    }
    
  }

}
