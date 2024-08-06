import ContentCreatorPreview from "../components/ContentCreatorPreview";

const Home = () => {
  return (
    <div className="px-4 py-5 my-4 text-center">
      <img
        className="d-block mx-auto mb-4"
        src="/world-1-svgrepo-com.svg"
        alt=""
        width="72"
        height="57"
      />
      <h1 className="display-5 fw-bold share-tech-mono-regular">
        <span style={{ color: "#6610f2" }}>Creator</span>verse
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4 share-tech-mono-regular">
          Ignite community innovation
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a
            href="/creators"
            className="btn btn-outline-primary btn-lg px-4 gap-3"
          >
            View Creators
          </a>
          <a
            href="/creators/add"
            className="btn btn-outline-success btn-lg px-4"
          >
            Add Creator
          </a>
        </div>
      </div>
      <ContentCreatorPreview />
    </div>
  );
};

export default Home;
