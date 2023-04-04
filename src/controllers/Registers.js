// Model
import RegisterModel from "models/Registers";

export async function addRegisters(req, res) {
  try {
    const { body } = req;
    RegisterModel.insertMany(body, (err, registers) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: err.message,
        });
      }
      res.status(200).json(registers);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
}
