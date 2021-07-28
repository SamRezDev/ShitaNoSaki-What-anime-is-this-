import React, { useState, useEffect } from "react";
import "./RequestContainer.css";
import QuerryAnswer from "./QuerryAnswer";
import Dropzone from "react-dropzone";
import { storage } from "../firebase/firebase";

export default function RequestContainer() {
  const [selectedFile, setselectedFile] = useState();
  const [selectedFileURL, setselectedFileURL] = useState();
  const [Response, setResponse] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [NoImageState, setNoImageState] = useState(false);
  const [FetchingStatus, setFetchingStatus] = useState(false);
  const [FireBaseLink, setFireBaseLink] = useState("");
  const [progress, setProgress] = useState(0);
  const [FireBaseUpload, setFireBaseUpload] = useState("")

  

  useEffect(() => {
    setselectedFileURL (setselectedFileURL);
    setselectedFile(selectedFile);
    console.log(selectedFile);
  }, [QuerryAnswer,selectedFile,setselectedFileURL,FireBaseUpload,FetchingStatus]);


  async function handleUpload ()  {
    const uploadTask = storage.ref(`images/${selectedFile.name}`).put(selectedFile);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        console.log(progress)
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(selectedFile.name)
          .getDownloadURL()
          .then(url => {
            console.log("THIS LINK IS FROM  HANDLE UPLOAD PRE SET FUNCTION"+ url)
            setFireBaseUpload(url)
            console.log("THIS LINK IS FROM  HANDLE UPLOAD POST SET FUNCTION"+ FireBaseUpload)
            CheckImage(url)
          });
      }
    );
  };


function CheckImage(ActualUrl) {
    setFetchingStatus(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      var img = new Image();
      img.src = selectedFileURL;

      var canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      console.log("THIS LINK IS FROM CHECK IMAGE FUNCTION"+ ActualUrl)
      setFireBaseLink(encodeURIComponent(ActualUrl))
      

      fetch(
        `https://api.trace.moe/search?anilistInfo&url=${FireBaseLink}`
      )
        .then((res) => res.json())
        .then((result) => {
          setResponse(result);
          setLoaded(true);
          setFetchingStatus(false);
          console.log(result)
      /*  console.log("CacheHit is "+result.CacheHit);
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
                    <input {...getInputProps()} onChange={(e) =>{ setselectedFile(e.target.files[0])
              setselectedFileURL(URL.createObjectURL(e.target.files[0]))
            }} />
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
            onChange={(e) =>{ setselectedFile(e.target.files[0])
              setselectedFileURL(URL.createObjectURL(e.target.files[0]))
            }}
            accept="image/x-png,image/jpeg ,image/jpg"
          />
          <button onClick={handleUpload} className="SubmitButton">
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