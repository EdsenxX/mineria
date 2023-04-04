// Dependencies
import Axios from "axios";
// Endpoints
import endPoints from "./endpoints";

const getError = (err) => {
  let errorMessage;
  try {
    errorMessage = err.response.data;
  } catch (error) {
    errorMessage = "Error al conectarse al servidor";
  }
  return errorMessage;
};

export const createRegisters = (data) =>
  new Promise((resolve, reject) => {
    Axios.post(endPoints.registers.main, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(getError(error));
      });
  });