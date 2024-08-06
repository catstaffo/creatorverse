import { useState, useEffect } from "react";
import { supabase } from "../client";
import ContentCreatorCard from "./ContentCreatorCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ContentCreatorPreview = () => {
  const [creators, setCreators] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCreators();
  }, []);

  async function getCreators() {
    const { data, error } = await supabase
      .from("creators")
      .select()
      .order("created_at", { ascending: false })
      .limit(6);
    setCreators(data);
    setError(error || null);
    setLoading(false);
  }

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Some recent creators...</h2>

      {loading && <p>Loading...</p>}
      {!loading && creators.length === 0 && <p>No creators found.</p>}
      {error && (
        <p className="text-danger" role="alert" aria-live="assertive">
          Error fetching creator details: {error.details}
        </p>
      )}

      {!loading && creators.length > 0 && (
        <Slider {...settings}>
          {creators.map((creator) => (
            <div key={creator.id}>
              <ContentCreatorCard
                id={creator.id}
                name={creator.name}
                url={creator.url}
                description={creator.description}
                imageURL={creator.imageURL}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ContentCreatorPreview;
