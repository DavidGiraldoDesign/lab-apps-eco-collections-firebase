const view = new View();
const HOST = window.location.hostname;
const PROTOCOL = window.location.protocol;
const PORT = window.location.port === ''? '' : `:${window.location.port}`
const URL = `${PROTOCOL}//${HOST}${PORT}`;
console.log(URL);
const socket = io(URL, { path: '/real-time' });

function controller(view, socket) {

    view.doughnutChartUpdate = (x) => {
        console.log('Data updated');
        console.log(x);
        x.data.datasets[0].data = [50, 50];
        x.data.labels = ["iOS", "Android"];
        x.update();
    }
    view.barChartUpdate = (x) => {
        console.log('Data updated');
        console.log(x);
        x.data.datasets[0].data = [80, 50, 60, 30];
        x.data.labels = ["Unicentro", "Jardin", "Cosmocentro", "Palmeto"];
        x.update();
    }

    (async function getDashboardData() {
        const request = await fetch(`${URL}/dashboard`);
        const data = await request.json();
        kpi = data;
        //popularityOfOS[0] = dashboardLocalData.interactions.filter( inter)
        console.log(kpi);

        view.updateTable(kpi.lastFiveLeads);
        view.updateDoughnutChart([kpi.osPopulatiry["Android"], kpi.osPopulatiry["iOS"], kpi.osPopulatiry["Other"]]);
        view.updateBarChart(kpi.visitsByDay);
    })();

    const updateRealTime = async () => {
        const request = await fetch(`${URL}/dashboard`);
        const data = await request.json();
        const kpi = data;
        view.updateTable(kpi.lastFiveLeads);
        view.updateDoughnutChart([kpi.osPopulatiry["Android"], kpi.osPopulatiry["iOS"], kpi.osPopulatiry["Other"]]);
        view.updateBarChart(kpi.visitsByDay);
        console.log('Hello from updateRealTime');
    }

    socket.on('real-time-update', (data) => {
        console.log('Some update happen!');
        updateRealTime();
    });

    view.render();

}
controller(view, socket);


/*

    setInterval(() => {
        const min = 10;
        const max = 100;
        const randomNumbers = [
            Math.floor(Math.random() * (max - min + 1)) + min,
            Math.floor(Math.random() * (max - min + 1)) + min,
            Math.floor(Math.random() * (max - min + 1)) + min,
            Math.floor(Math.random() * (max - min + 1)) + min]

        let data = [randomNumbers[0], randomNumbers[1], randomNumbers[2], randomNumbers[3]];
        let labels = ["Unicentro", "Jardin", "Cosmocentro", "Palmeto"];

        //view.updateBarChart({ data, labels });
        //view.updateDoughnutChart({ data, labels });
    }, 2000);
*/