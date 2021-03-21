export class Empleado {
    
    constructor(_id ='', nombre = '', cargo= '',oficina='',salario = 0 ){
        this._id = _id;
        this.nombre = nombre;
        this.cargo = cargo;
        this.oficina = oficina;
        this.salario = salario;
    }

    _id: string;
    nombre: string;
    cargo: string;
    oficina:string;
    salario: number;
    
}