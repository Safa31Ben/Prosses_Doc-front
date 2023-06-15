import React from "react";

export const Main = (props) => {
  return (
    <>
      <main id="main" className="main">
        {props.children}
      </main>
      <footer id="footer" className="footer">
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>prosses doc</span>
          </strong>
          . All Rights Reserved
        </div>
      </footer>

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};
