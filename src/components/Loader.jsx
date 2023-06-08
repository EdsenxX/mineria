// assets
import style from "@styles/Components/Loader.module.scss";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center w-full h-full items-center gap-4">
      <div className={style.loader_roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="text-xl font-bold">Cargando</p>
    </div>
  );
};

export default Loader;
