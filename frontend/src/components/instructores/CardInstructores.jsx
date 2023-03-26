import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Instructor from "./Instructor";

const CardInstructores = () => {
  const { instructores } = useContext(DataContext);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center p-12 text-black">
      {instructores.map((instructor) => (
        <Instructor key={instructor.ID_instructor} instructor={instructor} />
      ))}
    </div>
  );
};

export default CardInstructores;
