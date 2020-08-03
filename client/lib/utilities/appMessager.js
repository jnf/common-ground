const message_from = ({ ok, message, data }) => {
  const header = document.createElement("h3")
  header.innerText = `(${ok}) ${message}`

  const dataBlock = document.createElement("ul")
  Object.entries(data).reduce((ol, [key, value]) => {
    const li = document.createElement("li")
    li.innerText = `${key}: ${value}`
    ol.appendChild(li)

    return ol
  }, dataBlock)

  const div = document.createElement("div")
  div.appendChild(header)
     .appendChild(dataBlock)

  return div
}

const appMessager = (element, payload) => {
  element.appendChild(message_from(payload))
}

export default appMessager
