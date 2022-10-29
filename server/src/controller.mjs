import {
    gameSessions
} from './stores.mjs'

import { GameSession } from './game/game-session.mjs'

function getAllSessions (req, res)  {
    res.send(gameSessions.all());
}

function startNewGame (req, res) { // TODO: support multiplayer
    const gameSession = new GameSession({
        numberOfPlayers: 3,
        numberOfCastles: 10,
    });
    gameSessions.add(gameSession);
    res.send({id: gameSession.id});
    gameSession.start();
}


function getGameStatus (req, res) {

}


function shoot(req, res) {
    const sessionId = req.params.sessionId;
    const playerId = req.body.player.id;
    const originCastleId = req.body.originCastle.id;
    const targetCastleId = req.body.targetCastle.id;

    const gameSession = gameSessions.find({id: sessionId});
    if (!gameSession) {
        res.status(404).send(`session [${sessionId}] not found`);
        return;
    }

    const originCastle = gameSession.setup.castles.find({id: originCastleId});

    if (!originCastle) {
        res.status(400).send(`castle [${originCastleId}] does not exist`);
        return;
    }
    const targetCastle = gameSession.setup.castles.find({id: targetCastleId});
    if (!targetCastle) {
        res.status(400).send(`castle [${targetCastleId}] does not exist`);
        return;
    }

    if (!originCastle.ownerKing?.id !== playerId) {
        res.status(400).send('player is not owner king');
        return;
    }

    console.log(`[${sessionId}] :: [${playerId}] is shooting from tower [${originCastleId}] on tower [${targetCastleId}]`);
    gameSession.shoot({
        originCastle,
        targetCastle,
    });
    res.send();
}


export {
    getAllSessions,
    getGameStatus,
    shoot,
    startNewGame
}
