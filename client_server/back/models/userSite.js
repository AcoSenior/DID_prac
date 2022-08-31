module.exports = (sequelize, DataTypes) => {
    const AuserSite = sequelize.define(
        'AuserSite',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mobile: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'AuserSite',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return AuserSite;
};
