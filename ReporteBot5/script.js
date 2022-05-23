
fetch("https://localhost:7153/api/Products/salesbot?startDate=1996-05-05&endDate=1998-05-05")
.then(response => response.json())
.then(data => {
    console.log(data);
    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['corechart', 'controls', 'table'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(() => { cargarChart(data) });

    $(document).ready( function () {
        $('#table_id').DataTable({
            data: data,
            columns:[                
                {data: 'proveedor'},
                {data: 'ventas'}
            ]
        });
    } );

});

function cargarChart(data) {
var datos = new google.visualization.DataTable();
//data.addColumn('string', 'Trimestre');
// datos.addColumn('number','Id');
datos.addColumn('number', 'Proveedor');
datos.addColumn('number', 'Ventas');
data.forEach((row) => {
    console.log(typeof (row));
    datos.addRow([row.proveedor, row.ventas]);
});

var dashboard = new google.visualization.Dashboard(
    document.getElementById('dashboard_div'));

var donutRangeSlider = new google.visualization.ControlWrapper({
    'controlType': 'NumberRangeFilter',
    'containerId': 'filter_div',
    'options': {
        'title':'Cantidad',
        'filterColumnLabel': 'Cantidad'
    }
});

var LineChart = new google.visualization.ChartWrapper({
    'chartType': 'LineChart',
    'containerId': 'chart_div',
    'options': {
        'title': 'Cantidad de ventas por año',
        'width': 900,
        'height': 600,
        'negativeColor': 'black',
        'pieSliceText': 'value',
        'curveType':'function',
        'legend': 'right'
    }
});


dashboard.bind(donutRangeSlider, LineChart);

//Draw the dashboard.
dashboard.draw(datos);
dashboard.draw(datos);
}
