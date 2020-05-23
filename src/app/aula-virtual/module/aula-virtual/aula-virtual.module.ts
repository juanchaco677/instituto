import { AsigProfeAsigsComponent } from '../../src/chat-room/list-room/ver/asig-profe-asigs/asig-profe-asigs.component';
import { InscripcionAsigEsComponent } from '../../src/chat-room/list-room/ver/incripcion-asignatura-estudiante/inscripcion-asig-es.component';
import { ListRoomService } from '../../service/list-room.service';
import { LoadingModule } from '../../../loading/loading.module';
import { PropertiesLoginChat } from '../../../dashboard/properties/properties-login-chat';
import { RoomGuard } from '../../guard/room.guard';
import { LoginChatRoomComponent } from '../../src/chat-room/login-chat-room/login-chat-room.component';
import { UsuarioMultimediaComponent } from '../../src/chat-room/usuario-multimedia/usuario-multimedia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertiesListRoom } from '../../../dashboard/properties/properties-list-room';
import { ListRoomComponent } from '../../src/chat-room/list-room/list-room.component';
import { MaterialModule } from '../../../dashboard/module/material/material.module';
import { RouteModule } from '../route/route.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayMediaComponent } from '../../src/chat-room/display-media/display-media.component';
import { DesktopComponent } from '../../src/chat-room/desktop/desktop.component';
import { ChatRoomComponent } from '../../src/chat-room/chat-room/chat-room.component';
import { SidebarComponent } from '../../src/chat-room/sidebar/sidebar.component';
import { FooterEstudianteComponent } from '../../src/chat-room/footer-estudiante/footer-estudiante.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketIoClientService } from '../../service/socket-io-client.service';
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };


@NgModule({
  declarations: [
    DisplayMediaComponent,
    DesktopComponent,
    ChatRoomComponent,
    SidebarComponent,
    FooterEstudianteComponent,
    ListRoomComponent,
    UsuarioMultimediaComponent,
    LoginChatRoomComponent,
    InscripcionAsigEsComponent,
    AsigProfeAsigsComponent,

    // PlantillaPrincipalComponent,
    // MenuLateralComponent,
    // SidenavComponent,
    // NavbarComponent,
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
    RoomGuard
  ]
})
export class AulaVirtualModule { }
