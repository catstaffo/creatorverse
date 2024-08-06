import { useState } from "react";
import { supabase } from "../client";
import FormGroup from "../components/FormGroup";

const AddCreator = () => {
  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const [valid, setValid] = useState({
    name: true,
    url: true,
    description: true,
    imageURL: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const urlRegex = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, url, description } = form;
    const nameVal = name && name.trim();
    const urlVal = url && url.trim();
    const descriptionVal = description && description.trim();

    setValid({
      name: !!nameVal,
      url: !!urlVal,
      description: !!descriptionVal,
    });

    return nameVal && urlVal && descriptionVal;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const isValid = validateForm();
    if (!isValid) {
      setError("Please correct errors");
      setLoading(false);
      return;
    }

    const { name, url, description, imageURL } = form;
    const newCreator = {
      name: name.trim(),
      url: normalizeURL(url.trim()),
      description: description.trim(),
      imageURL: imageURL ? normalizeURL(imageURL.trim()) : null,
    };

    insertCreator(newCreator);
  };

  async function insertCreator(creator) {
    const { error } = await supabase.from("creators").insert(creator);
    if (error) {
      setError(error.message);
    } else {
      setError(null);
      setSuccess("Creator added!");
      setForm({
        name: "",
        url: "",
        description: "",
        imageURL: "",
      });
    }
    setLoading(false);
  }

  function normalizeURL(url) {
    if (!urlRegex.test(url)) {
      return null;
    }

    if (!/^https?:\/\//i.test(url)) {
      url = `http://${url}`;
    }
    return url;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 image-container d-flex align-items-center justify-content-center">
          <img
            src="/world-purple.svg"
            className="img-fluid"
            alt="World Illustration"
          />
        </div>
        <div className="col-md-7 box">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center share-tech-mono-regular">Add Creator</h1>

            {error && (
              <p
                className="text-danger mb-2"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </p>
            )}
            {success && (
              <p
                className="text-success mb-2"
                role="alert"
                aria-live="assertive"
              >
                {success}
              </p>
            )}

            <FormGroup
              label="Name:"
              type="text"
              name="name"
              value={form.name}
              onChange={handleInput}
              id="name"
              required={true}
              autoComplete="off"
              isValid={valid.name}
              errorMessage="Required"
            />

            <FormGroup
              label="Image URL (optional):"
              type="text"
              name="imageURL"
              value={form.imageURL}
              onChange={handleInput}
              id="imageURL"
              autoComplete="off"
              isValid="true"
              errorMessage="Please enter a valid image URL"
            />

            <FormGroup
              label="Creator's URL:"
              type="text"
              name="url"
              value={form.url}
              onChange={handleInput}
              id="url"
              autoComplete="off"
              required={true}
              isValid={valid.url}
              errorMessage="Please enter a valid URL"
            />

            <FormGroup
              label="Description:"
              name="description"
              value={form.description}
              onChange={handleInput}
              id="descriptionId"
              autoComplete="off"
              required={true}
              isValid={valid.description}
              errorMessage="Required"
              textarea={true}
            />

            <button
              type="submit"
              className="btn btn-success btn-lg"
              disabled={loading}
            >
              {loading ? "Loading ..." : "Add Creator"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCreator;
