// Depedencies
import { useEffect, useState } from "react";
import { v4 } from "uuid";
// Assets
import styles from "@styles/Components/InputFile.module.scss";


const InputFile = ({
  onChange,
  label,
  required,
  name,
  allowedTypes,
  files,
  defaultTypeFileError,
  onRemoveFile,
  singleFile,
  file,
  id,
  ...props
}) => {
  // const [showAlert, setShowAlert] = useState(false);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    const dropArea = document.getElementById("drag_area");
    dropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropArea.classList.add(styles.drag_over);
    });
    dropArea.addEventListener("dragleave", () => {
      dropArea.classList.remove(styles.drag_over);
    });
    dropArea.addEventListener("drop", (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      handleFile(files);
      e.stopImmediatePropagation();
    });
  });

  const handleFile = (files) => {
    const rawFiles = [...files];
    rawFiles.forEach((file, idx) => {
      const fileType = file.type;
      const validType = allowedTypes.find(
        (allowedType) => allowedType.type === fileType
      );
      if (!validType) {
        // remove that file from the array
        rawFiles.splice(idx, 1);
        if (defaultTypeFileError) {
          setImageError(defaultTypeFileError);
        } else if (allowedTypes.length === 0) {
          setImageError(allowedTypes[0].messageError);
        } else {
          setImageError("El tipo de archivo no es válido");
        }
        return;
      }
    });
    onChange(rawFiles);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    if(singleFile) {
      const file = e.target.files[0];
      return handleFile([file]);
    }
    const files = e.target.files;
    handleFile(files);
  };

  const removeImage = (idx) => {
    onRemoveFile(idx);
  };

  const ramdom = v4().substr(0, 8);
  const ID = id ?? `${name}-${ramdom}`;

  const getFileIcon = (fileType) => {
    // const allowedTypes = allowedTypes;
    const validType = allowedTypes.find(
      (allowedType) => allowedType.type === fileType
    );
    if (validType) {
      return validType.icon;
    }
    return "fa-file";
  };

  return (
    <>
      <div className="w-full px-1 mb-3 input-file">
        <label htmlFor={ID} className="text-lg font-bold ml">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
        <div
          className={`${styles.drag_area} border-2 border-dashed border-gray-400 py-7 rounded-lg`}
          id="drag_area"
        >
          <>
            <div className={styles.icon}>
              <i className="fa-solid fa-upload dark:text-3xl"></i>
            </div>
            <header>Arrastra y suelta para subir un archivo</header>
            <span className="block">O</span>
            <label
              htmlFor={ID}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow cursor-pointer"
            >
              Selecciona un archivo
            </label>
            <input
              type="file"
              hidden
              id={ID}
              name={name}
              onChange={handleInputChange}
              multiple
            />
          </>
          {(!singleFile && files.length > 0) && (
            <div className="pt-5">
              {files.map((file, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-3xl">
                    <i className={`fa-solid ${getFileIcon(file.type)}`}></i>
                  </div>
                  <p className="text-center">{file.name}</p>
                  <p
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeImage(idx)}
                  >
                    Eliminar
                  </p>
                </div>
              ))}
            </div>
          )}
          {singleFile && file && (
            <div className="pt-5 grid grid-cols-4 gap-7">
              <div className="flex flex-col items-center">
                <div className="text-3xl">
                  <i className={`fa-solid ${getFileIcon(file.type)}`}></i>
                </div>
                <p className="text-center">{file.name}</p>
                <p
                  className="text-red-500 cursor-pointer"
                  onClick={() => removeImage()}
                >
                  Eliminar
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InputFile;