module.exports = (sequelize, DataTypes) => {
    const UserPoint = sequelize.define(
        'UserPoint',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            RestAPI: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            point: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'UserPoint',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return UserPoint;
};
