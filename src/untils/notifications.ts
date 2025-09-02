// Simple SweetAlert2 wrapper for consistent notifications via CDN usage
// Assumes SweetAlert2 is loaded globally as `Swal` from a CDN in index.html

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Swal: any | undefined

const hasSwal = (): boolean => typeof Swal !== 'undefined' && typeof Swal.fire === 'function'

export const notifySuccess = (title: string, text?: string): void => {
  if (hasSwal()) {
    Swal.fire({ icon: 'success', title, text, timer: 1500, showConfirmButton: false })
  } else {
    // Fallback
    alert(title + (text ? `\n${text}` : ''))
  }
}

export const notifyError = (title: string, text?: string): void => {
  if (hasSwal()) {
    Swal.fire({ icon: 'error', title, text })
  } else {
    // Fallback
    alert(title + (text ? `\n${text}` : ''))
  }
}

export const confirmAction = async (title: string, text?: string): Promise<boolean> => {
  if (hasSwal()) {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
    return !!result.isConfirmed
  }
  // Fallback
  return confirm(title + (text ? `\n${text}` : ''))
}


