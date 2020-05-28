import { ContenedorChatComponent } from './../../src/chat/contenedor-chat/contenedor-chat.component';
import { MenuChatComponent } from './../../src/chat/menu-chat/menu-chat.component';
import { PlantillaChatComponent } from './../../src/chat/plantilla-chat/plantilla-chat.component';
import { ListDisplayEstudianteComponent } from './../../src/chat-room/chat-room/list-display-estudiante/list-display-estudiante.component';
import { DisplayButtonComponent } from './../../src/chat-room/chat-room/display-button/display-button.component';
import { DisplayMediaComponent } from './../../src/chat-room/display-media/display-media.component';
import { MenuLateralComponent } from './../../src/pantalla-base/menu-lateral/menu-lateral.component';
import { ConfiguracionService } from './../../../dashboard/service/dashboard/configuracion.service';
import { UsuarioService } from './../../../dashboard/service/dashboard/usuario.service';
import { MenuAulaService } from './../../service/menu-aula.service';
import { NavbarComponent } from './../../src/pantalla-base/navbar/navbar.component';
import { AsigProfeAsigsComponent } from '../../src/chat-room/list-room/ver/asig-profe-asigs/asig-profe-asigs.component';
import { InscripcionAsigEsComponent } from '../../src/chat-room/list-room/ver/incripcion-asignatura-estudiante/inscripcion-asig-es.component';
import { ListRoomService } from '../../service/list-room.service';
import { LoadingModule } from '../../../loading/loading.module';
import { PropertiesLoginChat } from '../../../dashboard/properties/properties-login-chat';
import { RoomGuard } from '../../guard/room.guard';
import { LoginChatRoomComponent } from '../../src/chat-room/login-chat-room/login-chat-room.component';
import { UsuarioMultimediaComponent } from '../../src/chat-room/usuario-multimedia/usuario-multimedia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertiesListRoom } from '../../properties/properties-list-room';
import { ListRoomComponent } from '../../src/chat-room/list-room/list-room.component';
import { MaterialModule } from '../../../dashboard/module/material/material.module';
import { RouteModule } from '../route/route.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopComponent } from '../../src/chat-room/desktop/desktop.component';
import { ChatRoomComponent } from '../../src/chat-room/chat-room/chat-room.component';
import { SidebarComponent } from '../../src/chat-room/sidebar/sidebar.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketIoClientService } from '../../service/socket-io-client.service';
import { PlantillaPrincipalComponent } from '../../src/pantalla-base/plantilla-principal/plantilla-principal.component';
import { AulaVirtualGuard } from '../../guard/aula-virtual.guard';
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };


@NgModule({
  declarations: [
    DisplayMediaComponent,
    DesktopComponent,
    ChatRoomComponent,
    SidebarComponent,
    ListRoomComponent,
    UsuarioMultimediaComponent,
    LoginChatRoomComponent,
    InscripcionAsigEsComponent,
    AsigProfeAsigsComponent,
    PlantillaPrincipalComponent,
    NavbarComponent,
    MenuLateralComponent,
    DisplayButtonComponent,
    ListDisplayEstudianteComponent,

    PlantillaChatComponent,
    MenuChatComponent,
    ContenedorChatComponent
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
  ]
})
export class AulaVirtualModule {

}
