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
  getSatisfactionData,
} from "@services/registers";
// Components
import { Button, Loading } from "@nextui-org/react";
import BarChart from "@components/BarChart";
import PieChart from "@components/PieChart";
import Loader from "@components/Loader";

export default function Main() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [registers, setRegisters] = useState([]);
  const [generalRegisters, setGeneralRegisters] = useState({});
  const [filters, setFilters] = useState({});
  const [firstRender, setFirstRender] = useState(true);
  const [satisfactionData, setSatisfactionData] = useState([]);
  const [loadingSatisfaction, setLoadingSatisfaction] = useState(false);

  const handleGetRegisters = async () => {
    const registers = await getRegisters();
    if (!registers || !registers.length) {
      router.push("/");
    }
    setRegisters(registers);
  };

  const handleGetGeneralData = async () => {
    const res = await generalData();
    setGeneralRegisters(res.data || {});
  };

  const handleGetSatisfactionData = async () => {
    const res = await getSatisfactionData(filters);
    setSatisfactionData(res.data || {});
  };

  const initComponent = async () => {
    if (firstRender) {
      setLoading(true);
      await handleGetRegisters();
      await handleGetGeneralData();
      setFirstRender(false);
      setLoading(false);
    }
    setLoadingSatisfaction(true);
    await handleGetSatisfactionData();
    setLoadingSatisfaction(false);
  };

  useEffect(() => {
    initComponent();
  }, [filters]);

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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
  };

  const handleChangeForm = (e) => {
    let filters = {};
    const radioInputs = document.querySelectorAll("input[type=radio]:checked");
    const radioInputsArray = Array.from(radioInputs);
    radioInputsArray.forEach((input) => {
      const key = input.name;
      const value = input.id.split(`${key}-`)[1];
      filters[key] = value;
    });
    setFilters(filters);
  };

  const cleanFilters = () => {
    const radioInputs = document.querySelectorAll("input[type=radio]:checked");
    const radioInputsArray = Array.from(radioInputs);
    radioInputsArray.forEach((input) => {
      input.checked = false;
    });
    setFilters({});
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
        {loading ? (
          <Loader />
        ) : (
          Object.keys(generalRegisters).length && (
            <div className="mb-10">
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="shadow-xl p-10 h-auto rounded-lg">
                  <BarChart
                    title="Programadores que su hobby es programar"
                    labels={generalRegisters?.Hobby?.map(
                      (person) => person._id
                    )}
                    data={generalRegisters?.Hobby?.map(
                      (person) => person.count
                    )}
                  />
                </div>
                <div className="shadow-xl p-10 h-auto rounded-lg">
                  <BarChart
                    title="Nacionalidad de los programadores"
                    labels={generalRegisters?.Country?.map(
                      (person) => person._id
                    )}
                    data={generalRegisters?.Country?.map(
                      (person) => person.count
                    )}
                  />
                </div>
                <div className="shadow-xl p-10 h-auto rounded-lg">
                  <BarChart
                    title="Edad de los programadores"
                    labels={generalRegisters?.Age?.map((person) => person._id)}
                    data={generalRegisters?.Age?.map((person) => person.count)}
                  />
                </div>
                <div className="shadow-xl p-10 h-auto rounded-lg">
                  <BarChart
                    title="Programadores estudiando"
                    labels={generalRegisters?.Student?.map(
                      (person) => person._id
                    )}
                    data={generalRegisters?.Student?.map(
                      (person) => person.count
                    )}
                  />
                </div>
                <div className="shadow-xl p-10 h-auto rounded-lg">
                  <BarChart
                    title="Experiencia profesional"
                    labels={generalRegisters?.YearsCodingProf?.map(
                      (person) => person._id
                    )}
                    data={generalRegisters?.YearsCodingProf?.map(
                      (person) => person.count
                    )}
                  />
                </div>
                <div className="shadow-xl p-10 h-auto rounded-lg">
                  <BarChart
                    title="Sistema operativos"
                    labels={generalRegisters?.OperatingSystem?.map(
                      (person) => person._id
                    )}
                    data={generalRegisters?.OperatingSystem?.map(
                      (person) => person.count
                    )}
                  />
                </div>
                <div className="shadow-xl p-10 h-auto rounded-lg">
                  <BarChart
                    title="Satisfaccion de los programadores con su trabajo"
                    labels={generalRegisters?.JobSatisfaction?.map(
                      (person) => person._id
                    )}
                    data={generalRegisters?.JobSatisfaction?.map(
                      (person) => person.count
                    )}
                  />
                </div>
              </div>
              <div className="mt-10 p-4 w-full rounded-lg shadow-xl flex gap-2">
                <form
                  className="w-1/4 shadow-md bg-gray-100 p-3 flex flex-col"
                  onChange={handleChangeForm}
                  onSubmit={handleSubmitForm}
                >
                  {Object.keys(generalRegisters).map(
                    (key, idx) =>
                      key !== "JobSatisfaction" && (
                        <div key={idx}>
                          <h2 className="font-bold text-xl mb-2 uppercase">
                            {key}
                          </h2>
                          <ul>
                            {generalRegisters[key].map((option, idx) => (
                              <li key={idx} className="flex gap-2">
                                <input
                                  type="radio"
                                  name={key}
                                  id={`${key}-${option._id}`}
                                />
                                <label htmlFor={`${key}-${option._id}`}>
                                  {option._id}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                  )}
                </form>
                <div className="w-4/5 mx-auto relative">
                  <div className="w-full flex justify-center">
                    <button
                      type="button"
                      className="p-4 bg-[#3085d6] rounded-xl font-bold text-white"
                      onClick={cleanFilters}
                    >
                      Limpiar filtros
                    </button>
                  </div>
                  {!loadingSatisfaction && (
                    <div className="w-full sticky">
                      <PieChart
                        title="Satisfaccion de los programadores"
                        labels={satisfactionData.map((option) => option._id)}
                        data={satisfactionData.map((option) => option.count)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
