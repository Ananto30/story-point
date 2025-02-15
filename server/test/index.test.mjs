import { should, use } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../index.mjs';
import { io as Client } from 'socket.io-client';

should();
use(chaiHttp);

describe('Socket.io Test', () => {
  let clientSocket;

  beforeEach((done) => {
    clientSocket = Client('http://localhost:3000', {
      query: { user: 'testUser', room: 'testRoom' },
      reconnectionDelay: 0,
      forceNew: true,
      transports: ['websocket'],
    });
    clientSocket.on('connect', () => {
      done();
    });
  });

  afterEach((done) => {
    if (clientSocket.connected) {
      clientSocket.disconnect();
    }
    done();
  });

  after((done) => {
    server.close();
    done();
  });

  it('should join a room and receive initial data', (done) => {
    clientSocket.on('users', (users) => {
      users.should.include('testUser');
    });
    clientSocket.on('roomConfig', (config) => {
      config.should.have.property('maxTimerSeconds', 10);
      done();
    });
  });

  it('should change room configuration', (done) => {
    const newConfig = {
      maxTimerSeconds: 1,
      pointingSystem: 'T-shirt sizing',
      allowedPointingSystem: ['Fibonacci series', 'T-shirt sizing'],
      tShirtPointing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      fibonacciPointing: [0, 1, 2, 3, 5, 8, 13, 20],
    };
    clientSocket.emit('roomConfigChange', newConfig, (config) => {
      config.should.deep.equal(newConfig);
      done();
    });
  });

  it('should start a session and emit timer updates', (done) => {
    clientSocket.emit('startSession');
    // wait a bit for the timer to start
    setTimeout(() => {
      clientSocket.on('timer', (timer) => {
        timer.should.be.a('number');
        if (timer === 0) {
          done();
        }
      });
    }, 100);
  });

  it('should handle votes and update leaderboard', (done) => {
    const vote = { name: 'testUser', point: 5 };
    clientSocket.emit('vote', vote, (leaderboard) => {
      leaderboard.should.deep.include(vote);
      done();
    });
  });

  it('should handle user disconnection', (done) => {
    clientSocket.on('disconnect', () => {
      done();
    });
    clientSocket.disconnect();
  });
});
