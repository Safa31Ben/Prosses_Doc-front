import React, { useState } from "react";
import ViceDoyenAPI from "../../APIs/AdministrativeStaffAPIs/ViceDoyenAPI";
import { Main } from "../../components/Main";

import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PartagerAnnonces = () => {
  const [pdf, setPdf] = useState(null);
  const [contenu, setContenu] = useState("");
  const [data, setData] = useState();
  const [numPages, setNumPages] = useState(null);

  const partagerAnnonces = async (formData) => {
    const response = await ViceDoyenAPI.PartagerAnnonces(formData);
    setData(response);
  };

  const onDocumentLoadSucces = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    pdf && formData.append("PDFFile", pdf);
    formData.append("contenu", e.target.elements.contenu.value);
    partagerAnnonces(formData);
  };

  return (
    <Main>
      <div className="pagetitle">
        <h1>Partager annonces</h1>
      </div>

      {data ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Annonce N° </h5>
            {data.id_annonce}
          </div>
          <div className="card-body">
            <h5 className="card-title">Date</h5>
            {new Date(data.date).toLocaleString()}
          </div>
          <div className="card-body">
            <h5 className="card-title">Contenu</h5>
            {contenu}
          </div>
          {data.PDFFile && (
            <div className="card-body">
              <h5 className="card-title">Contenu de PDF</h5>
              <Document
                className="d-flex flex-column align-items-center border"
                file={`http://127.0.0.1:8000${data.PDFFile}`}
                onLoadSuccess={onDocumentLoadSucces}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    renderTextLayer={false}
                    renderInteractiveForms={false}
                    renderAnnotationLayer={false}
                    pageNumber={index + 1}
                  />
                ))}
              </Document>
            </div>
          )}
        </div>
      ) : (
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Remplir les informations d'annonce
                  </h5>

                  <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-12">
                      <input
                        className="form-control"
                        type="file"
                        id="pdf"
                        onChange={(e) => setPdf(e.target.files[0])}
                      />
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          name="contenu"
                          value={contenu}
                          onChange={(e) => setContenu(e.target.value)}
                          maxLength={500}
                          required
                          placeholder="Address"
                          id="floatingTextarea"
                          style={{ height: "100px" }}
                        ></textarea>
                        <label for="floatingTextarea">content</label>
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">
                        Soumettre
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Main>
  );
};
