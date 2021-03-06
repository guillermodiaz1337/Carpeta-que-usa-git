var app = new Vue({
    el: '#app',
    data: {
        token: '',
        carreras: [],
        materias: [],
        alumnos: [],
        carrera: {
        	nombre: ''
        },
        materia: {
        	nombre: '',
        	carrera: null
        },
        alumno: {
        	nombre: '',
        	apellido: '',
        	legajo: ''
        },
        alumnoMateria: {
            alumnos: [],
            materia: null
        }
    },
    methods: {
        getCarreras() {
            axios.get('http://localhost:1337/carreras', {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(response => {
                this.carreras = response.data;
            });
        },
        getMaterias() {
            axios.get('http://localhost:1337/materias', {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(response => {
                this.materias = response.data;
            });
        },
        getAlumnos() {
            axios.get('http://localhost:1337/alumnos', {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(response => {
                this.alumnos = response.data;
            });
        },
        createCarrera() {
        	let data = {
        		nombre: this.carrera.nombre
        	};

            axios.post('http://localhost:1337/carreras', data, {
            	headers: {
	                Authorization: `Bearer ${this.token}`
	            }
            })
            .then(response => {
                this.carreras.push(response.data);

                this.carrera.nombre = '';
            });
        },
        deleteCarrera(carrera) {
			axios.delete('http://localhost:1337/carreras/' + carrera.id, {
            	headers: {
	                Authorization: `Bearer ${this.token}`
	            }
            })
            .then(response => {
                this.getCarreras();
            });
        },
        createMateria() {
        	let data = {
        		nombre: this.materia.nombre,
        		carrera: this.materia.carrera
        	};

            axios.post('http://localhost:1337/materias', data, {
            	headers: {
	                Authorization: `Bearer ${this.token}`
	            }
            })
            .then(response => {
                this.materias.push(response.data);

                this.materia.nombre = '';
                this.materia.carrera = '';
            });
        },
        deleteMateria(materia) {
			axios.delete('http://localhost:1337/materias/' + materia.id, {
            	headers: {
	                Authorization: `Bearer ${this.token}`
	            }
            })
            .then(response => {
                this.getMaterias();
            });
        },
        createAlumno() {
            let data = {
                nombre: this.alumno.nombre,
                apellido: this.alumno.apellido,
                legajo: this.alumno.legajo
            };

            axios.post('http://localhost:1337/alumnos', data, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(response => {
                this.alumnos.push(response.data);

                this.alumno.nombre = '';
                this.alumno.apellido = '';
                this.alumno.legajo = '';
            });
        },
        deleteAlumno(alumno) {
            axios.delete('http://localhost:1337/alumnos/' + alumno.id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(response => {
                this.getAlumnos();
                this.getMaterias();
            });
        },
        assignAlumnoToMateria() {
            let data = {
                alumnos: this.alumnoMateria.alumnos
            };

            axios.put('http://localhost:1337/materias/' +  this.alumnoMateria.materia, data, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(response => {
                this.getMaterias();

                this.alumnoMateria.alumnos = [];
                this.alumnoMateria.materia = null;
            });
        }
    },
    mounted() {
        axios.post('http://localhost:1337/auth/local', {
            identifier: 'api-user@example.com',
            password: '123456'
        }).then(response => {
        	this.token = response.data.jwt;

        	this.getCarreras();
        	this.getMaterias();
        	this.getAlumnos();
        });
    }
})
