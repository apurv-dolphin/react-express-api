/* eslint-disable react/prop-types */

const ImageDisplay = ({ src }) => {
  if (src) {
    const imageUrl = `http://localhost:7000/${src}`;
    return (
      <img
        src={imageUrl}
        alt="User Profile"
        className="profile-img"
        style={{ objectFit: "contain" }}
        height={100}
        width={100}
      />
    );
  } else {
    return (
      <img
        src="./placeholder.jpg"
        alt="User Profile"
        height={100}
        width={100}
      />
    );
  }
};

export default ImageDisplay;
