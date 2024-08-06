import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center">
            <h1 className="display-4">Oops!</h1>
            <p className="lead">Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
            <a href="/" className="btn btn-primary mt-3">
              Return Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
