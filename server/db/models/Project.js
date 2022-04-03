const Sequelize = require('sequelize')
const db = require('../db')

const Project = db.define('project', {
    name: {
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true, 
    }, 
    description: {
        type: Sequelize.TEXT, 
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING, 
        defaultValue: "https://media.istockphoto.com/photos/laboratory-glassware-containing-chemical-liquid-science-background-picture-id1067056942?k=20&m=1067056942&s=612x612&w=0&h=cHUpHjfcKObXvN1V84J22uy8so1cipf12T9kMnYGtHQ="
    }, 
    videoUrl: {
        type: Sequelize.STRING, 
    },
    project_timeline_start: {
        type: Sequelize.DATE, 
        // allowNull: false,
    },
    project_timeline_end: {
        type: Sequelize.DATE, 
        // allowNull: false,
    },
    campaign_timeline_start: {
        type: Sequelize.DATE, 
        // allowNull: false,
    },
    campaign_timeline_end: {
        type: Sequelize.DATE, 
        // allowNull: false,
    },
    fundraising_goal: {
        type: Sequelize.BIGINT, 
        // allowNull: false,
    },
    reachedGoal: {
        type: Sequelize.BOOLEAN, 
        defaultValue: false
    },
    //funds released by scientist after campaign is successful
    isFunded: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    totalDonations: {
        type: Sequelize.BIGINT,
        defaultValue: 0
    },
    project_wallet_address: {
        type: Sequelize.STRING,
    }, 
    campaign_contract_address: {
        type: Sequelize.STRING,
    },
    // location: {
    //     type: Sequelize.GEOMETRY, 
    //     allowNull: false,
    // }, 
})


module.exports = Project