export function richHandle(content) {
  const reg = /<b>/g
  let newContent = content.replace(reg, "<b style='color: #42a5f5'>")
  if (content.startsWith("...")) {
    newContent = newContent.slice(3)
  }
  if (content.endsWith("...")) {
    newContent = newContent.slice(0, newContent.length - 3)
  }
  return newContent
}