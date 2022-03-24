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
        type: Sequelize.STRING, 
        // allowNull: false,
    },
    project_timeline_end: {
        type: Sequelize.STRING, 
        // allowNull: false,
    },
    campaign_timeline_start: {
        type: Sequelize.STRING, 
        // allowNull: false,
    },
    campaign_timeline_end: {
        type: Sequelize.STRING, 
        // allowNull: false,
    },
    fundraising_goal: {
        type: Sequelize.INTEGER, 
        // allowNull: false,
    },
    isFunded: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    totalDonations: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    totalContributions: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    projectWalletAddress: {
        type: Sequelize.STRING,
    }
    // location: {
    //     type: Sequelize.GEOMETRY, 
    //     allowNull: false,
    // }, 
})


module.exports = Project