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


export const getRegisters = () =>
  new Promise((resolve, reject) => {
    Axios.get(endPoints.registers.main)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(getError(error));
      });
  });


  export const removeRegisters = () =>
    new Promise((resolve, reject) => {
      Axios.delete(endPoints.registers.main)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(getError(error));
        });
    });

  export const generalData = () =>
    new Promise((resolve, reject) => {
      Axios.get(endPoints.registers.generalData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(getError(error));
        });
    });

  export const getSatisfactionData = (queryParams) =>
    new Promise((resolve, reject) => {
      Axios.get(endPoints.registers.satisfaction, { params: queryParams })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(getError(error));
        });
    });
