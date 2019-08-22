export default class JsLoad {
  /**
   * 创建script
   * @param url
   * @returns {Promise}
   */
  createScript (url, removeScript = true) {
    const scriptElement = document.createElement('script')
    scriptElement.src = url
    this.prependChild(document.body, scriptElement)

    return new Promise((resolve, reject) => {
      scriptElement.addEventListener(
        'load',
        e => {
          if (removeScript) {
            this.removeScript(scriptElement)
          }
          resolve(e)
        },
        false
      )

      scriptElement.addEventListener(
        'error',
        e => {
          if (removeScript) {
            this.removeScript(scriptElement)
          }
          reject(e)
        },
        false
      )
    })
  }
  prependChild (parent, newChild) {
    if (parent.firstChild) {
      parent.insertBefore(newChild, parent.firstChild)
    } else {
      parent.appendChild(newChild)
    }
    return parent
  }
  /**
   * 移除script标签
   * @param scriptElement script dom
   */
  removeScript (scriptElement) {
    document.body.removeChild(scriptElement)
  }
}
