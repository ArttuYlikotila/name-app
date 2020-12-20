import Swal from 'sweetalert2';

export function insertName() {
  Swal.fire({
    icon: 'error',
    title: 'Can not perform search!',
    text: 'Insert name first.',
    confirmButtonColor: '#282828',
    showClass: {
      popup: 'animated fadeInDown faster'
    },
    hideClass: {
      popup: 'animated fadeOutUp faster'
    }
  });
}

export function errorMsg(msg) {
  Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: msg,
    confirmButtonColor: '#282828',
    showClass: {
      popup: 'animated fadeInDown faster'
    },
    hideClass: {
      popup: 'animated fadeOutUp faster'
    }
  });
}

export function amountOfName(result) {
  Swal.fire({
    text: `The amount of name ${result.name} in data is ${result.amount}.`,
    confirmButtonColor: '#282828',
    showClass: {
      popup: 'animated fadeInDown faster'
    },
    hideClass: {
      popup: 'animated fadeOutUp faster'
    }
  });
}

export function totalAmount(number) {
  Swal.fire({
    text: `Total amount of names in data is ${number}.`,
    confirmButtonColor: '#282828',
    showClass: {
      popup: 'animated fadeInDown faster'
    },
    hideClass: {
      popup: 'animated fadeOutUp faster'
    }
  });
}
