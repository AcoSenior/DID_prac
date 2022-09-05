module.exports = (sequelize, DataTypes) => {
    const AppInfo = sequelize.define(
        'AppInfo',
        {
            owner: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            appName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            RestAPI: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Client_secret: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'AppInfo',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return AppInfo;
};
