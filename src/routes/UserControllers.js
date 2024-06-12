const { Router } = require("express");
const { Models } = require("../models");
const { dataDiriRequest, validatePerkembangan } = require("../DTO/user-request");

const routes = Router();

routes.post("/data-diri", async (req, res) => {
  const dataDiri = req.body.data_diri;
  const hobi = req.body.hobi;
  const ayahKandung = req.body.ayah_kandung;
  const ibuKandung = req.body.ibu_kandung;
  const kesehatan = req.body.kesehatan;
  const pendidikan = req.body.pendidikan;
  const setelahPendidikan = req.body.setelah_pendidikan;
  const tempatTinggal = req.body.tempat_tinggal;
  const wali = req.body.wali;
  const siswa = req.body.siswa;

  Models.user.create(siswa).then(async (data) => {
    dataDiri.user_id = data.id;
    await Models.data_diri.create(dataDiri);

    hobi.user_id = data.id;
    await Models.hobi_siswa.create(hobi);

    ayahKandung.user_id = data.id;
    await Models.ayah_kandung.create(ayahKandung);

    ibuKandung.user_id = data.id;
    await Models.ibu_kandung.create(ibuKandung);

    kesehatan.user_id = data.id;
    await Models.kesehatan.create(kesehatan);

    pendidikan.user_id = data.id;
    await Models.pendidikan.create(pendidikan);

    setelahPendidikan.user_id = data.id;
    await Models.setelah_pendidikan.create(setelahPendidikan);

    tempatTinggal.user_id = data.id;
    await Models.tempat_tinggal.create(tempatTinggal);

    wali.user_id = data.id;
    await Models.wali.create(wali);

    res.status(201).json(req.body);
  });
});

routes.get("/ayah-kandung/:id", async (req, res) => {
  const data = await Models.ayah_kandung.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ["user_id"],
    },
  });
  res.json(data);
});

routes.get("/data-diri/:id", async (req, res) => {
  const data = await Models.data_diri.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ["user_id"],
    },
  });
  res.json(data);
});

routes.get("/hobi/:id", async (req, res) => {
  const data = await Models.hobi_siswa.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ["user_id"],
    },
  });
  res.json(data);
});

routes.get("/ibu-kandung/:id", async (req, res) => {
  const data = await Models.ibu_kandung.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ["user_id"],
    },
  });
  res.json(data);
});

routes.get("/kesehatan/:id", async (req, res) => {
  const data = await Models.kesehatan.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ["user_id"],
    },
  });
  res.json(data);
});

routes.get("/pendidikan/:id", async (req, res) => {
  const data = await Models.pendidikan.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ["user_id"],
    },
  });
  res.json(data);
});

routes.get("/perkembangan/:id", async (req, res) => {
  const data = await Models.perkembangan.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ["user_id"],
    },
  });
  res.json(data);
});

routes.get("/setelah-pendidikan/:id", async (req, res) => {
  const data = await Models.setelah_pendidikan.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ["user_id"],
    },
  });
  res.json(data);
});

routes.get("/tempat-tinggal/:id", async (req, res) => {
  const data = await Models.tempat_tinggal.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ["user_id"],
    },
  });
  res.json(data);
});

routes.get("/wali/:id", async (req, res) => {
  const data = await Models.wali.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ["user_id"],
    },
  });
  res.json(data);
});

routes.post("/perkembangan/:id", validatePerkembangan, async (req, res) => {
  try {
    const body = req.body;
    body.user_id = req.params.id;
    const response = await Models.perkembangan.create(body);

    res.status(201).json(response);
  } catch (ex) {
    res.status(500);
  }
});

routes.get("/jurusan", async (req, res) => {
  try {
    const allJurusan = await jurusan.findAll();
    res.status(200).json(allJurusan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routes.get("/angkatan", async (req, res) => {
  try {
    const allAngkatan = await angkatan.findAll();
    res.status(200).json(allAngkatan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = routes;
