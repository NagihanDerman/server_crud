import formatDate from "../helpers/formatDate";
import axios from "axios";
import { useState } from "react";
import Content from "./Content";
import EditMode from "./EditMode";

const ListItem = ({ todo, setTodos, todos }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  //silme butonina tiklaninca calisir
  const handleDelete = () => {
    //veriyi api den sil
    axios
      .delete(`/todos/${todo.id}`)
      //veriyi state den sil
      .then(() =>
        setTodos((todos) => todos.filter((item) => item.id !== todo.id))
      );
  };

  const handleEdit = (e) => {
    //form gonderilince calisir
    e.preventDefault();

    //inputlardaki value leri alma
    const newStatus = e.target[0].value;
    const newTitle = e.target[1].value;

    //api deki ilgili todo yu guncelle
    axios
      .patch(`/todos/${todo.id}`, {
        title: newTitle,
        status: newStatus,
      })

      //api istegi basarili olursa ara yuzu guncelle
      .then(() => {
        // todonun title ve statusunu güncelle
        const updated = { ...todo, status: newStatus, title: newTitle };
        // console.log("eski", todo);
        // console.log("yeni", updated);

        const newTodos = todos.map((todo) =>
          todo.id === updated.id ? updated : todo
        );

        setTodos(newTodos);
      });
    //ara yuzu guncelle
    //statte deki eski todo yu kamdir yenisini koy

    // dizideki eski todoyu kaldır yerine yenisini koy
    // eğerki eleman güncellenicek eleman ise
    // o zaman diziye güncel halini "updated" ekle
    // değilse dizideki halini "todo" ekle

    // düznelme modunu kapat
    setIsEditMode(false);
  };

  return (
    <li className="relative p-3 list-group-item d-flex justify-content-between align-items-center gap-3">
      {!isEditMode ? (
        <Content
          todo={todo}
          setIsEditMode={setIsEditMode}
          handleDelete={handleDelete}
        />
      ) : (
        <EditMode
          todo={todo}
          setIsEditMode={setIsEditMode}
          handleEdit={handleEdit}
        />
      )}

      <span className="date">{formatDate(todo.date)}</span>
    </li>
  );
};

export default ListItem;
