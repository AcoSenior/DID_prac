module.exports = (sequelize, DataTypes) => {
    const UserInfo = sequelize.define(
        'UserInfo',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hash: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'Userinfo',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return UserInfo;
};
