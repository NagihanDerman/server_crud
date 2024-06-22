import { v4 } from "uuid";
import axios from "axios";

const Form = ({ setTodos }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    //formdan verileri alma
    const title = e.target[0].value;
    const status = e.target[1].value;

    //inputu kontrol et
    if (!title) {
      return alert("vous écrivez un titre");
    }
    //veri tabanina ekleneke veriler
    const newTodo = {
      title: title,
      status: status,
      id: v4(),
      date: new Date().toLocaleDateString(),
    };

    //olusturdugumuz todo yu api e kaydet
    axios
      .post("/todos", newTodo)
      //api istegi basarili olursa newTodo yu state e ekle
      .then(() => setTodos((prev) => [...prev, newTodo]))
      //api istegi basarisiz olursa
      .catch(() => alert("Désole, il y a un problème..."));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center gap-3 my-5"
    >
      <input
        placeholder="ex:react project"
        className="form-control-shadow"
        type="text"
      />
      <select className="form-select w-50 shadow">
        <option value="défaut">Défaut</option>
        <option value="important">Important</option>
        <option value="quotidien">Quotidien</option>
        <option value="travail">Travail</option>
      </select>
      <button type="submit" className="btn btn-primary shadow">
        Ajouter
      </button>
    </form>
  );
};

export default Form;
