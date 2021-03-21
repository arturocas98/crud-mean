import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Empleado } from '../models/empleado';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
 
  readonly URL_API = "http://localhost:3000/api/empleados";
  constructor(
    private http:HttpClient
  ) {
  
  }

  getEmpleados(){
    return this.http.get(this.URL_API);
  }

  crearEmpleado(empleado:Object){
    return this.http.post(this.URL_API,empleado);
  }

  actualizarEmpleado(empleado:any){    
    return this.http.put(this.URL_API+`/${empleado.id}`,empleado);

  }

  eliminarEmpleado(_id:string){
    return this.http.delete(this.URL_API+`/${_id}`);
  }

}
