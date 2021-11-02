import Swal, { SweetAlertResult } from 'sweetalert2';


export const sweetalertConfirmMessage = async (): Promise<SweetAlertResult<any>> => {
  return Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });
};

export const showSweetAlertLoading = (message: string) => {
  Swal.fire({
    text: message,
    allowOutsideClick: false
  });
  Swal.showLoading();
};

export const closeSweetAlertLoading = () => {
  Swal.close();
};
