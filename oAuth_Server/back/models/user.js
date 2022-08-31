module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        {
            hashId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            A: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            B: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            C: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            D: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
        },
        {
            timestamps: false,
            tableName: 'oAuth',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return user;
};
