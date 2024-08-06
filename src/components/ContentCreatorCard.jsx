import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const ContentCreatorCard = ({ id, name, url, description, imageURL }) => {
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)} [...]`;
    }
    return description;
  };

  const truncateURL = (url) => {
    url = url.replace(/^https?:\/\//, "");
    url = url.replace(/^www\./, "");
    return url;
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      {imageURL ? (
        <img src={imageURL} className="card-img-top" alt={name} />
      ) : (
        <img
          src="/gui-sparkle-svgrepo-com.svg"
          className="card-img-top"
          alt="Default image"
        />
      )}

      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text mb-1">{truncateDescription(description, 80)}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2"
          style={{ alignSelf: "flex-start" }}
        >
          <i className="fa fa-link p-1"></i>
          {truncateURL(url)}
        </a>
        <a
          href={`/creators/${id}`}
          className="btn btn-primary mb-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Details
        </a>
        <a
          href={`/creators/${id}/edit`}
          className="edit-icon position-absolute"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-pen" />
        </a>
      </div>
    </div>
  );
};

ContentCreatorCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
};

export default ContentCreatorCard;
