export const makeDragable = function (options) {
  let elmnt = options.element
  let elmntHeader = document.getElementById(elmnt.id + 'header')
  elmnt.style.position = 'absolute'
  elmnt.style.zIndex = options.zIndex || '100000000000000000000'
  elmnt.style.top = options.top || elmnt.style.top
  elmnt.style.left = options.left || elmnt.style.left
  elmnt.style.bottom = options.bottom || elmnt.style.bottom
  elmnt.style.right = options.right || elmnt.style.right
  let pos1 = 0
  let pos2 = 0
  let pos3 = 0
  let pos4 = 0
  if (elmntHeader) {
    // if present, the header is where you move the DIV from:
    elmntHeader.style.zIndex = '100000000000000000001'
    elmntHeader.style.cursor = 'move'
    document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown
  }

  function dragMouseDown (e) {
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag (e) {
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
    elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
  }

  function closeDragElement () {
    // stop moving when mouse button is released:
    document.onmouseup = null
    document.onmousemove = null
  }
}
