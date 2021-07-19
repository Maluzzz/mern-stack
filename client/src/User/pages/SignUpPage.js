import { Button, TextField } from "@material-ui/core"

import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { signUpUser } from "../UserActions"

const SignUpPage = () => {
  const [state, setState] = useState({})
  const dispatch = useDispatch()
  const name = useSelector((state) => state.user.name)
  const error = useSelector((state) => state.user.error)

  const submit = (e) => {
    e.preventDefault()
    dispatch(signUpUser(state))
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
      {name ? (
        <p>
          Welcome {name}! go to login to star writting <a href="/">login</a>
        </p>
      ) : (
        <form onSubmit={submit}>
          <p style={{ color: "red" }}>{error}</p>
          <TextField
            type="name"
            name="name"
            label="Name"
            aria-describedby="name"
            onChange={handleChange}
          />
          <br />
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
          <Button
            className="mt-4"
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  )
}

export default SignUpPage
