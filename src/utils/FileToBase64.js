const toBase64 = (file, fileName) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    resolve({
      buffer: reader.result,
      type: file.type,
      name: fileName || file.name,
    });
  };
  reader.onerror = error => reject(error);
});

export default toBase64;