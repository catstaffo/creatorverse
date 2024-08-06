import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { supabase } from "../client";
import FormGroup from "../components/FormGroup";

const EditCreator = () => {
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

  const { id } = useParams();
  console.log(id);

  const urlRegex = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/;

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        setError(`Error fetching creator: ${error.message}`);
        return;
      }

      if (data) {
        setForm({
          name: data.name || "",
          url: data.url || "",
          description: data.description || "",
          imageURL: data.imageURL || "",
        });
      }
      console.log(data.imageURL);
    };

    fetchCreator();
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, url, description, imageURL } = form;
    const nameVal = name && name.trim();
    const urlVal = url && url.trim();
    const descriptionVal = description && description.trim();
    const imageURLVal = !imageURL || !imageURL.trim();

    setValid({
      name: !!nameVal,
      url: !!urlVal,
      description: !!descriptionVal,
      imageURL: !!imageURLVal,
    });

    return nameVal && urlVal && descriptionVal && imageURLVal;
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
    const updatedCreator = {
      name: name.trim(),
      url: normalizeURL(url.trim()),
      description: description.trim(),
      imageURL: imageURL ? normalizeURL(imageURL.trim()) : null,
    };

    updateCreator(updatedCreator);
  };

  async function updateCreator(creator) {
    const { error } = await supabase
      .from("creators")
      .update(creator)
      .eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      setSuccess("Creator updated successfully!");
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

  const resetForm = () => {
    setForm({
      name: "",
      url: "",
      description: "",
      imageURL: "",
    });
    setValid({
      name: true,
      url: true,
      description: true,
      imageURL: true,
    });
  };

  async function handleDelete() {
    setLoading(true);
    setError("");
    setSuccess("");

    const { error } = await supabase.from("creators").delete().eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Creator deleted successfully!");
      resetForm();
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 image-container d-flex align-items-center justify-content-center">
          {form.imageURL ? (
            <img src={form.imageURL} className="card-img-top" alt={form.name} />
          ) : (
            <img
              src="/gui-sparkle-svgrepo-com.svg"
              className="card-img-top"
              alt="Default image"
            />
          )}
        </div>
        <div className="col-md-7 box">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center share-tech-mono-regular">
              Update Creator
            </h1>

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
              isValid={valid.imageURL}
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
              className="btn btn-success btn-lg me-2"
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update Creator"}
            </button>
            {!loading && (
              <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={handleDelete}
                disabled={loading}
              >
                Delete Creator
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

EditCreator.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditCreator;
