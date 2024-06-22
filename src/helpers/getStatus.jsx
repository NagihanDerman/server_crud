const getStatus = (status) => {
  switch (status) {
    case "important":
      return <span className="badge bg-danger">Important</span>;
    case "travail":
      return <span className="badge bg-warning">Travail</span>;
    case "quotidien":
      return <span className="badge bg-primary">Quotidien</span>;
    default:
      return <span className="bagde bg-secondary">Défaut</span>;
  }
};
export default getStatus;
