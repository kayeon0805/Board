module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        "Post",
        {
            title: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            date: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        }
    );
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
    };
    return Post;
};
