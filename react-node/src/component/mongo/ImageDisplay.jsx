/* eslint-disable react/prop-types */

const ImageDisplay = ({ src }) => {
  if (src) {
    const imageUrl = `http://localhost:7000/${src}`;
    return (
      <img
        src={imageUrl}
        alt="User Image"
        className="profile-img"
        style={{ objectFit: "contain" }}
      />
    );
  } else {
    return (
      <img
        src="./placeholder.jpg"
        alt="User Image"
        height={100}
        width={100}
      />
    );
  }
};

export default ImageDisplay;
