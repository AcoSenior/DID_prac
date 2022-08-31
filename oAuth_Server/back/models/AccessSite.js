module.exports = (sequelize, DataTypes) => {
    const AccessSite = sequelize.define(
        'AccessSite',
        {   
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            appName:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            redirectURI1: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            redirectURI2: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            redirectURI3: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            redirectURI4: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            redirectURI5: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            restAPI: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            clientSecretKey: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'AccessSite',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return AccessSite;
};
