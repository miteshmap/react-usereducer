import React, { useReducer } from "react";
import "./styles.css";

function LoginReducer(state, action) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.name]: action.value,
        error: "",
        isLoading: false,
        isLoggedIn: false
      };
      break;

    case "login":
      return {
        ...state,
        error: "",
        isLoading: true,
        isLoggedIn: false
      };
      break;

    case "success":
      return {
        ...state,
        error: "",
        isLoading: false,
        isLoggedIn: true
      };
      break;

    case "error":
      return {
        ...state,
        error: "We could not found user with given username and password",
        isLoading: false,
        isLoggedIn: false
      };
      break;
    default:
      break;
  }
  return state;
}

const initialState = {
  username: "",
  password: "",
  error: "",
  isLoading: false,
  isLoggedIn: false
};

async function login({ username, password }) {
  return Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "mitesh" && password === "mitesh") {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}

export default function App() {
  const [state, dispatch] = useReducer(LoginReducer, initialState);
  const { username, password, isLoading, isLoggedIn, error } = state;

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "login" });
    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch {
      dispatch({ type: "error" });
    }
  };

  return isLoggedIn ? (
    `Hello ${username} !!`
  ) : (
    <form className="bs-example bs-example-form my-5" onSubmit={onSubmit}>
      <div className="container-fluid">
        <div className="panel panel-default">
          <div className="panel-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                <span
                  className="glyphicon glyphicon-exclamation-sign"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Error:</span>
                {error}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    name: "username",
                    value: e.currentTarget.value
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    name: "password",
                    value: e.currentTarget.value
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-default"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Loging in..." : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
