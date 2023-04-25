// Model
import RegisterModel from "models/Registers";

export async function addRegisters(req, res) {
  try {
    const { body } = req;
    await RegisterModel.insertMany(body);
    res.status(200).json({
      message: "Registros agregados correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getRegisters(req, res) {
  try {
    const registers = await RegisterModel.find().limit(100);
    res.status(200).json(registers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function removeRegisters(req, res) {
  try {
    await RegisterModel.deleteMany({});
    res.status(200).json({
      message: "Registros eliminados correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
}
