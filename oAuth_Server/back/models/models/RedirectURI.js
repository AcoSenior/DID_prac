module.exports = (sequelize, DataTypes) => {
    const RedirectURI = sequelize.define(
        'RedirectURI',
        {
            RestAPI: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            redirectURI: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'RedirectURI',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return RedirectURI;
};
