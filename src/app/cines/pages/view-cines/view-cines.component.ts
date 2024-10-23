import { Component } from '@angular/core';
import { CineService } from 'src/app/services/cine.service';

@Component({
  selector: 'app-view-cines',
  templateUrl: './view-cines.component.html',
  styleUrls: ['./view-cines.component.css'],
})
export class ViewCinesComponent {
  cines: any[] | undefined;
  constructor(private cineService: CineService) {}

  ngOnInit() {
    this.cineService.getAllCines().subscribe({
      next: (response) => {
        if (response.cines.length === 0) {
          console.log('No hay cines');
        } else {
          this.cines = response.cines;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
