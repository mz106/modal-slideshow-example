import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Slide, Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import ReactDOM from "react-dom";
import Modal from "react-modal";

function App() {
  let subtitle;
  const [images, setImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function doStuff() {
    const res = await fetch(
      `https://api.unsplash.com/photos?page=1&client_id=${
        import.meta.env.VITE_UNSPLASH_KEY
      }`
    );
    const data = await res.json();
    console.log("data in doStuff");
    return data;
  }

  function closeModal(e) {
    // setImages([]);

    console.log("close modal");
    setModalIsOpen(false);
  }

  const handleHover = async (e) => {
    console.log("hello hover");

    const data = await doStuff();
    await setImages(data);
    console.log(data);
    await setModalIsOpen(true);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
    console.log("hello onAfterModalOpen");
  }
  // for modal
  const customStyles = {
    overlay: {
      // opacity: 0.5,
      backgroundColor: "green",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      // display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
      // justifyContent: "center",
      // backgroundSize: "cover",
      // backgroundColor: "blue",
      // height: "400px",

      height: "300px",
      width: "400px",
    },
  };
  // for slide
  const divStyle = {
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    // height: "400px",
    height: "300px",
    width: "400px",
    backgroundColor: "gold",
  };

  return (
    <>
      <div className="testtest" onMouseEnter={handleHover}>
        <p>hello hover</p>
        <Modal
          isOpen={modalIsOpen}
          images={images}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          // contentLabel="Example Modal"
          // onMouseLeave={closeModal}
        >
          {/* <p>Modal is open</p> */}
          {/* <button onClick={(e) => closeModal(e)}>Close Modal</button> */}
          <Slide images={images}>
            {images.map((image, index) => (
              <div key={index} onClick={(e) => closeModal(e)}>
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${image.urls.regular})`,
                  }}
                >
                  {/* <img src={image.urls.regular} /> */}
                  {/* <span style={spanStyle}>{slideImage.caption}</span> */}
                </div>
              </div>
            ))}
          </Slide>
          ;
        </Modal>
      </div>
    </>
  );
}

export default App;
