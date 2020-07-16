var token = '';
$(document).ready(function() {
	$.ajax({
		url: "http://192.168.0.34:1337/auth/local",
		method: "POST",
		data: {
            identifier: 'api-user@example.com',
            password: '123456'
        },
		success: function(response) {
			//console.log(response);
			token = response.jwt;
			initChart();
		},
		error: function(req, status, err) {
			showErrorStrapi();
		}
	});
});

function initChart() {
    // Load the Visualization API and the corechart package.
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);
	google.charts.setOnLoadCallback(drawChart2);
	$.ajax({
		url: "http://192.168.0.34:1337/materias/1",
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`
		},
		dataType: "json",
		success: function(response) {
			materiacantidad(response.alumnos.length);
		},
		error: function(req, status, err) {
			showErrorStrapi();
		}
	});
	
	$.ajax({
		url: "http://192.168.0.34:1337/materias",
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`
		},
		dataType: "json",
		success: function(response) {
			drawChart2(response);	
			materiaslista(response);
			drawChart();
	
			
		},
		error: function(req, status, err) {
			showErrorStrapi();
		}
	});
};




function showErrorStrapi() {
	var html = '<div style="color: #F00">Ha ocurrido un error al traer la información de Strapi. </div>';

	$("#cantmat").html(html);
}


function drawChart() {

      	  
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        
		
		data.addRows([
          [" Mushrooms", 3],
          ["Onions", 1],
          ["Olives", 1],
          ["Zucchini", 1],
          ["Pepperoni", 2]
        ]);
		
        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':500,
                       'height':400};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chartoriginal'));
        chart.draw(data, options);
}



function materiacantidad(cantidad) {
	var html = '<ul>';

	
	html += '<li>' + cantidad + '</li>';
	

	html += '</ul>';
	//console.log(cantidad);
	$("#cantmat").html(html);
}



function materiaslista(materias) {
	var html = '<ul>';

	
	for (materia in materias) {
		html += '<li>' + materias[materia].nombre + ': ' + materias[materia].alumnos.length + '</li>';
	}
	

	html += '</ul>';
	//console.log(materias);
	$("#listamateria").html(html);
}


function drawChart2(materias) {
	  
        // Create the data table.
        var data2 = new google.visualization.DataTable();
        data2.addColumn('string', 'Topping');
        data2.addColumn('number', 'Cantidad de Alumnos');
		
		for (materia in materias) {
		data2.addRow([materias[materia].nombre, materias[materia].alumnos.length ]) ;
		}
		
				
        // Set chart options
        var options = {'title':'Cantidad de alumnos por materia',
                       'width':500,
                       'height':400};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chartbar_materias'));
		chart.draw(data2, options);
		
		var chart = new google.visualization.PieChart(document.getElementById('chartpie_materias'));
		chart.draw(data2, options);
		
		
		

}
