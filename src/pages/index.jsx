// Dependencies
import Head from "next/head";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import csvtojson from "csvtojson";
import { useRouter } from "next/router";
// Components
import { Button, Loading, Progress } from "@nextui-org/react";
import InputFile from "@components/InputFile";
import Loader from "@components/Loader";
// Services
import { createRegisters, getRegisters } from "@services/registers";
// Utils
import typeFiles from "@utils/typeFiles.constants";
import { csvFile } from "@utils/defaultTypeFileError";

export default function Home() {
  const router = useRouter();

  const { csv } = typeFiles;

  const [loading, setLoading] = useState(false);
  const [dynamicText, setDynamicText] = useState(
    "Número maximo de registros: 100,000"
  );
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);

  const handleImportFile = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const file = files[0];
    if (!file) {
      Swal.fire(
        "Archivo no valido",
        "Por favor selecciona un archivo",
        "warning"
      );
      setLoading(false);
      return;
    }
    // validate file type are csv
    if (file.type !== "text/csv") {
      Swal.fire(
        "Archivo no valido",
        "Solo se aceptan archivos .csv, por favor intenta de nuevo",
        "warning"
      );
      setLoading(false);
    }
    // get file content
    // get 10 first registers
    setDynamicText("Dividiendo el archivo en chunks de 1000....");
    const fileContent = await file.text();
    const fileTransformed = await csvtojson().fromString(fileContent);
    // separate registers in chunks of 50000
    const chunkSize = 1000;
    const chunks = [];
    for (let i = 0; i < fileTransformed.length; i += chunkSize) {
      if (chunks.length >= 100) {
        break;
      }
      chunks.push(fileTransformed.slice(i, i + chunkSize));
    }

    // send chunks to server
    for (let i = 0; i < chunks.length; i++) {
      setDynamicText(
        `Enviando chunk ${i + 1} de ${chunks.length} al servidor...`
      );
      const chunk = chunks[i];
      await createRegisters(chunk);
      setProgress(((i + 1) / chunks.length) * 100);
    }
    setLoading(false);

    setDynamicText("Archivo importado correctamente");
    Swal.fire(
      "Archivo importado",
      "El archivo se ha importado correctamente",
      "success"
    );
    router.push("/main");
  };

  const handleGetRegisters = async () => {
    setInitialLoading(true);
    const registers = await getRegisters();
    if (registers.length) {
      router.push("/main");
    }
    setInitialLoading(false);
  };

  useEffect(() => {
    handleGetRegisters();
  }, []);

  const handleAddFiles = (rawFiles) => {
    const filesAux = files;
    filesAux.push(...rawFiles);
    setFiles([...filesAux]);
  };

  const handleRemoveFiles = (idx) => {
    const filesAux = [...files];
    filesAux.splice(idx, 1);
    setFiles(filesAux);
  };

  return (
    <>
      <Head>
        <title>Mineria de Datos</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {initialLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <main className="flex justify-center items-center min-w-screen min-h-screen">
          <form
            onSubmit={handleImportFile}
            className="bg-white shadow-xl p-4 rounded-xl text-black flex flex-col items-center gap-2 min-w-[400px]"
          >
            <p className="text-xl font-bold mb-5">
              Importa el archivo de tu dataset
            </p>
            <InputFile
              id="files"
              onChange={handleAddFiles}
              onRemoveFile={handleRemoveFiles}
              files={files}
              allowedTypes={[csv]}
              defaultTypeFileError={csvFile}
            />
            <Button
              type="submit"
              icon={
                loading && (
                  <Loading type="spinner" color="currentColor" size="sm" />
                )
              }
            >
              {" "}
              Importar{" "}
            </Button>
            <>
              {loading && (
                <>
                  <Progress color="primary" size="md" value={progress} />
                  <p className="text-sm">
                    Por favor espere, este proceso puede tardar varios minutos
                  </p>
                </>
              )}
              <p className="text-sm">{dynamicText}</p>
            </>
          </form>
        </main>
      )}
    </>
  );
}
