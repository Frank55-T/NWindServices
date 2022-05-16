
fetch("https://localhost:7153/api/Employees/Top5")
    .then(response => response.json())
    .then(data => {
        cargarTabla(data);
        
        // Load the Visualization API and the corechart package.
        google.charts.load('current', { 'packages': ['corechart'] });

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(()=>{cargarChart(data)});

    });


function cargarTabla(data) {
    console.log(data)
    var tabla = document.getElementById("tabla");


    data.forEach(element => {
        var fila = document.createElement("tr");
        var nombres = document.createElement("td");
        var valores = document.createElement("td");
        console.log(element.empleado);
        nombres.innerHTML = element.empleado;
        valores.innerHTML = element.ventas;

        fila.append(nombres);
        fila.append(valores);

        tabla.append(fila);
    });
}

function cargarChart(data) {
    var datos = new google.visualization.DataTable();
    //data.addColumn('string', 'Trimestre');
    datos.addColumn('string', 'empleado');
    datos.addColumn('number', 'ventas');
    data.forEach((row)=>{
        console.log(typeof(row));
        datos.addRow([ row.empleado, row.ventas]);
    });
    var options = {
        'title': 'Top 5 empleados con más ventas',
        'width': 600,
        'height': 300
    };
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(datos, options);
}
