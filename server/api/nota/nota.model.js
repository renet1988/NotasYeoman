export default function(sequelize, DataTypes) {
    return sequelize.define('Nota', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        body: DataTypes.STRING,
        tipoNota: DataTypes.STRING,
        active: DataTypes.BOOLEAN
    });
}
