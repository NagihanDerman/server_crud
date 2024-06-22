import { useEffect, useState } from "react";
import Form from "./components/Form";
import Loader from "./components/Loader";
import ListItem from "./components/ListItem";
import axios from "axios";

//varsayilan olarak baseUrl ekle, yapilan butun isteklerin basindaki api url ini belirle
axios.defaults.baseURL = `http://localhost:3000`;

function App() {
  const [todos, setTodos] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPageCount, setMaxPageCount] = useState();
  // bileşen ekrana basılma olayını izler
  useEffect(() => {
    //apiden todo verilerini al
    axios
      .get("/todos", {
        timeout: 3000,
        timeoutErrorMessage: "délai d'attente",
        params: {
          _per_page: 10,
          _page: page,
        },
      })
      .then((res) => {
        setMaxPageCount(res.data.pages);
        setTodos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "délai d'attente") {
          alert("La requête a expiré");
        }
      });
  }, [page]);

  return (
    <div className="container p-3 p-md-5">
      <h2 className="text-center ">
        Server<span className="text-warning">CRUD</span>
      </h2>

      <Form setTodos={setTodos} />
      <ul className="list-group">
        {!todos && <Loader />}
        {todos?.map((todo) => (
          <ListItem
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </ul>
      <div className="d-flex justify-content-between">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary"
        >
          {"<Retour"}
        </button>
        <span> {page}</span>
        <button
          disabled={page === maxPageCount}
          onClick={() => setPage(page + 1)}
          className="btn btn-primary"
        >
          {"> Suivant"}
        </button>
      </div>
    </div>
  );
}

export default App;
