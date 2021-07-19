import React, { useState } from "react"
import jwt_decode from "jwt-decode"

import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"


// Import Style
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}))
/** 
 * NOTE: A better solution will be use a editor library widget
 * https://dev.to/shaerins/setting-up-a-basic-rich-text-editor-in-react-3afg
 */
const PostCreateWidget = ({ addPost }) => {
  const token = JSON.parse(localStorage.getItem("user"))
  var decoded = ""
  if (token !== null) {
    decoded = jwt_decode(token)
  }

  const [state, setState] = useState({ name: decoded.name, content:" " })
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const classes = useStyles()
  const uploadImage = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "hbjyxfkx")
    data.append("cloud_name", "mariluss")
    fetch("https://api.cloudinary.com/v1_1/mariluss/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url)
        setState({ ...state, content: state.content + " " + data.url + " " })
      })
      .catch((err) => console.log(err))
  }
  const submit = () => {
    if (state.title && state.content) {
      addPost(state)
    }
  }

  const handleChange = (evt) => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create new post</h3>
      <TextField
        variant="filled"
        disabled
        label="Author name"
        value={decoded.name}
        onChange={handleChange}
      ></TextField>
      <TextField
        variant="filled"
        label="Post title"
        name="title"
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        multiline
        rows="4"
        label="Post content"
        name="content"
        value={state.content}
        onChange={handleChange}
      />

      <div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <TextField
            className="mt-4"
            color="primary"
            type="file"
            
            onChange={(e) => setImage(e.target.files[0])}
          ></TextField>
          <Button
            className="mt-4"
            variant="contained"
            color="secondary"
            onClick={uploadImage}
          >
            Upload Image
          </Button>
        </div>
      </div>
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit()}
        disabled={!state.title || !state.content}
      >
        Submit
      </Button>
    </div>
  )
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
}

export default PostCreateWidget
