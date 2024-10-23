import { Component } from '@angular/core';
import { MuseoService } from 'src/app/services/museo.service';

@Component({
  selector: 'app-view-museos',
  templateUrl: './view-museos.component.html',
  styleUrls: ['./view-museos.component.css'],
})
export class ViewMuseosComponent {
  cines: any[] | undefined;
  constructor(private museoService: MuseoService) {}

  ngOnInit() {
    this.museoService.getAllMuseos().subscribe({
      next: (response) => {
        if (response.museos.length === 0) {
          console.log('No hay museos');
        } else {
          this.cines = response.museos;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
