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

export async function getGeneralData(req, res) {
  try {
    const hobby = await RegisterModel.aggregate([
      {
        $group: {
          _id: "$Hobby",
          count: { $sum: 1 },
        },
      }
    ]);
    const country = await RegisterModel.aggregate([
      {
        $group: {
          _id: "$Country",
          count: { $sum: 1 },
        },
      }
    ]);
    const age = await RegisterModel.aggregate([
      {
        $group: {
          _id: "$Age",
          count: { $sum: 1 },
        },
      }
    ]);
    const students = await RegisterModel.aggregate([
      {
        $group: {
          _id: "$Student",
          count: { $sum: 1 },
        },
      }
    ]);
    const YearsCodingProf = await RegisterModel.aggregate([
      {
        $group: {
          _id: "$YearsCodingProf",
          count: { $sum: 1 },
        },
      }
    ]);
    const OperatingSystem = await RegisterModel.aggregate([
      {
        $group: {
          _id: "$OperatingSystem",
          count: { $sum: 1 },
        },
      }
    ]);
    res.status(200).json({
      message: "Datos generales",
      data: {
        hobby,
        country,
        age,
        students,
        YearsCodingProf,
        OperatingSystem,
      },
      status: {
        code: 200,
        message: "OK",
      }
    });
  } catch (error) {
    console.log("Error al genera datos generales >>>> ", error);
    res.status(500).json({
      message: error.message,
    });
  }
}
