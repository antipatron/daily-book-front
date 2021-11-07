import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from '../../core/services/storage.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input()
  size!: string;

  /*loggedUser: User = new User();*/
  inicialesNombre = "Usuario";
  nombreClaseContenedor!: string;
  nombreClaseContenido!: string;

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
   /* const loggedUser: User = this.storageService.get('loggedUser');
    this.loggedUser = loggedUser;*/
    this.obtenerNombreClaseContenedor('avatar', this.size !== undefined ? this.size : 'small');
    this.obtenerNombreClaseContenido('content', this.size !== undefined ? this.size : 'small');
  }

  obtenerNombreClaseContenedor(nombreDefault: string, size: string) {
    this.nombreClaseContenedor = nombreDefault.concat(' ').concat(size);
  }

  obtenerNombreClaseContenido(nombreDefault: string, size: string) {
    this.nombreClaseContenido = nombreDefault.concat(' ').concat(size);
  }

}
