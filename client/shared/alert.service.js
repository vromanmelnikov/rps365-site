class AlertService {
    openAlert(id) {
        const alert = document.getElementById(id)
        const opened = alert.getAttribute('opened')
        if (opened === '') {
          alert.removeAttribute('opened')
        }
        else {
          alert.setAttribute('opened', '')
          setTimeout(() => {
            alert.removeAttribute('opened')
          }, 5000)
        }
    }
}

export default AlertService = new AlertService()