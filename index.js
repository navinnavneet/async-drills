const fs = require("fs");
const path = require("path");

// Q. 1

async function login(username, password) {
  const expirationTime = 120000;
  let loginToken = null;
  let error = null;
  try {
    const loginDataJSON = await fs.promises.readFile(
      path.join(__dirname, "./login.json"),
      { encoding: "utf-8" }
    );

    const loginData = JSON.parse(loginDataJSON);

    if (loginData[username] && loginData[username] === password) {
      loginToken = {
        user: username,
        isLoggedIn: true,
        id: username + Date.now(),
        expiryDate: new Date(new Date().getTime() + expirationTime),
      };
    } else if (loginData[username] && loginData[username] !== password) {
      error = {
        user: username,
        isLoggedIn: false,
        code: 400,
        message: "Incorrect Password",
      };
    } else {
      error = {
        user: username,
        isLoggedIn: false,
        code: 404,
        message: "User Not Found",
      };
    }
  } catch (err) {
    console.log(err);
    error = {
      user: username,
      isLoggedIn: false,
      code: 500,
      message: "Internal Server Error",
    };
  }

  return loginToken !== null ? loginToken : error;
}

setTimeout(() => {
  login("jim@microsoft.com", "jimmarketplace")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}, 4000);

// Q. 2

async function getUser(loginData, isExpired) {
  if (loginData.isLoggedIn && !isExpired) {
    const userDataJSON = await fs.promises.readFile(
      path.join(__dirname, "./profile.json"),
      { encoding: "utf-8" }
    );
    const userData = JSON.parse(userDataJSON);
    if (userData[loginData.user]) {
      const userDetails = userData[loginData.user];
      return userDetails;
    } else {
      return {
        code: 404,
        message: "User Not Found",
      };
    }
  } else if (loginData.isLoggedIn && loginData.isExpired) {
    return {
      code: 403,
      message: "UnAuthorized (login expired)",
    };
  } else if (!loginData.isLoggedIn) {
    return {
      code: 401,
      message: "UnAuthenticated (not signed in)",
    };
  } else
    return {
      code: 500,
      message: "Internal Server Error",
    };
}

login("jim@microsoft.com", "jimmarketplace").then(
  (res) => {
    const now = new Date();
    const isExpired = now > res.expiryDate;
    if (res.isLoggedIn && !isExpired) {
      setTimeout(() => {
        getUser(res, isExpired).then(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
      }, 3000);
    }
  },
  (err) => {
    console.log(err);
  }
);

// Q. 3

async function getUserTodoList(loginData, isExpired) {
  if (loginData.isLoggedIn && !isExpired) {
    const todoDataJSON = await fs.promises.readFile(
      path.join(__dirname, "./todo-list.json"),
      { encoding: "utf-8" }
    );
    const todoData = JSON.parse(todoDataJSON);
    if (todoData[loginData.user]) {
      const userTodoList = todoData[loginData.user];
      return userTodoList;
    } else if (loginData.isLoggedIn && loginData.isExpired) {
      return {
        code: 403,
        message: "UnAuthorized (login expired)",
      };
    } else if (!loginData.isLoggedIn) {
      return {
        code: 401,
        message: "UnAuthenticated (not signed in)",
      };
    }
  } else {
    return {
      code: 500,
      message: "Internal Server Error",
    };
  }
}

login("jim@microsoft.com", "jimmarketplace").then(
  (res) => {
    const now = new Date();
    const isExpired = now > res.expiryDate;
    if (res.isLoggedIn && !isExpired) {
      setTimeout(() => {
        getUserTodoList(res, isExpired).then(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
      }, 3000);
    }
  },
  (err) => {
    console.log(err);
  }
);
