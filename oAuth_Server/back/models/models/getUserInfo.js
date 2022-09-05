module.exports = (sequelize, DataTypes) => {
    const getUserInfo = sequelize.define(
        'getUserInfo',
        {
            RestAPI: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            name: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            gender: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            age: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            mobile: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            addr: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'getUserinfo',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return getUserInfo;
};
