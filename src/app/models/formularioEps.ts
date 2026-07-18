import {Empresa} from './empresa'
import { Usuario } from './usuario';

export class FormularioEps {
   

    x1! : string;
    x2! : string;
    apellido1!: string;
    apellido2!: string;
    nombre1!: string;
    nombre2!: string;
    tipodoc!: string;
    numdoc!: string;
    sexo!: string;
    fechanac!: string;
    ARL!: string;
    AFP!: string;
    salario!: string;
    direccion!: string;
    telUsuario!: string;
    celular!: string;
    emailUsuario!: string;
    ciudadUsuario!: string;
    zona!: string;
    comuna!: string;
    depUsuario!: string;
    nombreEmpresa!: string;
    tipoDocEmpresa!: string;
    docEmpresa!: string;
    dirEmpresa!: string;
    telEmpresa!: string;
    emailEmpresa!: string;
    ciudadEmpresa!: string;
    depEmpresa!: string;
    fechaIng!: string;
    caja!: string;
    cargo!: string;
    dirUsuario!: string;
    usuario: Usuario;
    empresa: Empresa;

    constructor(){
        this.empresa=new Empresa();
        this.usuario=new Usuario();
    }
    }