import { Component } from '@angular/core';
import { TeatroService } from 'src/app/services/teatro.service';

@Component({
  selector: 'app-view-teatros',
  templateUrl: './view-teatros.component.html',
  styleUrls: ['./view-teatros.component.css'],
})
export class ViewTeatrosComponent {
  teatros: any[] | undefined;
  constructor(private teatroService: TeatroService) {}

  ngOnInit() {
    this.teatroService.getAllTeatros().subscribe({
      next: (response) => {
        if (response.teatros.length === 0) {
          console.log('No hay tetaros');
        } else {
          this.teatros = response.teatros;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
