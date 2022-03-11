const ImgGroup = ({ info }) => {
  const { itemname, path } = info;
  return (
    <div className="img-group">
      <img src={path ? path : ""} alt={itemname} />
      <img src={path ? path : ""} alt={itemname} />
    </div>
  );
};

export default ImgGroup;
