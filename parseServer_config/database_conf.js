const Parse = require('parse/node');
Parse.initialize("com.node.douyu_crawlers");
const GameScore = Parse.Object.extend("GameScore");
const gameScore = new GameScore();
gameScore.set("score", 123123);
gameScore.set("playerName", "Se1231231an Plott");
gameScore.set("cheatMode", false);
gameScore.save()
    .then((gameScore) => {
    console.log(gameScore);
}, (error) => {
    console.log(error);
});
//# sourceMappingURL=database_conf.js.map