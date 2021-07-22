import React, { useState, useEffect } from "react";
import "./RequestContainer.css";
import QuerryAnswer from "./QuerryAnswer";
import Dropzone from "react-dropzone";
export default function RequestContainer() {
  const [selectedFile, setselectedFile] = useState();
  const [selectedFileURL, setselectedFileURL] = useState();
  const [Response, setResponse] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [NoImageState, setNoImageState] = useState(false);
  const [FetchingStatus, setFetchingStatus] = useState(false);

  function onFileChange(e) {
    //setselectedFile(e.target.files[0])
    setselectedFileURL(URL.createObjectURL(e.target.files[0]));
    setselectedFile(e.target.files[0]);
    console.log(NoImageState);
  }

  useEffect(() => {}, [FetchingStatus]);

  function CheckImage() {
    setFetchingStatus(true);
    if (selectedFile) {
      const formdata = new FormData();
      formdata.append("image", selectedFile, selectedFile.name);
      var img = new Image();
      img.src = selectedFileURL;

      var canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      fetch("https://api.trace.moe/search", {
        method: "POST",
        body: JSON.stringify({ image: canvas.toDataURL("image/jpeg", 0.8) }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          setResponse(result);
          setLoaded(true);
          setFetchingStatus(false);
          /*  console.log(result)
      console.log("CacheHit is "+result.CacheHit);
      console.log("DOCS "+result.docs.map( element => element.anime)) */
        });

      // console.log("Checked image" +selectedFile,selectedFile.name)
    } else {
      setNoImageState(true);
    }
  }

  return (
    <div>
      <div className="RequestContainer">
        <div className="PreviewImageContainer">
          {!selectedFileURL ? (
            <Dropzone>
              {({ getRootProps, getInputProps }) => (
                <section className="AwaitingImage">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} onChange={onFileChange} />
                    <p> Drop your screenshot here ! </p>
                  </div>
                </section>
              )}
            </Dropzone>
          ) : (
            <img className="PreviewImage" src={selectedFileURL} alt="" />
          )}{" "}
        </div>
        <div className="InteractionButtons">
          <input
            type="file"
            name=""
            id="img"
            className="InteractionImg"
            onChange={onFileChange}
            accept="image/x-png,image/jpeg ,image/jpg"
          />
          <button onClick={CheckImage} className="SubmitButton">
            {" "}
            submit
          </button>
        </div>
      </div>
      {Loaded ? (
        <QuerryAnswer Status={FetchingStatus} Result={Response} />
      ) : (
        <div className="QuerryContainerLoading">
          Awaiting{" "}
          <div className="lds-ripple2">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
