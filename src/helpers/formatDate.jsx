//tarihi alir ve geriye ay/gun formatinda dondurur.
const formatDate = (dateStr) => {
  //metin formatindaki tarihi cizgilere gore bolerek ayirma
  const date = dateStr.split("/");
  //formatlayip dondur
  return date[0] + "/" + date[1];
};
export default formatDate;
