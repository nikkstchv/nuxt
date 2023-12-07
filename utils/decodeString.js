export default (string, onlyTags = false) => {
  let regex = /<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g

  if (onlyTags) {
    regex = /<[^>]*(>|$)/g
  }

  return string?.replace(regex, ' ')
}
