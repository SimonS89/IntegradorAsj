import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public question(
    tittle: string,
    showConfirmButton: boolean,
    showCancelButton: boolean,
    btnConfirmText: string,
    btnCancelText: string,
    confirmButtonColor: string = '#6cbdb8',
    cancelButtonColor: string = '#c23a00',
    background: string = '#f5f5f5'
  ): Promise<any> {
    return new Promise((resolve) => {
      Swal.fire({
        html: `<p><strong>${tittle}</strong></p> `,
        showConfirmButton: showConfirmButton,
        showCloseButton: false,
        showCancelButton: showCancelButton,
        focusConfirm: true,
        confirmButtonText: btnConfirmText,
        cancelButtonText: btnCancelText,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: confirmButtonColor,
        cancelButtonColor: cancelButtonColor,
        background: background,
        width: 312,
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else if (
          result.dismiss === Swal.DismissReason.cancel ||
          result.dismiss === Swal.DismissReason.close
        ) {
          resolve(false);
        }
      });
    });
  }

  public notification(title: string, icon: any = 'success') {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      showConfirmButton: true,
    });
  }
  public loading(text: string): void {
    Swal.fire({
      showConfirmButton: false,
      showCloseButton: false,
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      footer: `<p>${text}</p>`,
      width: 312,
    });
    Swal.showLoading();
  }

  public close(): void {
    Swal.close();
  }
}
