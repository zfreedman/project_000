// Note: comments done with
// http://patorjk.com/software/taag/#p=display&f=Doom&t=Logger

//                       _              _ 
//                      (_)            | |
//  _ __ ___  __ _ _   _ _ _ __ ___  __| |
// | '__/ _ \/ _` | | | | | '__/ _ \/ _` |
// | | |  __/ (_| | |_| | | | |  __/ (_| |
// |_|  \___|\__, |\__,_|_|_|  \___|\__,_|
//              | |                       
//              |_|       

var Sequelize = require('sequelize');

//           _               
//          | |              
//  ___  ___| |_ _   _ _ __  
// / __|/ _ \ __| | | | '_ \ 
// \__ \  __/ |_| |_| | |_) |
// |___/\___|\__|\__,_| .__/ 
//                    | |    
//                    |_|    

// Setup sequelize to connect to InsultPvP database
// with root user and empty password
var sequelize = new Sequelize('InsultPvP', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
               
//  _   _ ___  ___ _ __ ___ 
// | | | / __|/ _ \ '__/ __|
// | |_| \__ \  __/ |  \__ \
//  \__,_|___/\___|_|  |___/

// Define user model
var users = sequelize.define('user', {
  // ID
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true
  },
  // User username
  username: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  // User password
  password: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  // User salt for password hashing
  salt: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  // User createdAt time
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  // User updatedAt time
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
});

//        _                           
//       | |                          
//  _ __ | | __ _ _   _  ___ _ __ ___ 
// | '_ \| |/ _` | | | |/ _ \ '__/ __|
// | |_) | | (_| | |_| |  __/ |  \__ \
// | .__/|_|\__,_|\__, |\___|_|  |___/
// | |             __/ |              
// |_|            |___/               

// Define player model
var players = sequelize.define('players', {
  // ID
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true
  },
  // Player name
  playername: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  // Username foreign key
  userID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  // Player image path
  imagePath: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  // Player about me
  aboutMe: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  // Player createdAt time
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  // Player updatedAt time
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
});

//        _                       _____ _        _       
//       | |                     /  ___| |      | |      
//  _ __ | | __ _ _   _  ___ _ __\ `--.| |_ __ _| |_ ___ 
// | '_ \| |/ _` | | | |/ _ \ '__|`--. \ __/ _` | __/ __|
// | |_) | | (_| | |_| |  __/ |  /\__/ / || (_| | |_\__ \
// | .__/|_|\__,_|\__, |\___|_|  \____/ \__\__,_|\__|___/
// | |             __/ |                                 
// |_|            |___/                                  

// Define player stats model
var playerStats = sequelize.define('playerStats', {
  // FOREIGN KEY / PRIMARY KEY
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'players',
      key: 'id'
    }
  },
  // Player win loss ratio
  winLossRatio: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  // Player type
  playerType: {
    type: Sequelize.STRING(32),
    allowNull: false,
    defaultValue: 'untyped'
  },
  // Player win velocity
  winVelocity: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  // Player rank
  rank: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  // Player win streak
  winStreak: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  // Player stat createdAt time
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  // Player stat updatedAt time
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
});

//  _ __ ___   ___  _ __ ___  ___ 
// | '__/ _ \ / _ \| '_ ` _ \/ __|
// | | | (_) | (_) | | | | | \__ \
// |_|  \___/ \___/|_| |_| |_|___/

// Define rooms model
var rooms = sequelize.define('rooms', {
  // First player's ID
  player1_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'players',
      key: 'id'
    }
  },
  // Second player's ID
  player2_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'players',
      key: 'id'
    }
  },
  // String to file path
  filepath: {
    type: Sequelize.STRING(64),
    allowNull: false,
    defaultValue: 'some/file/path/myFile.txt'
  },
  // Boolean to decide if room is active or ready for judging
  isOpen: {
    type: Sequelize.BOOLEAN(),
    allowNull: false,
    defaultValue: true
  },
  // The number of turns that have passed
  turnCount: {
    type: Sequelize.INTEGER(),
    allowNull: false,
    defaultValue: 0
  },
  // Room createdAt time
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  // Room updatedAt time
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
});

//                       _             
//                      (_)            
//  ___ _   _ _ __   ___ _ _ __   __ _ 
// / __| | | | '_ \ / __| | '_ \ / _` |
// \__ \ |_| | | | | (__| | | | | (_| |
// |___/\__, |_| |_|\___|_|_| |_|\__, |
//       __/ |                    __/ |
//      |___/                    |___/ 

// Users table sync
users.sync().then(function () {
  // Users table created
  console.log('Synced to User Table');
})

// Players table sync
.then(function () {
  // Sync to database
  players.sync().then(function () {
    // Table created
    console.log('Synced to Player Table');
  });
})

// Player stats table sync
.then(function () {
  // Sync to database
  playerStats.sync().then(function () {
    // Table created
    console.log('Synced to Player Stats Table');
  });
})

// Player rooms table sync
.then(function () {
  // Sync to database
  rooms.sync().then(function () {
    // Table created
    console.log('Synced to Rooms Table');
  });
})

//                             _       
//                            | |      
//   _____  ___ __   ___  _ __| |_ ___ 
//  / _ \ \/ / '_ \ / _ \| '__| __/ __|
// |  __/>  <| |_) | (_) | |  | |_\__ \
//  \___/_/\_\ .__/ \___/|_|   \__|___/
//           | |                       
//           |_|    

// Export users
module.exports.users = users;
// Export players
module.exports.players = players;
// Export player stats
module.exports.playerStats = playerStats;
// Export rooms
module.exports.rooms = rooms;
