import React, { useState } from "react";
import Spinner from "./Spinner";

const Home = () => {
  const [text, setText] = useState("");
  const [imagesrc, setImagesrc] = useState("");
  const [loading, setLoading] = useState(false);

  const API_Key = "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";

  const onChange = (e) => {
    setImagesrc("");
    setText(e.target.value);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please enter text to generate an image.");
      return;
    }

    setLoading(true);

    try {
      const response = await query({ inputs: text });
      let imgURL = URL.createObjectURL(response);
      setImagesrc(imgURL);
      setLoading(false);
    } catch (error) {
      console.log("Issue is in this block");
      setLoading(false); 
    }
  };

  async function query(data) {
    console.log(data);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          headers: { Authorization: `Bearer ${API_Key}` },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      return result;
    } catch (error) {
      console.log("Encountered Error while fetching image");
      throw error;
    }
  }

  return (
    <div className="container my-3" style={{width:"50%"}}>
      <form className="my-3" onSubmit={handleGenerate}>
        <div className="mb-3 my-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            <h3 style={{marginTop: "3vh"}}><strong>Enter text to generate image</strong></h3>
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            value={text}
            onChange={onChange}
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <button type="submit" className="btn btn-primary">
          Generate
        </button>
      </form>

      <div className="text-center">
        {loading && <Spinner />}
        {!loading && imagesrc === "" && (
          <h4 style={{marginTop: "25vh"}}>
            <strong>Generated image will be displayed here.</strong>
          </h4>
        )}
        {!loading && imagesrc !== "" && (
          <img src={imagesrc} className="rounded" alt="Generated" />
        )}
      </div>
    </div>
  );
};

export default Home;