const EditMode = ({ todo, setIsEditMode, handleEdit }) => {
  return (
    <form
      onSubmit={handleEdit}
      className="d-flex w-100 justify-content-between align-items-center gap-3"
    >
      <select defaultValue={todo.status} className="form-select shadow w-50">
        <option value="défaut">Défaut</option>
        <option value="important">Important</option>
        <option value="quotidien">Quotidien</option>
        <option value="travil">Travail</option>
      </select>
      <input
        defaultValue={todo.title}
        className="form-control shadow"
        type="text"
      />
      <div className="btn-group">
        <button type="submit" className="btn btn-success btn-sm">
          Confirmer
        </button>
        <button
          type="button"
          onClick={() => setIsEditMode(false)}
          className="btn btn-secondary btn-sm"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default EditMode;
