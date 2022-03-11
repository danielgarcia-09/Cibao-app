const ImgGroup = ({ info }) => {
  const { Account, Images } = info;

  return (
    <div className="img-group">
      <img src={Images ? Images[0] : ""} alt="Front" />
      <img src={Images ? Images[1] : ""} alt="Back" />
    </div>
  );
};

export default ImgGroup;
