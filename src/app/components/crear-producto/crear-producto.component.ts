import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo: string = 'Crear Producto';
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService  ,
    private aRouter: ActivatedRoute) { 
    this.productoForm = this.fb.group({
      producto:['', Validators.required],
      categoria:['', Validators.required],
      ubicacion:['', Validators.required],
      precio:['', Validators.required]
  })
  this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.esEditar()
  }
  agregarProducto(){

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    }
    if (this.id === null){
    console.log(PRODUCTO);
    this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
    this.toastr.success('Guardado con exito!', 'Su producto ha sido guardado');
    this.router.navigate(['/']);
  },error=> {
    console.log(error);
  } )}else{
    this._productoService.editarProducto(this.id,PRODUCTO).subscribe(data => {
    this.toastr.success('Actualizado con exito!', 'Su producto ha sido actualizado');
    this.router.navigate(['/']);
  },error=> {
    console.log(error);
  } )}
  }

  esEditar(){
    if (this.id !== null){
      this.titulo = 'Editar Producto';
      this._productoService.obtenerProducto(this.id).subscribe(data=>{
          this.productoForm.get('producto')?.setValue(data.nombre);
          this.productoForm.get('categoria')?.setValue(data.categoria);
          this.productoForm.get('ubicacion')?.setValue(data.ubicacion);
          this.productoForm.get('precio')?.setValue(data.precio);
        })
    }}
}
