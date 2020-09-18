import { ComentariosHijosComponent } from './../../src/menu/foro/foro-comentarios/comentarios-hijos/comentarios-hijos.component';
import { CrearForoAulaComentarioComponent } from './../../src/menu/foro/crear-foro-aula-comentario/crear-foro-aula-comentario.component';
import { ForoComentarioService } from './../../service/foro-comentario.service';
import { PropertiesForoComentarios } from './../../properties/properties-foro-comentarios';
import { PropertiesAsigProfeAsigs } from './../../../dashboard/properties/properties-asig-profe-asigs';
import { AsigProfeAsigsService } from './../../../dashboard/service/dashboard/asig-profe-asigs.service';
import { VerAsigProfeAsigsComponent } from './../../src/ver-asig-profe-asigs/ver-asig-profe-asigs.component';
import { PropertiesListRoom } from './../../properties/properties-list-room';
import { ProgramacionHorarioComponent } from '../../src/menu/clase/list-room/ver/programacion-horario/programacion-horario.component';
import { PlantillaForoAulaMateriaComponent } from './../../src/menu/foro/plantilla-foro-aula-materia/plantilla-foro-aula-materia.component';
import { PropertiesForoAualaMateria } from './../../properties/properties-foro-aula-materia';
import { ForoAulaMateriaService } from './../../service/foro-aula-materia.service';
import { PresentacionClaseComponent } from './../../src/menu/clase/presentacion/presentacion-clase/presentacion-clase.component';
import { SalonesEsPrService } from './../../service/salones-es-pr.service';
import { GaleriaVideoComponent } from './../../src/menu/clase/video/galeria-video/galeria-video.component';
import { SalonesEstudianteProfesorComponent } from '../../src/menu/clase/salones-estudiante-profesor/salones-estudiante-profesor.component';
import { ArchivoBilbliotecaService } from './../../service/archivo-bilblioteca.service';
import { ListMp4Component } from './../../src/chat/list-mp4/list-mp4.component';
import { NotificacionService } from './../../service/notificacion.service';
import { NotificacionComponent } from './../../../notificacion/notificacion.component';
import { NavbarPrincipalMModule } from './../../../src/navbar-principal/navbar-principal-m/navbar-principal-m.module';
import { ParticipantesComponent } from './../../src/chat/participantes/participantes.component';
import { DialogoIntegrantesComponent } from './../../src/chat/dialogo-integrantes/dialogo-integrantes.component';
import { PresentacionPPTComponent } from './../../src/multimedia/presentacion-ppt/presentacion-ppt.component';
import { ThemeService } from './../../../theme.service';
import { FileUploadPptService } from './../../service/file-upload-ppt.service';
import { UploadOnefileModule } from './../../../btn-upload-one-file/upload-onefile.module';
import { ListFileUploadComponent } from './../../src/chat/list-file-upload/list-file-upload.component';
import { ComentarioComponent } from './../../src/comentario/comentario.component';
import { VideoMultimediaComponent } from './../../src/multimedia/video-multimedia/video-multimedia.component';
import { BotonesService } from './../../service/botones.service';
import { DesktopMultimediaComponent } from './../../src/multimedia/desktop-multimedia/desktop-multimedia.component';
import { BotonesComponent } from './../../src/multimedia/botones/botones.component';
import { ListChatComponent } from './../../src/chat/list-chat/list-chat.component';
import { LoginAulaVirtualComponent } from './../../src/pantalla-base/login-aula-virtual/login-aula-virtual.component';
import { ListVideoComponent } from './../../src/chat/list-video/list-video.component';
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
import { MaterialModule } from '../../../dashboard/module/material/material.module';
import { RouteModule } from '../route/route.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketIoClientService } from '../../service/socket-io-client.service';
import { PlantillaPrincipalComponent } from '../../src/pantalla-base/plantilla-principal/plantilla-principal.component';
import { AulaVirtualGuard } from '../../guard/aula-virtual.guard';
import { ListRoomComponent } from '../../src/menu/clase/list-room/list-room.component';
import { InscripcionAsigEsComponent } from '../../src/menu/clase/list-room/ver/incripcion-asignatura-estudiante/inscripcion-asig-es.component';
import { VideosClaseComponent } from '../../src/menu/clase/video/videos-clase/videos-clase.component';
import { GaleriaPresentacionComponent } from '../../src/menu/clase/presentacion/galeria-presentacion/galeria-presentacion.component';
import { ForoMateriaComponent } from '../../src/menu/foro/foro-materia/foro-materia.component';
import { ForoComentariosComponent } from '../../src/menu/foro/foro-comentarios/foro-comentarios.component';
import { CrearForoAulaMateriaComponent } from '../../src/menu/foro/crear-foro-aula-materia/crear-foro-aula-materia.component';
import { ActualizarForoAulaMateriaComponent } from '../../src/menu/foro/actualizar-foro-aula-materia/actualizar-foro-aula-materia.component';
import { EliminarForoAulaMateriaComponent } from '../../src/menu/foro/eliminar-foro-aula-materia/eliminar-foro-aula-materia.component';
const config: SocketIoConfig = {
  url: 'http://181.55.192.137:4444',
  options: {},
};

@NgModule({
  declarations: [
    ListRoomComponent,
    InscripcionAsigEsComponent,
    ProgramacionHorarioComponent,
    PlantillaPrincipalComponent,
    NavbarComponent,
    MenuLateralComponent,
    ListVideoComponent,
    PlantillaChatComponent,
    LoginAulaVirtualComponent,
    ListChatComponent,
    VideoMultimediaComponent,
    BotonesComponent,
    DesktopMultimediaComponent,
    ComentarioComponent,
    ListFileUploadComponent,
    PresentacionPPTComponent,
    DialogoIntegrantesComponent,
    ParticipantesComponent,
    NotificacionComponent,
    ListMp4Component,
    VideosClaseComponent,
    SalonesEstudianteProfesorComponent,
    GaleriaVideoComponent,
    GaleriaPresentacionComponent,
    PresentacionClaseComponent,
    ForoMateriaComponent,
    ForoComentariosComponent,
    CrearForoAulaMateriaComponent,
    ActualizarForoAulaMateriaComponent,
    EliminarForoAulaMateriaComponent,
    PlantillaForoAulaMateriaComponent,
    VerAsigProfeAsigsComponent,
    CrearForoAulaComentarioComponent,
    ComentariosHijosComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    RouteModule,
    FormsModule,
    LoadingModule,
    UploadOnefileModule,
    NavbarPrincipalMModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    BotonesService,
    SocketIoClientService,
    ListRoomService,
    PropertiesListRoom,
    PropertiesLoginChat,
    RoomGuard,
    AulaVirtualGuard,
    MenuAulaService,
    UsuarioService,
    ConfiguracionService,
    FileUploadPptService,
    ThemeService,
    NotificacionService,
    ArchivoBilbliotecaService,
    SalonesEsPrService,
    ForoAulaMateriaService,
    PropertiesForoAualaMateria,
    AsigProfeAsigsService,
    PropertiesAsigProfeAsigs,
    PropertiesForoComentarios,
    ForoComentarioService
  ],
})
export class AulaVirtualModule {}
