//Elijan de un array de palabras aleatorio
var arreglo = ["Accesibilidad", "Hipopotamo", "Epilepsia", "Esternocloidomastoideo", "Ornitorrinolaringologo", "Zapato"];
var mate = Math.floor((Math.random() * 5) + 1);
var array = mate;
var palabra = arreglo[array];
var hombre, l, espacio;

var Ahorcado = function (con)
{
	this.contexto = con;
	this.maximo = 5;
	this.intentos = 0;
	this.vivo = true;

	this.dibujar();
}
Ahorcado.prototype.dibujar = function ()
{
	var dibujo = this.contexto;

	//Poste
	dibujo.beginPath();
	dibujo.moveTo(150,100);
	dibujo.lineTo(150,50);
	dibujo.lineTo(400,50);
	dibujo.lineTo(400,350);
	dibujo.lineWidth = 15;
	dibujo.strokeStyle = "#000";
	dibujo.stroke();
	dibujo.closePath();

	if(this.intentos > 0)
	{
		//Cara
		dibujo.beginPath();
		dibujo.arc(150, 140, 40, 0, Math.PI * 2, false);
		dibujo.strokeStyle = "red";
		dibujo.lineWidth = 5;
		dibujo.stroke();
		dibujo.closePath();

		if(this.intentos > 1)
		{
			//Cuerpo
			dibujo.beginPath();
			dibujo.moveTo(150,180);
			dibujo.lineTo(150,250);
			dibujo.strokeStyle = "red";
			dibujo.lineWidth = 5;
			dibujo.stroke();
			dibujo.closePath();

			if(this.intentos > 2)
			{
				//Brazos
				dibujo.beginPath();
				dibujo.moveTo(120,220);
				dibujo.lineTo(150,180);
				dibujo.lineTo(180,220);
				dibujo.strokeStyle = "red";
				dibujo.lineWidth = 5;
				dibujo.stroke();
				dibujo.closePath();

				if(this.intentos > 3)
				{
					//Piernas
					dibujo.beginPath();
					dibujo.moveTo(120,290);
					dibujo.lineTo(150,250);
					dibujo.lineTo(180,290);
					dibujo.strokeStyle = "red";
					dibujo.lineWidth = 5;
					dibujo.stroke();
					dibujo.closePath();

					if(this.intentos > 4)
					{
						//Ojos
						dibujo.beginPath();
						//Izquierdo
						dibujo.moveTo(125,120);
						dibujo.lineTo(145,145);
						dibujo.moveTo(145,120);
						dibujo.lineTo(125,145);

						//Derecho
						dibujo.moveTo(155,120);
						dibujo.lineTo(175,145);
						dibujo.moveTo(175,120);
						dibujo.lineTo(155,145);

						dibujo.strokeStyle = "blue";
						dibujo.lineWidth = 5;
						dibujo.stroke();
						dibujo.closePath();
					}
				}
			}

		}

	}
}
Ahorcado.prototype.trazar = function ()
{
	this.intentos++;
	if(this.intentos >= this.maximo)
	{
		this.vivo = false;
		alert("¡Estás muerto!");
	}
	this.dibujar();
}

function iniciar () 
{
	l = document.getElementById("letra");
	var b = document.getElementById("boton");
	var dibujo = document.getElementById("monito");
	dibujo.width = 500;
	dibujo.height = 400;
	var contexto = dibujo.getContext("2d");
	hombre = new Ahorcado(contexto);

	//Convierte a mayúscula un texto
	palabra = palabra.toUpperCase();

	//Declaro un array con n espacios de acuerdo al largo de la palabra
	espacio = new Array(palabra.length);
	
	//Agregamos una función que se dispare al dar click al botón
	b.addEventListener("click", agregarLetra);

	mostrarPista(espacio);

}
function agregarLetra()
{
	var letra = l.value;
	l.value = "";
	mostrarPalabra(palabra, hombre, letra);
}
function mostrarPalabra(palabra, ahorcado, letra)
{
	var encontrado = false;
	var p;
    
    var palabrota;
    
	letra = letra.toUpperCase();
	for(p in palabra)
	{	
		if(letra == palabra[p])
		{
			espacio[p] = letra;
			encontrado = true;
		}
	}
	mostrarPista(espacio);

	//Si NO lo encontré
	if(!encontrado)
	{
		ahorcado.trazar();
	}

	if(!ahorcado.vivo)
	{
		palabrota = document.getElementById("pista");
        palabrota.innerHTML = palabra;
	}

}
function mostrarPista(espacio)
{
	var pista = document.getElementById("pista");
	var texto = "";
	var i;
	var largo = espacio.length;

	for(i = 0; i<largo; i++)
	{
		if(espacio[i] != undefined)
		{
			texto = texto + espacio[i] + " ";
		}
		else
		{
			texto += "_ ";
		}
	}
	pista.innerText = texto;
}








