import { useState, useEffect } from "react";
import { supabase } from "../client";
import ContentCreatorCard from "../components/ContentCreatorCard";

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCreators();
  }, []);

  async function getCreators() {
    const { data, error } = await supabase.from("creators").select();
    setCreators(data);
    typeof error == "undefined" ? setError(null) : setError(error);
    setLoading(false);
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Content Creators</h2>

      {loading && <p>Loading...</p>}
      {!loading && creators.length === 0 && <p>No creators found.</p>}
      {error && (
        <p className="text-danger" role="alert" aria-live="assertive">
          Error fetching creator details: {error.details}
        </p>
      )}

      {!loading && creators.length > 0 && (
        <div className="row">
          {creators.map((creator, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <ContentCreatorCard
                id={creator.id}
                name={creator.name}
                url={creator.url}
                description={creator.description}
                imageURL={creator.imageURL}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCreators;
