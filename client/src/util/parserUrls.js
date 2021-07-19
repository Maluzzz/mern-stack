import React from "react"
export const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

export const renderImages = (txt) => {
  txt = txt.replace(/\n/g, " ")
  return txt.split(" ").map((part,i) => {
    return URL_REGEX.test(part) ? (
      <div style={{display:'flex', justifyContent:'center',padding:'10px'}}>
        <img width="600px" height="80%" alt={i+'-img'}
         src={part} />

        <br />
      </div>
    ) : (
      part + " "
    )
  })
}
export const onlyText = (txt) => {
  txt = txt.replace(/\n/g, " ")
  return txt
    .split(" ")
    .map((part) => {
      return URL_REGEX.test(part) ? "" : part + " "
    })
    .join(" ")
}
export const getFirstImage = (txt) => {
  txt = txt.replace(/\n/g, " ")
  const result = txt
    .split(" ")
    .map((part) => {
      return URL_REGEX.test(part) ? part : " "
    })
    .filter((element) => element !== " ")[0]
  return result !== undefined
    ? result
    : "https://images.pexels.com/photos/4040654/pexels-photo-4040654.jpeg" //TO.DO: change for own hosted image
}
export default renderImages
