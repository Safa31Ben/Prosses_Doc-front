import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React from "react";

// All
import { Page404 } from "./Gestion/Page404";
import { Login } from "./Gestion/Login";
import { Profile } from "./Gestion/Profile";

// Admin
import { GestionApp } from "./Gestion/GestionApp";
import { ConsulterUtilisateurs } from "./Gestion/ConsulterUtilisateurs";
import { AjouterUtilisateur } from "./Gestion/AjouterUtilisateur";
import { AjouterCandidats } from "./Gestion/AjouterCandidats";
import { AjouterEmplacement } from "./Gestion/AjouterEmplacement";
import { AjouterCouncours } from "./Gestion/AjouterCouncours";

// Enseignant
import { EnseignantApp } from "./EnseignantCandidat/Enseignant/EnseignantApp";
import { ConsulterEmplacement } from "./EnseignantCandidat/Enseignant/ConsulterEmplacement";
import { SaisirNotes } from "./EnseignantCandidat/Enseignant/SaisirNotes";
import { FairRapport } from "./EnseignantCandidat/Enseignant/FairRapport";
import { MarquerPresence } from "./EnseignantCandidat/Enseignant/MarquerPresence";
import { ProposerSujetThese } from "./EnseignantCandidat/Enseignant/ProposerSujetThese";

// Candidat
import { CandidatApp } from "./EnseignantCandidat/Candidat/CandidatApp";
import { CandidatConsulterEmplacement } from "./EnseignantCandidat/Candidat/CandidatConsulterEmplacement";
import { CandidatConsulterNotes } from "./EnseignantCandidat/Candidat/CandidatConsulterNotes";
import { ClasserSujetsThese } from "./EnseignantCandidat/Candidat/ClasserSujetsThese";
import { ConsulterAnnonces } from "./EnseignantCandidat/Candidat/ConsulterAnnonces";
import { SuivirCorrection } from "./EnseignantCandidat/Candidat/SuivirCorrection";

// President CFD
import { PresidentCFDApp } from "./AdministrativeStaff/PresidentCFD/PresidentCFDApp";
import { Reclamations } from "./AdministrativeStaff/PresidentCFD/Reclamations";
import { AffecterEmplacements } from "./AdministrativeStaff/PresidentCFD/AffecterEmplacements";
import { AffecterSujetTheses } from "./AdministrativeStaff/PresidentCFD/AffecterSujetTheses";
import { ValiderNotes } from "./AdministrativeStaff/PresidentCFD/ValiderNotes";
import { ValiderNotesMoyennes } from "./AdministrativeStaff/PresidentCFD/ValiderNotesMoyennes";
import { AffecteModule } from "./AdministrativeStaff/PresidentCFD/AffecteModule";
import { ConsulterRapports } from "./AdministrativeStaff/PresidentCFD/ConsulterRapports";

// Vice Doyen
import { ViceDoyenApp } from "./AdministrativeStaff/ViceDoyen/ViceDoyenApp";
import { ConsulterStats } from "./AdministrativeStaff/ViceDoyen/ConsulterStats";
import { ConculterRessourcesHumains } from "./AdministrativeStaff/ViceDoyen/ConsulterRessourcesHumaines";
import { PartagerAnnonces } from "./AdministrativeStaff/ViceDoyen/PartagerAnnonces";
import { GenererCodeAnonymes } from "./AdministrativeStaff/ViceDoyen/GenererCodeAnonymes";

