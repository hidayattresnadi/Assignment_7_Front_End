import Swal from 'sweetalert2'
export function successSwal(message) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: message
    })
}

export function validateInputBook(book) {
    const date = new Date();
    const newErrors = {}
    if (book.isbn.length < 13) {
        newErrors.isbn = 'Isbn must be at least 13 characters'
    }
    if (!book.title || book.title.length < 3) {
        newErrors.title = 'title must be at least 3 characters'
    }
    if (!book.author) {
        newErrors.author = 'author is required'
    }
    if (book.publicationYear > date.getFullYear()) {
        newErrors.publicationYear = 'year is exceeded from this year'
    }
    if (!book.publicationYear) {
        newErrors.publicationYear = 'year is required'
    }
    if (!book.category) {
        newErrors.category = 'please choose category'
    }
    if (!book.publisher) {
        newErrors.publisher = 'publisher is required'
    }
    if (!book.description) {
        newErrors.description = 'description is required'
    }
    if (!book.price) {
        newErrors.price = 'price is required'
    }
    if (!book.libraryLocation) {
        newErrors.libraryLocation = 'library location is required'
    }
    if (!book.availableBooks) {
        newErrors.availableBooks = 'available Books is required'
    }
    if (!book.purchaseDate) {
        newErrors.purchaseDate = 'purchase date is required'
    }
    return newErrors;
}

export function validateInputMember(member) {
    const newErrors = {};
        if (!member.firstName) {
            newErrors.firstName = 'First Name is required'
        }
        if (!member.lastName) {
            newErrors.lastName = 'Last Name is required'
        }
        if (!member.position) {
            newErrors.position = 'Position is required'
        }
        if (!member.privilege) {
            newErrors.privilege = 'Privilege is required'
        }
    return newErrors;
}

export function failedSwal(error){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        footer: '<a href="">Why do I have this issue?</a>'
      })
}

const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Untuk 4-20 selalu "th"
    const lastDigit = day % 10;
    if (lastDigit === 1) return 'st';
    if (lastDigit === 2) return 'nd';
    if (lastDigit === 3) return 'rd';
    return 'th';
};

export const formatDateWithOrdinal = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const ordinal = getOrdinalSuffix(day);

    return `${month} ${day}${ordinal}, ${year}`;
};

export const formatDateOnly = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export function validateLogin (user ) {
    const newErrors = {};

    if (!user.email) {
        newErrors.email = 'Email is required'
    }

    if(!user.password) {
        newErrors.password = 'Password is required'
    }

    return newErrors;
}

export function validateRequestBook (bookRequest ) {
    const newErrors = {};

    if (!bookRequest.title) {
        newErrors.title = 'Title is required'
    }

    if(!bookRequest.isbn) {
        newErrors.isbn = 'ISBN is required'
    }

    if(!bookRequest.author) {
        newErrors.author = 'Author is required'
    }

    if(!bookRequest.publisher) {
        newErrors.publisher = 'Publisher is required'
    }

    return newErrors;
}
