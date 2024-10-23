import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CineService } from 'src/app/services/cine.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import Swal from 'sweetalert2';

interface Seat {
  sold: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-select-asientos',
  templateUrl: './select-asientos.component.html',
  styleUrls: ['./select-asientos.component.css'],
})
// export class SelectAsientosComponent {
//   cineId: string = '';
//   cineData: any;
//   funciones: any[] = [];
//   seatRows: Seat[][] = [];
//   selectedSeatPosition: { row: number; seat: number } | null = null;
//   selectedSeatsCount: number = 0;
//   ticketPrice: number = 0;

//   constructor(
//     private route: ActivatedRoute,
//     private cineService: CineService,
//     private localStorageService: LocalStorageServiceService
//   ) {}

//   ngOnInit() {
//     // Clean selected seats
//     this.cleanSelectedSeats();
//     // Get cine data
//     this.cineId = this.route.snapshot.paramMap.get('id')!;
//     this.cineService.getCineById(this.cineId).subscribe({
//       next: (response) => {
//         if (
//           response.cine == null ||
//           response.cine == undefined ||
//           response.cine.length === 0
//         ) {
//           Swal.fire({
//             icon: 'info',
//             title: 'Oops...',
//             text: 'No se encontró el cine seleccionado.',
//           });
//         } else {
//           this.cineData = response.cine;
//         }
//       },
//       error: (error) => {
//         Swal.fire({
//           icon: 'info',
//           title: 'Oops...',
//           text: 'No se encontró el cine seleccionado.',
//         });
//         console.log(error);
//       },
//     });
//     // Get funciones by cine
//     this.getFuncionesByCine(this.cineId);
//   }

//   ngAfterViewInit() {
//     this.updateSelectedCount();
//   }

//   setMovieData(movieIndex: number, moviePrice: string) {
//     this.localStorageService.setItem(
//       'selectedMovieIndex',
//       movieIndex.toString()
//     );
//     this.localStorageService.setItem('selectedMoviePrice', moviePrice);
//   }

//   updateSelectedCount() {
//     this.selectedSeatsCount = this.seatRows.reduce((count, row) => {
//       return count + row.filter((seat) => seat.selected).length;
//     }, 0);
//   }

//   updateSelectedMovie(event: any) {
//     const price = event.target.value;
//     // Convierte el precio a tipo numérico
//     this.ticketPrice = +price;
//     // Actualiza la cantidad de asientos seleccionados
//     this.updateSelectedCount();
//     // Actualiza el precio de la película seleccionada
//     this.setMovieData(event.target.selectedIndex, price);
//   }

//   saveSelectedSeatsToLocalStorage(row: number, seat: number) {
//     let selectedSeats = this.localStorageService.getItem('selectedSeats') || [];
//     if (this.seatRows[row][seat].selected) {
//       selectedSeats.push({ row, seat });
//     } else {
//       selectedSeats = selectedSeats.filter(
//         (seatPosition: { row: number; seat: number }) =>
//           seatPosition.row !== row || seatPosition.seat !== seat
//       );
//     }
//     this.localStorageService.setItem('selectedSeats', selectedSeats);
//   }

//   toggleSeatSelection(row: number, seat: number) {
//     if (!this.seatRows[row][seat].sold) {
//       this.seatRows[row][seat].selected = !this.seatRows[row][seat].selected;
//       this.updateSelectedCount();
//       this.saveSelectedSeatsToLocalStorage(row, seat);
//       if (this.seatRows[row][seat].selected) {
//         this.selectedSeatPosition = { row, seat };
//       } else {
//         this.selectedSeatPosition = null;
//       }
//     }
//   }

//   getFuncionesByCine(id_cine: string) {
//     this.cineService.getAllFuncionesInCines(id_cine).subscribe({
//       next: (response) => {
//         this.funciones = response.funciones;
//         this.seatRows = this.generateSeatRows();
//         this.ticketPrice = +this.funciones[0].precio;
//         this.setMovieData(0, this.funciones[0].precio);
//       },
//       error: (error) => {
//         Swal.fire({
//           icon: 'info',
//           title: 'Oops...',
//           text: 'No se encontraron funciones para el cine seleccionado.',
//         }).then(() => {
//           window.history.back();
//         });
//       },
//     });
//   }

//   generateSeatRows(): Seat[][] {
//     // Generate seat rows based on your seat arrangement logic
//     // Example implementation:
//     const rows: Seat[][] = [];
//     const numRows = 8;
//     const numSeatsPerRow = 8;

//     for (let i = 0; i < numRows; i++) {
//       const row: Seat[] = [];
//       for (let j = 0; j < numSeatsPerRow; j++) {
//         const seat: Seat = { sold: false, selected: false };
//         row.push(seat);
//       }
//       rows.push(row);
//     }

//     return rows;
//   }

