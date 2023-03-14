import express from "express";
import cors from "cors";
import { router as routerCliente } from "./routes/usuarios_cliente.routes.js";
import { router as routerGestion } from "./routes/usuarios_gestion.routes.js";
import { router as routerSede } from "./routes/sedes.routes.js";
import { router as routerInstructor } from "./routes/instructor.routes.js";

const app = express();

//Configuracion del cors

const listaBlanca = ["http://localhost:8001", "http://localhost:8002"];
const corsOptions = {
  origin: function (origin, callback) {
    if (listaBlanca.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

//Mapea el objeto a json
app.use(express.json());

const routes = [routerCliente, routerGestion, routerSede, routerInstructor];

//Controla las rutas (RequestMapping)
app.use("/api", routes);

//Puerto que se ejecuta el servidor
const PORT = 8000;

//Escucha del servidor
app.listen(PORT, () => {
  console.log(`Puerto iniciado en el puerto ${PORT}`);
});
