import React from "react";

export const Page404 = () => {
  return (
    <main>
      <div className="container">
        <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>404</h1>
          <h2>La page que vous recherchez n'existe pas.</h2>
          <a className="btn" href="/">
            Back to login
          </a>
        </section>
      </div>
    </main>
  );
};
