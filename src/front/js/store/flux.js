const getState = ({ getStore, getActions, setStore }) => {
  const apiURL = process.env.BACKEND_URL + "/api";
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      signUp: async (email, password) => {
        const params = {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const resp = await fetch(`${apiURL}/signup`, params);
        if (resp.status !== 201)
          return { code: resp.status, msg: resp.statusText };
        return { code: 201, msg: "User signup" };
      },
      login: async (email, password) => {
        const params = {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const resp = await fetch(`${apiURL}/login`, params);
        if (resp.status !== 200)
          return alert("Your email or password are invalid");
          // { code: resp.status, msg: resp.statusText };
        const data = await resp.json();
        const token = data.token;
        setStore({ token });
        localStorage.setItem("token", token);
        return { code: 200, msg: "User signup" };
      },
      logout: async () => {
        /* 
        const params = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const resp = await fetch(`${apiURL}/logout`, params);
        if (resp.status !== 200)
          return { code: resp.status, msg: resp.statusText };
        */
        setStore({ token: "" });
        localStorage.removeItem("token");
        return { code: 200, msg: "Session closed" };
      },
    },
  };
};

export default getState;
