import axios from "axios";
import querystring from "querystring";

import {
  postRegistroUsuarioMembresia,
  postRegistroClienteMembresia,
  postRegistroMembresia,
  getMembresias,
  actualizarEstadoMembresia,
  postFacturacion,
} from "../models/membresia.model.js";
import { PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from "../config.js";

import { fechaActual, fechaFinal } from "../helpers/utils.js";

export const createOrder = async (req, res) => {
  try {
    const { dataMembresia } = req.body;
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: dataMembresia.precio,
          },
          description: dataMembresia.descripcion,
        },
      ],

      application_context: {
        brand_name: "Athletic Fisio Peru",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: `http://localhost:8000/api/capture-order?dataMembresia=${encodeURIComponent(
          JSON.stringify(dataMembresia)
        )}`,
        cancel_url: "http://localhost:8001",
      },
    };

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    return res.status(500).json({ msg: "Ocurrio algo mal" });
  }
};

export const captureOrder = async (req, res) => {
  const { token } = req.query;
  const { dataMembresia } = querystring.parse(req.url.split("?")[1]);
  const data = JSON.parse(dataMembresia);
  const {
    usuario,
    contraseña,
    idGenero,
    nombre,
    apellidos,
    celular,
    dni,
    correo,
    fechaNacimiento,
    tipoMemb,
    idSede,
    tipoMembNombre,
    renovacion,
  } = data;
  const response = await axios.post(
    `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    {},
    {
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    }
  );

  /*Registrar los datos del usuario y de su membresia*/

  //Registrar los datos del usuario
  const idUsuario = await postRegistroUsuarioMembresia({ usuario, contraseña });

  //Registrar los datos del cliente
  const idCliente = await postRegistroClienteMembresia({
    idGenero,
    idUsuario,
    nombre,
    apellidos,
    celular,
    dni,
    correo,
    fechaNacimiento,
  });

  //Registrar los datos de la membresia
  const fechaInicio = fechaActual();
  const fechaTerminada = fechaFinal(tipoMembNombre);

  const idMembresia = await postRegistroMembresia({
    idCliente,
    tipoMemb,
    idSede,
    fechaInicio,
    fechaTerminada,
    renovacion,
  });

  //Registrar los datos de la factura
  // crea un nuevo objeto `Date`
  let today = new Date();
  let hora = today.toLocaleTimeString();

  const fechaPago = fechaActual();
  const igv = 0.18;
  await postFacturacion({ idMembresia, hora, fechaPago, igv });

  return res.redirect("http://localhost:8001");
};

export const cancelOrder = (req, res) => {
  res.redirect("/");
};

export const obtenerMembresias = async (req, res) => {
  try {
    const membresias = await getMembresias();

    if (Object.keys(membresias).length === 0) {
      const error = new Error("No hay Membresias");
      return res.status(404).json({ msg: error.message });
    }

    res.status(200).json(membresias);
  } catch (error) {
    return res.status(500).json({ msg: error.msg });
  }
};

export const renovarMembresia = async (req, res) => {
  try {
    const { data2 } = req.body;
    const { ID_memb, Precio, Descripcion } = data2;

    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: Number(Precio),
          },
          description: Descripcion,
        },
      ],

      application_context: {
        brand_name: "Athletic Fisio Peru",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: `http://localhost:8000/api/capturar-renovacion?ID_memb=${encodeURIComponent(
          JSON.stringify(ID_memb)
        )}`,
        cancel_url: "http://localhost:8001",
      },
    };

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    return res.status(500).json({ msg: "Ocurrio algo mal" });
  }
};

export const capturarMembresia = async (req, res) => {
  const { token } = req.query;
  const { ID_memb } = querystring.parse(req.url.split("?")[1]);
  const data = JSON.parse(ID_memb);

  const result = await actualizarEstadoMembresia(data);

  const response = await axios.post(
    `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    {},
    {
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    }
  );

  return res.redirect("http://localhost:8001");
};
