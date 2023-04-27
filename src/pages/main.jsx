// Dependencies
import Head from "next/head";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Services
import { removeRegisters, getRegisters } from "@services/registers";
// Components
import { Button, Loading } from "@nextui-org/react";

export default function Main() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [registers, setRegisters] = useState([]);

  const handleGetRegisters = async () => {
    const registers = await getRegisters();
    if (!registers || !registers.length) {
      router.push("/");
    }
    setRegisters(registers);
  };

  useEffect(() => {
    handleGetRegisters();
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
    </div>
  );
}
