module.exports = (sequelize, DataTypes) => {
    const Auth = sequelize.define(
        'Auth',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            point: {
                type: DataTypes.INTEGER,
                allowNull: false,
                default: 0,
            },
        },
        {
            timestamps: false,
            tableName: 'Login',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return Auth;
};
