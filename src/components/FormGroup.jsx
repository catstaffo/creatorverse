import PropTypes from "prop-types";

const FormGroup = ({
  label,
  type,
  name,
  value,
  onChange,
  id,
  required,
  maxLength,
  autoComplete,
  isValid,
  errorMessage,
  textarea,
}) => {
  return (
    <div className="form-group mb-2">
      <label htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea
          name={name}
          cols="40"
          rows="5"
          className="form-control mt-1"
          onChange={onChange}
          id={id}
          autoComplete={autoComplete}
          aria-required={required}
          aria-invalid={!isValid}
          aria-describedby={`${id}Note`}
          value={value}
        />
      ) : (
        <input
          type={type}
          name={name}
          className="form-control mt-1"
          onChange={onChange}
          id={id}
          autoComplete={autoComplete}
          aria-required={required}
          aria-invalid={!isValid}
          aria-describedby={`${id}Note`}
          maxLength={maxLength}
          value={value}
        />
      )}
      {!isValid && (
        <p className="form-text m-0 text-danger" id={`${id}Note`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  autoComplete: PropTypes.string,
  isValid: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  textarea: PropTypes.bool,
};

FormGroup.defaultProps = {
  type: "text",
  required: false,
  maxLength: null,
  autoComplete: "off",
  errorMessage: "Invalid input",
  textarea: false,
};

export default FormGroup;
