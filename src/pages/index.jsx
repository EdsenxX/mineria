// Dependencies
import Head from "next/head";
import Swal from 'sweetalert2';
import { useState } from 'react'
import csvtojson from "csvtojson";
// Components
import { Input, Button, Loading } from "@nextui-org/react";
// Services
import { createRegisters } from "@services/registers";

export default function Home() {

  const [loading, setLoading] = useState(false);

  const handleImportFile = async (e) => {
    e.preventDefault();
    if(loading) return;
    setLoading(true);
    const file = e.target.file.files[0];
    if(!file) {
      Swal.fire(
        'Archivo no valido',
        'Por favor selecciona un archivo',
        'warning'
      )
      setLoading(false);
      return;
    }
    // validate file type are csv
    if (file.type !== "text/csv") {
      Swal.fire(
        'Archivo no valido',
        'Solo se aceptan archivos .csv, por favor intenta de nuevo',
        'warning'
      )
      setLoading(false);
    }
    // get file content
    const fileContent = await file.text();
    let fileTransformed = await csvtojson().fromString(fileContent);

    createRegisters(fileTransformed)
      .then(() => {
        Swal.fire(
          'Archivo importado',
          'El archivo se ha importado correctamente',
          'success'
        )
      })
      .catch(() => {
        Swal.fire(
          'Error al importar el archivo',
          'Por favor intenta de nuevo',
          'error'
        )
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Head>
        <title>Mineria de Datos</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center min-w-screen min-h-screen">
        <form onSubmit={handleImportFile} className="bg-white shadow-xl shadow-white/20 p-4 rounded-xl text-black flex flex-col items-center gap-2 min-w-[400px]">
          <p className="text-xl">Importa el archivo de tu dataset</p>
          <Input type="file" name="file" id="" />
          <Button type="submit" icon={loading && <Loading type="spinner" color="currentColor" size="sm" />}> Importar </Button>
          {loading && <p className="text-sm">Por favor espere, este proceso puede tardar varios minutos</p>}
        </form>
      </main>
    </>
  );
}
