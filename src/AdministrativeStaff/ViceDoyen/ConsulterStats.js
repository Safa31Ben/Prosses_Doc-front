import React, { useState, useEffect, useMemo } from "react";
import ViceDoyenAPI from "../../APIs/AdministrativeStaffAPIs/ViceDoyenAPI";
import { Main } from "../../components/Main";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const ConsulterStats = () => {
  const [data, setData] = useState(null);
  const userId = parseInt(localStorage.getItem('id'), 10);

  useEffect(() => {
    const consulterStats = async () => {
      try {
        const response = await ViceDoyenAPI.ConsulterStats(userId);
        setData(response);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      }
    };

    consulterStats();
  }, []);

  const renderedStats = useMemo(() => {
    if (!data) {
      return null;
    }

    return (
      <div className="container-fluid">
        <div className="d-flex flex-wrap justify-content-center">
          <div className="container card table-con col-md-5 p-3 m-3">
            {data.highMoyenne && <HighMoyenne stats={data.highMoyenne} />}
            <h4 className="text-center">Moyenne élevée </h4>
          </div>

          <div className="container card table-con col-md-5 p-3 m-3">
            {data.nbReclamation && <NbReclamation stats={data.nbReclamation} />}
            <h4 className="text-center">Nombre de réclamations </h4>
          </div>

          <div className="container card table-con col-md-5 p-3 m-3">
            {data.nbCandidats && <NbCandidats stats={data.nbCandidats} />}
            <h4 className="text-center">Nombre de candidats </h4>
          </div>
          
          <div className="container card table-con col-md-5 p-3 m-3">
            {data.presencePercentage && (
              <PresenceChart stats={data.presencePercentage} />
            )}
            <h4 className="text-center">Pourcentage de présence </h4>
          </div>
        </div>
      </div>
    );
  }, [data]);

  return <Main>{renderedStats}</Main>;
};

const PresenceChart = (stats) => {
  const data = stats.stats.reduce((result, item) => {
    const existingItem = result.find((i) => i.concours === item.concours);

    if (existingItem) {
      existingItem.absences += item.etat_presence === 1 ? 0 : item.nb_presence;
      existingItem.presences += item.etat_presence === 1 ? item.nb_presence : 0;
    } else {
      result.push({
        concours: item.concours,
        absences: item.etat_presence === 1 ? 0 : item.nb_presence,
        presences: item.etat_presence === 1 ? item.nb_presence : 0,
      });
    }

    return result;
  }, []);

  return (
    <BarChart width={300} height={300} data={data}>
      <CartesianGrid />
      <XAxis dataKey="concours" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="absences" fill="#ed3c0d" name="Absences" />
      <Bar dataKey="presences" fill="#18d26e" name="Présences" />
    </BarChart>
  );
};

const NbReclamation = (stats) => {
  const arr = [];
  Object.entries(stats.stats).map(([annee, nbReclamation]) => {
    arr.push({ annee: annee, nbReclamation: nbReclamation });
  });
  const data = arr;

  return (
    <BarChart width={300} height={300} data={data}>
      <CartesianGrid />
      <XAxis dataKey="annee" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="nbReclamation" fill="#4154f1" name="Réclamation" />
    </BarChart>
  );
};

const HighMoyenne = (stats) => {
  const arr = [];
  Object.entries(stats.stats).map(([annee, moyenne]) => {
    arr.push({ annee: annee, moyenne: moyenne });
  });
  const data = arr;

  return (
    <BarChart width={300} height={300} data={data}>
      <CartesianGrid />
      <XAxis dataKey="annee" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="moyenne" fill="#ff771d" name="Moyenne élevée" />
    </BarChart>
  );
};

const NbCandidats = (stats) => {
  const data = stats.stats;

  return (
    <BarChart width={300} height={300} data={data}>
      <CartesianGrid />
      <XAxis dataKey="concours" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="nb_candidats" fill="#086021" name="Candidats" />
    </BarChart>
  );
};
