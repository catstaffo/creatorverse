import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../client";

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCreatorById(id);
  }, [id]);

  async function getCreatorById(id) {
    const { data, error } = await supabase
      .from("creators")
      .select()
      .eq("id", id)
      .single();
    setCreator(data);
    typeof error == "undefined" ? setError(null) : setError(error);
    setLoading(false);
  }

  const truncateURL = (url) => {
    url = url.replace(/^https?:\/\//, "");
    url = url.replace(/^www\./, "");
    return url;
  };

  return (
    <div className="container mt-5 px-5 justify-content-center">
      {loading && !creator && <p>Loading...</p>}
      {error && (
        <p role="alert" aria-live="assertive">
          Error fetching creator info: {error.details}
        </p>
      )}
      {!loading && !creator && <p>No creator found.</p>}
      {!loading && !error && creator && (
        <>
          <h2 className="mb-4">{creator.name}</h2>
          <div className="row">
            <div className="col-md-4">
              {creator.imageURL ? (
                <img
                  src={creator.imageURL}
                  className="img-fluid rounded"
                  alt={creator.name}
                />
              ) : (
                <img
                  src="/gui-sparkle-svgrepo-com.svg"
                  className="img-fluid rounded"
                  alt="Default image"
                />
              )}
            </div>
            <div className="col-md-8">
              <p>{creator.description}</p>
              <a
                href={creator.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2"
                style={{ alignSelf: "flex-start" }}
              >
                <i className="fa fa-link p-1" aria-hidden="true"></i>
                {truncateURL(creator.url)}
              </a>
              <br></br>
              <a
                href={`/creators/${id}/edit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-pen" /> Edit Info
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewCreator;
