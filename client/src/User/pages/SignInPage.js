import { Button, TextField } from "@material-ui/core"

import React, { useState, useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { loginUser } from "../UserActions"

const SignInPage = (props) => {
  const [state, setState] = useState({})
  const dispatch = useDispatch()

  const submit = (e) => {
    e.preventDefault()
    dispatch(loginUser(state))
  }

  const handleChange = (evt) => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }
  return (
    <div
      className="container"
      style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}
    >
      <form onSubmit={submit}>
        {JSON.parse(localStorage.getItem("user")) !== null ||
        props.token !== "" ? (
          <Redirect to="/posts" />
        ) : (
          ""
        )}

        <p style={{ color: "red" }}>{props.error}</p>
        <TextField
          type="email"
          name="email"
          label="Email"
          aria-describedby="emailHelp"
          onChange={handleChange}
        />
        <br />
        <TextField
          type="password"
          label="Password"
          name="password"
          onChange={handleChange}
        />
        <br />
        <br />
        <p>
          Not account? <a href="/signup">sing up</a>
        </p>
        <Button
          className="mt-4"
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    error: state.user.error || "",
    token: state.user.token || "",
  }
}

export default connect(mapStateToProps)(SignInPage)
