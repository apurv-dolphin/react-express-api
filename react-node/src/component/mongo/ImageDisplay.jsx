/* eslint-disable react/prop-types */
import { Buffer } from "buffer";

const ImageDisplay = ({ bufferData }) => {
  // Check if the bufferData is of the expected format (Buffer).
  if (
    bufferData &&
    bufferData.type === "Buffer" &&
    Array.isArray(bufferData.data)
  ) {
    // Convert the Buffer data to a base64 string.
    const base64String = Buffer.from(bufferData.data).toString("base64");

    // Create a Data URL for the image.
    const imageUrl = `data:image/jpeg;base64,${base64String}`;

    return (
      <img
        src={imageUrl}
        alt="Buffer Image"
        height={100}
        width={100}
        style={{ objectFit: "contain" }}
      />
    );
  } else {
    return (
      <img
        src="./placeholder.jpg"
        alt="Buffer Image"
        height={100}
        width={100}
      />
    );
  }
};

export default ImageDisplay;
