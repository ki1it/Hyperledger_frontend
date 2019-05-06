const Document = require('../models/Document')
const DocSigners = require('../models/DocSigners')
const User = require('../models/User')
const SignedStatus = require('../models/SignedStatus')
const Position = require('../models/Position')


Document.hasMany(DocSigners, { foreignKey: 'DocumentFK', sourceKey: 'id'})
DocSigners.belongsTo(Document, { foreignKey: 'DocumentFK', targetKey: 'id'})

User.hasMany(DocSigners, { foreignKey: 'UserFK', sourceKey: 'id'})
DocSigners.belongsTo(User, { foreignKey: 'UserFK', targetKey: 'id'})

Position.hasMany(User, { foreignKey: 'PositionFK', sourceKey: 'id'})
User.belongsTo(Position, { foreignKey: 'PositionFK', targetKey: 'id'})

SignedStatus.hasMany(DocSigners, { foreignKey: 'SignedFK', sourceKey: 'id'})
DocSigners.belongsTo(SignedStatus, { foreignKey: 'SignedFK', targetKey: 'id'})

// User.belongsTo(Worker, { foreignKey: 'worker_id', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
// User.hasMany(UserInGroup, { foreignKey: 'id_us', sourceKey: 'id' })
// UserInGroup.belongsTo(Group, { foreignKey: 'id_gr', targetKey: 'id' })
// UserInGroup.belongsTo(User, { foreignKey: 'id_us', targetKey: 'id' })
async function init () {
    await Position.sync({force:true})
    await SignedStatus.sync({force:true})
    await Document.sync({force:true})
    await User.sync({force:true})
    await DocSigners.sync({force:true})



    // await User.sync()
}

(async function f () {
  await init()
})()



// module.exports.init = init()
