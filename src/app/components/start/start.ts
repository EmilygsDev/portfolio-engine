
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './start.html',
  styleUrls: ['./start.css']
})
export class StartComponent {}
