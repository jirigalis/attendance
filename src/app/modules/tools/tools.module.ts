import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CipherDecodePartComponent } from './ciphers/cipher-decode-part/cipher-decode-part.component';
import { CipherDescDialogComponent } from './ciphers/cipher-desc-dialog/cipher-desc-dialog.component';
import { CipherEncodePartComponent } from './ciphers/cipher-encode-part/cipher-encode-part.component';
import { CipherHeadingComponent } from './ciphers/cipher-heading/cipher-heading.component';
import { CiphersComponent } from './ciphers/ciphers.component';
import { KazdeXPismenoComponent } from './ciphers/kazde-x-pismeno/kazde-x-pismeno.component';
import { MorseCodeComponent } from './ciphers/morse-code/morse-code.component';
import { MorseovkaSudaLichaCislaComponent } from './ciphers/morseovka-suda-licha-cisla/morseovka-suda-licha-cisla.component';
import { MorseovkaSymbolyComponent } from './ciphers/morseovka-symboly/morseovka-symboly.component';
import { ObracenaMorseovkaPismenaComponent } from './ciphers/obracena-morseovka-pismena/obracena-morseovka-pismena.component';
import { ObracenaMorseovkaComponent } from './ciphers/obracena-morseovka/obracena-morseovka.component';
import { OtocenaAbecedaComponent } from './ciphers/otocena-abeceda/otocena-abeceda.component';
import { PavoukComponent } from './ciphers/pavouk/pavouk.component';
import { PetromilkaComponent } from './ciphers/petromilka/petromilka.component';
import { PosunutaAbecedaComponent } from './ciphers/posunuta-abeceda/posunuta-abeceda.component';
import { PozpatkuSlovaComponent } from './ciphers/pozpatku-slova/pozpatku-slova.component';
import { PozpatkuZnakyComponent } from './ciphers/pozpatku-znaky/pozpatku-znaky.component';
import { PozpatkuComponent } from './ciphers/pozpatku/pozpatku.component';
import { PrvniPismenoComponent } from './ciphers/prvni-pismeno/prvni-pismeno.component';
import { PrvniPosledniComponent } from './ciphers/prvni-posledni/prvni-posledni.component';
import { VkladaniZnakuComponent } from './ciphers/vkladani-znaku/vkladani-znaku.component';
import { ZlomkyComponent } from './ciphers/zlomky/zlomky.component';
import { GameMestoJmenoComponent } from './games/game-mesto-jmeno/game-mesto-jmeno.component';
import { GamePictureRevealComponent } from './games/game-picture-reveal/game-picture-reveal.component';
import { GamesComponent } from './games/games.component';
import { LetterGeneratorComponent } from './games/letter-generator/letter-generator.component';
import { ImageDialogComponent } from './images/image-dialog/image-dialog.component';
import { ImageFilterComponent } from './images/image-filter/image-filter.component';
import { ImagesComponent } from './images/images.component';
import { ManageCategoriesDialogComponent } from './images/manage-categories-dialog/manage-categories-dialog.component';
import { SingleImageDialogComponent } from './images/single-image-dialog/single-image-dialog.component';
import { ImageDetailComponent } from './learning/image-detail/image-detail.component';
import { LearningComponent } from './learning/learning.component';
import { RemoteScreenComponent } from "./remote-screen/remote-screen.component";

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        NgOptimizedImage,
    ],
    declarations: [
        GamesComponent,
        GameMestoJmenoComponent,
        GamePictureRevealComponent,
        LetterGeneratorComponent,
        /*** Ciphers ***/
        CipherHeadingComponent,
        CipherDescDialogComponent,
        CipherEncodePartComponent,
        CipherDecodePartComponent,
        CiphersComponent,
        KazdeXPismenoComponent,
        MorseovkaSudaLichaCislaComponent,
        MorseovkaSymbolyComponent,
        ObracenaMorseovkaComponent,
        ObracenaMorseovkaPismenaComponent,
        OtocenaAbecedaComponent,
        PavoukComponent,
        PetromilkaComponent,
        PosunutaAbecedaComponent,
        PozpatkuComponent,
        PozpatkuSlovaComponent,
        PozpatkuZnakyComponent,
        PrvniPismenoComponent,
        PrvniPosledniComponent,
        MorseCodeComponent,
        VkladaniZnakuComponent,
        ZlomkyComponent,
        /*** Images ***/
        ImagesComponent,
        ImageDialogComponent,
        ImageDetailComponent,
        ManageCategoriesDialogComponent,
        SingleImageDialogComponent,
        ImageFilterComponent,
        LearningComponent,
        RemoteScreenComponent,
    ]
})
export class ToolsModule { }