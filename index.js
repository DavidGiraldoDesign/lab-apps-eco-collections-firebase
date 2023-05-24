import { express, dotenv, cors, SocketIOServer } from './dependencies.js';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRouters.js';
import fireStoreDB from './firebase-config.js';

dotenv.config();
const PORT = process.env.PORT;
const app = express();

//fireStoreDB.updateRealTime('Leads', () => { console.log('update!') })
/*fireStoreDB.getCollection('Leads').then((leads) => {
  console.log(leads);
})*/
//fireStoreDB.addNewDocumentTo({ name: 'Camila', age: 58, state: true }, 'Leads');

const httpServer = app.listen(PORT, () => {
  console.table({
    "Dashboard app:": `http://localhost:${PORT}/dashboard-app`,
    "Mobile app:": `http://localhost:${PORT}/mobile-app`
  });
});

const io = new SocketIOServer(httpServer, { path: '/real-time' });

const STATIC_APP = express.static('./static/client-app');
const STATIC_DASHBOARD = express.static('./static/dashboard-app');

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use('/mobile-app', STATIC_APP);
app.use('/dashboard-app', STATIC_DASHBOARD);
app.use('/user', userRoutes);
app.use('/dashboard', dashboardRoutes);

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} connected.`);

  // Custom event
  socket.on('customEvent', (data) => {
    console.log('Received custom event:', data);
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnect.`);
  });
});

fireStoreDB.updateRealTime('Leads', () => {
  io.emit('real-time-update', { state: 'Using onSnapshot' })
});

export { io };