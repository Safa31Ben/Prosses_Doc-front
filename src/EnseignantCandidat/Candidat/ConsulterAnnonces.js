import React, { useState, useEffect } from "react";
import CandidatAPI from "../../APIs/EnseignantCandidatAPIs/CandidatAPI";

import { Main } from "../../components/Main";

import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const ConsulterAnnonces = () => {
  const [annonces, setAnnonces] = useState(null);
  useEffect(() => {
    getAnnoncesList();
  }, []);

  const getAnnoncesList = async () => {
    const data = await CandidatAPI.consulterListeAnnonce();
    setAnnonces(data);
  };

  const handleDocumentLoadSuccess =
    (pdf) =>
    ({ numPages }) => {
      const container = document.querySelector(`.pdf-${pdf}`);
      const firstPage = container.querySelector(".react-pdf__Page");

      if (firstPage) {
        const pageHeight = firstPage.clientHeight;
        container.style.height = `${33*pageHeight}px`;
        container.style.overflowY = numPages > 1 && "scroll";
      }

      setAnnonces((prevAnnonces) => {
        return prevAnnonces.map((annonce) => {
          if (annonce.id_annonce === pdf) {
            return {
              ...annonce,
              numPages: numPages,
            };
          }
          return annonce;
        });
      });
    };

  return (
    <Main>
      <div className="pagetitle">
        <h1>Consulter les annonces</h1>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div>
                  {annonces &&
                    (annonces.rapport ? (
                      <div className="container">
                        <section className="section d-flex align-items-center justify-content-center">
                          <h1 className="text-center pt-4 pb-2 px-4">
                            {annonces.rapport}
                          </h1>
                        </section>
                      </div>
                    ) : (
                      <div className="accordion pt-3" id="accordionExample">
                        {annonces.map((annonce) => (
                          <div
                            className="accordion-item"
                            key={annonce.id_annonce}
                          >
                            <h2
                              className="accordion-header"
                              id={`heading${annonce.id_annonce}`}
                            >
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${annonce.id_annonce}`}
                                aria-expanded="true"
                                aria-controls={`collapse${annonce.id_annonce}`}
                              >
                                Annonce N° {annonce.id_annonce}
                              </button>
                            </h2>
                            <div
                              id={`collapse${annonce.id_annonce}`}
                              className="accordion-collapse collapse show"
                              aria-labelledby={`heading${annonce.id_annonce}`}
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <p>
                                  <strong>Date:</strong>{" "}
                                  {new Date(annonce.date).toLocaleDateString()}
                                </p>
                                <p>
                                  <strong>Contenu:</strong> {annonce.contenu}
                                </p>
                                {annonce.PDFFile && (
                                  <div className={`card-body pdf-${annonce.id_annonce}`}>
                                    <Document
                                      className="d-flex flex-column align-items-center border"
                                      file={`http://127.0.0.1:8000${annonce.PDFFile}`}
                                      onLoadSuccess={handleDocumentLoadSuccess(
                                        annonce.id_annonce,
                                      )}
                                    >
                                      <Page
                                        pageNumber={1}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                      />

                                      {annonce.numPages > 1 && (
                                        <div>
                                          {Array.from(
                                            new Array(annonce.numPages - 1),
                                            (el, index) => (
                                              <Page
                                                key={`page_${index + 2}`}
                                                pageNumber={index + 2}
                                                renderTextLayer={false}
                                                renderAnnotationLayer={false}
                                              />
                                            )
                                          )}
                                        </div>
                                      )}
                                    </Document>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};
