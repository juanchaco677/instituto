import { VideoMultimediaComponent } from './../../src/multimedia/video-multimedia/video-multimedia.component';
import { BotonesService } from './../../service/botones.service';
import { DesktopMultimediaComponent } from './../../src/multimedia/desktop-multimedia/desktop-multimedia.component';
import { BotonesComponent } from './../../src/multimedia/botones/botones.component';
import { ListChatComponent } from './../../src/chat/list-chat/list-chat.component';
import { LoginAulaVirtualComponent } from './../../src/pantalla-base/login-aula-virtual/login-aula-virtual.component';
import { VideoDesktopComponent } from './../../src/chat/video-desktop/video-desktop.component';
import { ListVideoComponent } from './../../src/chat/list-video/list-video.component';
import { MenuChatComponent } from './../../src/chat/menu-chat/menu-chat.component';
import { PlantillaChatComponent } from './../../src/chat/plantilla-chat/plantilla-chat.component';
import { MenuLateralComponent } from './../../src/pantalla-base/menu-lateral/menu-lateral.component';
import { ConfiguracionService } from './../../../dashboard/service/dashboard/configuracion.service';
import { UsuarioService } from './../../../dashboard/service/dashboard/usuario.service';
import { MenuAulaService } from './../../service/menu-aula.service';
import { NavbarComponent } from './../../src/pantalla-base/navbar/navbar.component';
import { ListRoomService } from '../../service/list-room.service';
import { LoadingModule } from '../../../loading/loading.module';
import { PropertiesLoginChat } from '../../../dashboard/properties/properties-login-chat';
import { RoomGuard } from '../../guard/room.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertiesListRoom } from '../../properties/properties-list-room';
import { MaterialModule } from '../../../dashboard/module/material/material.module';
import { RouteModule } from '../route/route.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketIoClientService } from '../../service/socket-io-client.service';
import { PlantillaPrincipalComponent } from '../../src/pantalla-base/plantilla-principal/plantilla-principal.component';
import { AulaVirtualGuard } from '../../guard/aula-virtual.guard';
import { ListRoomComponent } from '../../src/menu/list-room/list-room.component';
import { InscripcionAsigEsComponent } from '../../src/menu/list-room/ver/incripcion-asignatura-estudiante/inscripcion-asig-es.component';
import { AsigProfeAsigsComponent } from '../../src/menu/list-room/ver/asig-profe-asigs/asig-profe-asigs.component';
const config: SocketIoConfig = { url: 'http://181.55.192.137:4444', options: {} };


@NgModule({
  declarations: [
    ListRoomComponent,
    InscripcionAsigEsComponent,
    AsigProfeAsigsComponent,
    PlantillaPrincipalComponent,
    NavbarComponent,
    MenuLateralComponent,
    ListVideoComponent,
    PlantillaChatComponent,
    MenuChatComponent,
    VideoDesktopComponent,
    LoginAulaVirtualComponent,
    ListChatComponent,
    VideoMultimediaComponent,
    BotonesComponent,
    DesktopMultimediaComponent,
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    RouteModule,
    FormsModule,
    LoadingModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    SocketIoClientService,
    ListRoomService,
    PropertiesListRoom,
    PropertiesLoginChat,
    RoomGuard,
    AulaVirtualGuard,
    MenuAulaService,
    UsuarioService,
    ConfiguracionService,
    BotonesService
  ]
})
export class AulaVirtualModule {

}
