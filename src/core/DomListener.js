import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListener() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        // eslint-disable-next-line max-len
        throw new Error(`Method ${method} is not implement in ${this.name || ''} Component`)
      }
      this[method] = this[method].bind(this )
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listeners) => {
      const method = getMethodName(listeners)
      this.$root.off(listeners, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
