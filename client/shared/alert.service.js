class AlertService {

    constructor() {
      this.opened = null
    }

    openAlert(id) {
        const alert = document.getElementById(id)
        const opened = alert.getAttribute('opened')
        if (opened === '' && this.opened !== id) {
          alert.removeAttribute('opened')
        }
        else {
          alert.setAttribute('opened', '')
          this.opened = id
          setTimeout(() => {
            alert.removeAttribute('opened')
            this.opened = null
          }, 5000)
        }
    }
}

export default AlertService = new AlertService()