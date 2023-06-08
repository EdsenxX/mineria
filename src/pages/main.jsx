// Dependencies
import Head from "next/head";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Services
import {
  removeRegisters,
  getRegisters,
  generalData,
} from "@services/registers";
// Components
import { Button, Loading } from "@nextui-org/react";
import BarChart from "@components/BarChart";
import Loader from "@components/Loader";

export default function Main() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [registers, setRegisters] = useState([]);
  const [generalRegisters, setGeneralRegisters] = useState({});

  const handleGetRegisters = async () => {
    const registers = await getRegisters();
    if (!registers || !registers.length) {
      router.push("/");
    }
    setRegisters(registers);
  };

  const handleGetGeneralData = async () => {
    setLoading(true);
    const res = await generalData();
    setGeneralRegisters(res.data || {});
    setLoading(false);
  };

  useEffect(() => {
    handleGetRegisters();
    handleGetGeneralData();
  }, []);

  const cleanDataBase = async () => {
    if (loading) return;
    setLoading(true);
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esta accion. Perderas todos los registros de la base de datos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeRegisters();
        Swal.fire("Borrado!", "La base de datos ha sido borrada.", "success");
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-[80%] my-5">
        <div>
          <h2 className="font-bold text-xl mb-2">Danger Zone</h2>
          <div className="border-2 border-red-500 p-4 rounded-xl border-da">
            <p>Elimina todos los registros de la base de datos.</p>
            <p>
              <span className="font-bold">Nota:</span> Esta accion no se puede
              revertir.
            </p>
            <Button
              onClick={cleanDataBase}
              color="error"
              shadow
              className="mt-4"
              icon={
                loading && (
                  <Loading type="spinner" color="currentColor" size="sm" />
                )
              }
            >
              Limpiar base de datos
            </Button>
          </div>
        </div>
        {loading && <Loader />}
        {Object.keys(generalRegisters).length && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="shadow-xl p-10 h-auto rounded-lg">
              <BarChart
                title="Programadores que su hobby es programar"
                labels={generalRegisters?.hobby?.map((person) => person._id)}
                data={generalRegisters?.hobby?.map((person) => person.count)}
              />
            </div>
            <div className="shadow-xl p-10 h-auto rounded-lg">
              <BarChart
                title="Nacionalidad de los programadores"
                labels={generalRegisters?.country?.map((person) => person._id)}
                data={generalRegisters?.country?.map((person) => person.count)}
              />
            </div>
            <div className="shadow-xl p-10 h-auto rounded-lg">
              <BarChart
                title="Edad de los programadores"
                labels={generalRegisters?.age?.map((person) => person._id)}
                data={generalRegisters?.age?.map((person) => person.count)}
              />
            </div>
            <div className="shadow-xl p-10 h-auto rounded-lg">
              <BarChart
                title="Programadores estudiando"
                labels={generalRegisters?.students?.map((person) => person._id)}
                data={generalRegisters?.students?.map((person) => person.count)}
              />
            </div>
            <div className="shadow-xl p-10 h-auto rounded-lg">
              <BarChart
                title="Experiencia profesional"
                labels={generalRegisters?.YearsCodingProf?.map((person) => person._id)}
                data={generalRegisters?.YearsCodingProf?.map((person) => person.count)}
              />
            </div>
            <div className="shadow-xl p-10 h-auto rounded-lg">
              <BarChart
                title="Sistema operativos"
                labels={generalRegisters?.OperatingSystem?.map((person) => person._id)}
                data={generalRegisters?.OperatingSystem?.map((person) => person.count)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
