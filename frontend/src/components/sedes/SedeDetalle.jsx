import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const SedeDetalle = () => {
  const { sedeId } = useParams();
  const { sedes } = useContext(DataContext);
  const data = sedes.find((sede) => sede.ID_sede === Number(sedeId));

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default SedeDetalle;
