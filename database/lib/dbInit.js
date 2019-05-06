const Breakdown = require('../models/Breakdown')
const BreakdownType = require('../models/BreakdownType')
const Client = require('../models/Client')
const Position = require('../models/Position')
const Service = require('../models/Service')
const ServiceList = require('../models/ServiceList')
const InnerServiceType = require('../models/InnerServiceType')
const ServiceList_Service = require('../models/ServiceList_Service')
const ServiceListBreakdown = require('../models/ServiceListBreakdown')
const ServiceType = require('../models/ServiceType')
const ServiceList_Status = require('../models/ServiceList_Status')
const Car = require('../models/Car')
const Worker = require('../models/Worker')
const User = require('../models/User')
const SprCar = require('../models/SprCar')
const Model = require('../models/Model')
const Brand = require('../models/Brand')
const TypeOfPayment = require('../models/TypeOfPayment')
const UrClient = require('../models/UrClient')
const ServiceList_Worker = require('../models/ServiceList_Worker')
const EdIzmer = require('../models/EdIzmer')
const ServiceList_Detail = require('../models/ServiceList_Detail')
const Detail = require('../models/Detail')


BreakdownType.hasMany(Breakdown, { foreignKey: 'Type', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Breakdown.belongsTo(BreakdownType, { foreignKey: 'Type', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Breakdown.hasMany(ServiceListBreakdown, { foreignKey: 'ServiceListBr', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceListBreakdown.belongsTo(Breakdown, { foreignKey: 'ServiceListBr', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

ServiceList.hasMany(ServiceListBreakdown, { foreignKey: 'ServiceListFK', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'restrict'})
ServiceListBreakdown.belongsTo(ServiceList, { foreignKey: 'ServiceListFK', targetKey: 'id', onDelete: 'cascade', onUpdate: 'restrict' })


ServiceType.hasMany(Service, { foreignKey: 'Type', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Service.belongsTo(ServiceType, { foreignKey: 'Type', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Service.hasMany(ServiceList_Service, { foreignKey: 'ServiceFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList_Service.belongsTo(Service, { foreignKey: 'ServiceFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

ServiceList.hasMany(ServiceList_Service, { foreignKey: 'ServiceListFK', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'restrict'})
ServiceList_Service.belongsTo(ServiceList, { foreignKey: 'ServiceListFK', targetKey: 'id', onDelete: 'cascade', onUpdate: 'restrict' })

ServiceList.hasMany(ServiceList_Detail, { foreignKey: 'ServiceListFK', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'restrict', as:"ServiceList_Details"})
ServiceList_Detail.belongsTo(ServiceList, { foreignKey: 'ServiceListFK', targetKey: 'id', onDelete: 'cascade', onUpdate: 'restrict' })

ServiceList.hasMany(ServiceList_Worker, { foreignKey: 'ServiceListFK', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'restrict'})
ServiceList_Worker.belongsTo(ServiceList, { foreignKey: 'ServiceListFK', targetKey: 'id', onDelete: 'cascade', onUpdate: 'restrict' })

Detail.hasMany(ServiceList_Detail, { foreignKey: 'DetailFK', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'restrict'})
ServiceList_Detail.belongsTo(Detail, { foreignKey: 'DetailFK', targetKey: 'id', onDelete: 'cascade', onUpdate: 'restrict' })

Position.hasMany(Worker, { foreignKey: 'PositionFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Worker.belongsTo(Position, { foreignKey: 'PositionFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Worker.hasMany(ServiceList_Worker, { foreignKey: 'WorkerFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList_Worker.belongsTo(Worker, { foreignKey: 'WorkerFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Client.hasMany(ServiceList, { foreignKey: 'ClientFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(Client, { foreignKey: 'ClientFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

UrClient.hasMany(ServiceList, { foreignKey: 'UrClientFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(UrClient, { foreignKey: 'UrClientFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Client.hasMany(Car, { foreignKey: 'OwnerFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Car.belongsTo(Client, { foreignKey: 'OwnerFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

UrClient.hasMany(Car, { foreignKey: 'OwnerUrFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Car.belongsTo(UrClient, { foreignKey: 'OwnerUrFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Car.hasMany(ServiceList, { foreignKey: 'CarFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(Car, { foreignKey: 'CarFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

SprCar.hasMany(Car, { foreignKey: 'SprCarFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Car.belongsTo(SprCar, { foreignKey: 'SprCarFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Model.hasMany(SprCar, { foreignKey: 'ModelFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
SprCar.belongsTo(Model, { foreignKey: 'ModelFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Brand.hasMany(SprCar, { foreignKey: 'BrandFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
SprCar.belongsTo(Brand, { foreignKey: 'BrandFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

EdIzmer.hasMany(Detail, { foreignKey: 'EdIzmerFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Detail.belongsTo(EdIzmer, { foreignKey: 'EdIzmerFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

InnerServiceType.hasMany(ServiceList, { foreignKey: 'InnerStatus', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(InnerServiceType, { foreignKey: 'InnerStatus', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

TypeOfPayment.hasMany(ServiceList, { foreignKey: 'TypeOfPaymentFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(TypeOfPayment, { foreignKey: 'TypeOfPaymentFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

ServiceList_Status.hasMany(ServiceList, { foreignKey: 'Status', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(ServiceList_Status, { foreignKey: 'Status', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

User.belongsTo(Worker, { foreignKey: 'worker_id', targetKey: 'id'})
// User.hasMany(UserInGroup, { foreignKey: 'id_us', sourceKey: 'id' })
// UserInGroup.belongsTo(Group, { foreignKey: 'id_gr', targetKey: 'id' })
// UserInGroup.belongsTo(User, { foreignKey: 'id_us', targetKey: 'id' })
async function init () {
    // await EdIzmer.sync({force:true})
    // await Model.sync({force:true})
    // await Brand.sync({force:true})
    // await SprCar.sync({force:true})
    // await UrClient.sync({force:true})
    // await Client.sync({force:true})
    // await Car.sync({force:true})
    //
    // await ServiceList_Status.sync({force:true})
    // await InnerServiceType.sync({force:true})
    // await TypeOfPayment.sync({force:true})
    // await ServiceList.sync({force:true})
    //
    //
    // await BreakdownType.sync({force:true})
    // await Breakdown.sync({force:true})
    // await ServiceListBreakdown.sync({force:true})
    //
    //
    // await ServiceType.sync({force:true})
    // await Service.sync({force:true})
    // await ServiceList_Service.sync({force:true})
    //
    // await Detail.sync({force:true})
    // await ServiceList_Detail.sync({force:true})
    //
    // await Position.sync({force:true})
    // await Worker.sync({force:true})
    // await ServiceList_Worker.sync({force:true})
    // await User.sync({force:true})


    await EdIzmer.sync()
    await Model.sync()
    await Brand.sync()
    await SprCar.sync()
    await UrClient.sync()
    await Client.sync()
    await Car.sync()

    await ServiceList_Status.sync()
    await InnerServiceType.sync()
    await TypeOfPayment.sync()
    await ServiceList.sync()


    await BreakdownType.sync()
    await Breakdown.sync()
    await ServiceListBreakdown.sync()


    await ServiceType.sync()
    await Service.sync()
    await ServiceList_Service.sync()

    await Detail.sync()
    await ServiceList_Detail.sync()

    await Position.sync()
    await Worker.sync()
    await ServiceList_Worker.sync()
    await User.sync()
}

(async function f () {
  await init()
})()



// module.exports.init = init()
