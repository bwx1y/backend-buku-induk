const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kesehatan', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    gol_darah: {
      type: DataTypes.ENUM('A','B','O','AB'),
      allowNull: true
    },
    penyakit_pernah_diderita: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    kelainan_jasmani: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tinggi: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    berat_badan: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'kesehatan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_fk_keterangan_kesehatan",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