export const App = () => {
  const isAuthenticated = localStorage.getItem("id") ? true : false;

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="*" element={<Page404 />} />

          {/* Admin */}
          <Route
            exact
            path="Admin"
            element={
              isAuthenticated ? <GestionApp /> : <Navigate to="/" replace />
            }
          >
            <Route
              path="Admin/consulter-utilisateurs"
              element={<ConsulterUtilisateurs />}
            />
            <Route
              path="Admin/ajouter-utilisateur"
              element={<AjouterUtilisateur />}
            />
            <Route
              path="Admin/ajouter-candidats"
              element={<AjouterCandidats />}
            />
            <Route
              path="Admin/ajouter-emplacement"
              element={<AjouterEmplacement />}
            />
            <Route
              path="Admin/ajouter-councours"
              element={<AjouterCouncours />}
            />
            <Route path="Admin/Profile" element={<Profile />} />
            <Route path="*" element={<Page404 />} />
          </Route>

          {/* Enseignant */}
          <Route
            exact
            path="Enseignant"
            element={
              isAuthenticated ? <EnseignantApp /> : <Navigate to="/" replace />
            }
          >
            <Route
              exact
              path="Enseignant/consulter-emplacement"
              element={<ConsulterEmplacement />}
            />
            <Route
              exact
              path="Enseignant/saisir-notes"
              element={<SaisirNotes />}
            />
            <Route
              exact
              path="Enseignant/Fair-rapport"
              element={<FairRapport />}
            />
            <Route
              exact
              path="Enseignant/Marquer-présence"
              element={<MarquerPresence />}
            />
            <Route
              exact
              path="Enseignant/proposer-sujet-these"
              element={<ProposerSujetThese />}
            />
            <Route path="Enseignant/Profile" element={<Profile />} />
            <Route path="*" element={<Page404 />} />
          </Route>

          {/* Candidat */}
          <Route
            exact
            path="Candidat"
            element={
              isAuthenticated ? <CandidatApp /> : <Navigate to="/" replace />
            }
          >
            <Route
              exact
              path="Candidat/consulter-annonces"
              element={<ConsulterAnnonces />}
            />
            <Route
              exact
              path="Candidat/suivir-correction"
              element={<SuivirCorrection />}
            />
            <Route
              exact
              path="Candidat/consulter-notes"
              element={<CandidatConsulterNotes />}
            />
            <Route
              exact
              path="Candidat/consulter-emplacement"
              element={<CandidatConsulterEmplacement />}
            />
            <Route
              exact
              path="Candidat/classer-theses"
              element={<ClasserSujetsThese />}
            />
            <Route path="Candidat/Profile" element={<Profile />} />
            <Route path="*" element={<Page404 />} />
          </Route>

          {/* President cdf */}
          <Route
            exact
            path="PresidentCFD"
            element={
              isAuthenticated ? (
                <PresidentCFDApp />
              ) : (
                <Navigate to="/" replace />
              )
            }
          >
            <Route
              exact
              path="PresidentCFD/affecter-les-emplacements"
              element={<AffecterEmplacements />}
            />
            <Route
              exact
              path="PresidentCFD/reclamations"
              element={<Reclamations />}
            />
            <Route
              exact
              path="PresidentCFD/affecter-sujet-theses"
              element={<AffecterSujetTheses />}
            />
            <Route
              exact
              path="PresidentCFD/valider-notes"
              element={<ValiderNotes />}
            />
            <Route
              exact
              path="PresidentCFD/valider-notes-moyennes"
              element={<ValiderNotesMoyennes />}
            />
            <Route
              exact
              path="PresidentCFD/affecte-module"
              element={<AffecteModule />}
            />
            <Route
              exact
              path="PresidentCFD/consulter-rapports"
              element={<ConsulterRapports />}
            />
            <Route path="PresidentCFD/Profile" element={<Profile />} />
          </Route>

          {/* Vice Doyen */}
          <Route
            exact
            path="ViceDoyen"
            element={
              isAuthenticated ? <ViceDoyenApp /> : <Navigate to="/" replace />
            }
          >
            <Route
              exact
              path="ViceDoyen/Consulter-les-statistiques"
              element={<ConsulterStats />}
            />
            <Route
              exact
              path="ViceDoyen/Conculter-ressources-humains"
              element={<ConculterRessourcesHumains />}
            />
            <Route
              exact
              path="ViceDoyen/Partager-annonces"
              element={<PartagerAnnonces />}
            />
            <Route
              exact
              path="ViceDoyen/Generer-code-anonymes"
              element={<GenererCodeAnonymes />}
            />
            <Route path="ViceDoyen/Profile" element={<Profile />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};
