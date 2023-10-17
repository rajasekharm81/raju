import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import "./Upload.css";

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "ohnmmopp");
    axios
      .post("https://api.cloudinary.com/v1_1/dhuwymwdc/image/upload", formData)
      .then((response) => {
        const newImages = [...uploadedImages, response.data.secure_url];
        setUploadedImages(newImages);
      })
      .catch((error) => {
        console.error("Error uploading the image: ", error);
      });
  };

  return (
    <div className="cont-container mt-5 m-5 col-11 col-md-6 mx-auto d-flex flex-column align-items-center">
      <div className="text-center">
        <input
          type="file"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
          }}
        />
        <button className="btn btn-primary mt-3" onClick={uploadImage}>
          Upload
        </button>
      </div>
      <div className="col-11 col-md-4 flex-wrap mt-5">
        {uploadedImages.length > 0 && (
          <div>
            <h2 className="text-center">Uploaded Images</h2>
            <div className="d-flex flex-wrap justify-content-center">
              {uploadedImages.map((imageUrl, index) => (
                <div key={index} className="m-3">
                  <a href={imageUrl} download={`image${index}`}>
                    <Image
                      cloudName="dhuwymwdc"
                      publicId={imageUrl}
                      width="300"
                    />
                    <div style={{ textAlign: "center" }}>
                      <i
                        className="bi bi-download"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;

// import React, { useState } from "react";
// import "./Upload.css";

// function Timer() {
//   const [currentTime, setCurrentTime] = useState(null);
//   const [isTimerIn, setIsTimerIn] = useState(true);

//   const handleTimerIn = () => {
//     const time = new Date().toLocaleTimeString();
//     setCurrentTime(time);
//     setIsTimerIn(false);
//   };

//   const handleTimerOut = () => {
//     const time = new Date().toLocaleTimeString();
//     setCurrentTime(time);
//     setIsTimerIn(true);
//   };

//   return (
//     <div className="inandout mt-5 m-5">
//       {isTimerIn ? (
//         <button className="btn btn-primary" onClick={handleTimerIn}>
//           Timer In
//         </button>
//       ) : (
//         <button className="btn btn-primary" onClick={handleTimerOut}>
//           Timer Out
//         </button>
//       )}
//       {currentTime && <div className="mt-3">Current Time: {currentTime}</div>}
//     </div>
//   );
// }

// export default Timer;

// import React, { useEffect, useState } from "react";

// const Upload = () => {
//   const [data, setData] = useState([]);
//   const [limit, setLimit] = useState(10); // Adjust the limit as needed
//   const [offset, setOffset] = useState(1); // Adjust the offset as needed
//   const url = `https://jsonplaceholder.typicode.com/comments?_limit=${limit}&_start=${offset}`;

//   useEffect(() => {
//     fetch(url)
//       .then((response) => response.json())
//       .then((json) => {
//         setData(json);
//       });
//   }, [limit, offset]);

//   return (
//     <div>
//       <h2>API Integration</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>S.no</th>
//             <th>Name</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={item.id}>
//               <td>{index + 1 + offset}</td>
//               <td>{item.name}</td>
//               <td>{item.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Upload;
