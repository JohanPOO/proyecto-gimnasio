const Error = ({ error }) => {
  return (
    <div
      className={`${
        error.alerta ? "bg-red-600" : "bg-sky-500"
      } bg - gradient - to - br text-center p-2 rounded-lg uppercase text-white font-bold text-sm mb-4`}
    >
      {error.msg}
    </div>
  );
};

export default Error;