//   cleanSelectedSeats() {
//     this.localStorageService.removeItem('selectedSeats');
//   }
// }
export class SelectAsientosComponent {
  @ViewChild('select') select: ElementRef | undefined;
  cineId: string = '';
  cineData: any;
  funciones: any[] = [];
  seatRows: Seat[][] = [];
  selectedSeatPosition: { row: number; seat: number } | null = null;
  selectedSeatsCount: number = 0;
  ticketPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cineService: CineService,
    private localStorageService: LocalStorageServiceService,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit() {
    // Clean selected seats
    this.cleanSelectedSeats();
    // Get cine data
    this.cineId = this.route.snapshot.paramMap.get('id')!;
    this.cineService.getCineById(this.cineId).subscribe({
      next: (response) => {
        if (
          response.cine == null ||
          response.cine == undefined ||
          response.cine.length === 0
        ) {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'No se encontró el cine seleccionado.',
          });
        } else {
          this.cineData = response.cine;
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'No se encontró el cine seleccionado.',
        });
        console.log(error);
      },
    });
    // Get funciones by cine
    this.getFuncionesByCine(this.cineId);
  }

  ngAfterViewInit() {
    this.updateSelectedCount();
  }

  setMovieData(movieIndex: number, moviePrice: string) {
    this.localStorageService.setItem(
      'selectedMovieIndex',
      movieIndex.toString()
    );
    this.localStorageService.setItem('selectedMoviePrice', moviePrice);

    // Obtén el texto del option seleccionado del select
    const selectedOptionText =
      this.select?.nativeElement.selectedOptions[0]?.text;

    if (
      selectedOptionText != null &&
      selectedOptionText != '' &&
      selectedOptionText != undefined
    ) {
      // Envía los datos al servicio compartido
      const jsonDat = {
        seats: this.getSelectedSeats(),
        price: moviePrice,
        selection: selectedOptionText,
      };
      const jsonStrin = JSON.stringify(jsonDat);
      this.dataSharingService.sendDataToSharedService(jsonStrin);
    } else {
      const defaultValue = this.funciones[0];
      // Envía los datos al servicio compartido
      const jsonData = {
        seats: this.getSelectedSeats(),
        price: moviePrice,
        selection: defaultValue.nombre,
      };
      const jsonString = JSON.stringify(jsonData);
      this.dataSharingService.sendDataToSharedService(jsonString);
    }
  }

  updateSelectedCount() {
    this.selectedSeatsCount = this.seatRows.reduce((count, row) => {
      return count + row.filter((seat) => seat.selected).length;
    }, 0);
  }

  updateSelectedMovie(event: any) {
    const price = event.target.value;
    // Convierte el precio a tipo numérico
    this.ticketPrice = +price;
    // Actualiza la cantidad de asientos seleccionados
    this.updateSelectedCount();
    // Actualiza el precio de la película seleccionada
    this.setMovieData(event.target.selectedIndex, price);
  }

  saveSelectedSeatsToLocalStorage(row: number, seat: number) {
    let selectedSeats = this.localStorageService.getItem('selectedSeats') || [];
    if (this.seatRows[row][seat].selected) {
      selectedSeats.push({ row, seat });
    } else {
      selectedSeats = selectedSeats.filter(
        (seatPosition: { row: number; seat: number }) =>
          seatPosition.row !== row || seatPosition.seat !== seat
      );
    }
    this.localStorageService.setItem('selectedSeats', selectedSeats);

    // Envía los datos al servicio compartido
    // const jsonData = {
    //   seats: this.getSelectedSeats(),
    //   price: this.ticketPrice,
    // };
    // const jsonString = JSON.stringify(jsonData);
    // this.dataSharingService.sendDataToSharedService(jsonString);
    // Obtén el texto del option seleccionado del select
    const selectedOptionText =
      this.select?.nativeElement.selectedOptions[0]?.text;

    if (
      selectedOptionText != null &&
      selectedOptionText != '' &&
      selectedOptionText != undefined
    ) {
      // Envía los datos al servicio compartido
      const jsonDat = {
        seats: this.getSelectedSeats(),
        price: this.ticketPrice,
        selection: selectedOptionText,
      };
      const jsonStrin = JSON.stringify(jsonDat);
      this.dataSharingService.sendDataToSharedService(jsonStrin);
    } else {
      const defaultValue = this.funciones[0];
      // Envía los datos al servicio compartido
      const jsonData = {
        seats: this.getSelectedSeats(),
        price: this.ticketPrice,
        selection: defaultValue.nombre,
      };
      const jsonString = JSON.stringify(jsonData);
      this.dataSharingService.sendDataToSharedService(jsonString);
    }
  }

  toggleSeatSelection(row: number, seat: number) {
    if (!this.seatRows[row][seat].sold) {
      this.seatRows[row][seat].selected = !this.seatRows[row][seat].selected;
      this.updateSelectedCount();
      this.saveSelectedSeatsToLocalStorage(row, seat);
      if (this.seatRows[row][seat].selected) {
        this.selectedSeatPosition = { row, seat };
      } else {
        this.selectedSeatPosition = null;
      }
    }
  }

  getFuncionesByCine(id_cine: string) {
    this.cineService.getAllFuncionesInCines(id_cine).subscribe({
      next: (response) => {
        this.funciones = response.funciones;
        this.seatRows = this.generateSeatRows();
        this.ticketPrice = +this.funciones[0].precio;
        this.setMovieData(0, this.funciones[0].precio);
      },
      error: (error) => {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'No se encontraron funciones para el cine seleccionado.',
        }).then(() => {
          window.history.back();
        });
      },
    });
  }

  generateSeatRows(): Seat[][] {
    // Generate seat rows based on your seat arrangement logic
    // Example implementation:
    const rows: Seat[][] = [];
    const numRows = 8;
    const numSeatsPerRow = 8;

    for (let i = 0; i < numRows; i++) {
      const row: Seat[] = [];
      for (let j = 0; j < numSeatsPerRow; j++) {
        const seat: Seat = { sold: false, selected: false };
        row.push(seat);
      }
      rows.push(row);
    }

    return rows;
  }

  cleanSelectedSeats() {
    this.localStorageService.removeItem('selectedSeats');
  }

  getSelectedSeats(): { row: number; seat: number }[] {
    const selectedSeats =
      this.localStorageService.getItem('selectedSeats') || [];
    return selectedSeats;
  }
}
