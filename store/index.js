/*
 * CONFIGURACION SERVIDOR
 * 
 */
 
 // Permite volver desde el módulo a la raiz desde donde accedo a los otros módulos
 const rutaInicio = '/dev'
 
 
/*
 * 
 * GESTIÓN USUARIOS
 * 
 */
 
  const adminUsersOBJ = {
	info: {
		UID: 'R1DlXD7tg7S3SUQUKjSbIRloLw43',
		correo: 'info@whiteapartments.com'
	},
	gesalojamiento: {
		UID: '8zrl5OqK5nStXN4qGa3upkrZEOD3',
		correo: 'gesalojamiento@gmail.com'
	}
  }
  
  const adminUserUID = adminUsersOBJ.info.UID	// from './store/index.js'

// ------------------------------------------------------

/*
 * 
 * INFO ESTABLECIMIENTO
 * 
 */
 

  const Establecimiento = {
	  alias: 'White Apartments & Sunrise Suites'
  }
  
   
// ---------------------------------------

/*
 * ORDEN DE OBJETOS
 * 
 */
 
 function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

/*
 * 
 * FECHAS
 * 
 */
 
const fechaFormato = { day: '2-digit', month: '2-digit', year: 'numeric'}

	let d = new Date().toISOString().slice(0, 10)
	console.log({d})

const fechaInput = (d) => {
	return d.toISOString().slice(0, 10)
}

const fechaES = (d) => {
	return d.toLocaleDateString('es-ES', fechaformato)
}

const ayerInput = () => {
	let x = new Date()
	x.setDate(x.getDate() -1)
	return fechaInput(x)
}

const fechaAyer = () => {
  let x = new Date()
  x.setDate(x.getDate() -1)
  return x.toLocaleDateString('es-ES', fechaFormato)
}

const fechaHoy = () => {
	let x = new Date()
	return x.toLocaleDateString('es-ES', fechaFormato)
}

const fechaEsPasado = (x) => {
	let z = x.split('/')
	z = `${z[2]}/${z[1]}/${z[0]}`
	let d = new Date(z)
	let S = new Date()
	S.setDate(S.getDate() -1)
	console.log(d,S)
	return d < S
}

const fechaInternacional = (d) => {
	return d.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
}

//var now = new Date();
//var start = new Date(now.getFullYear(), 0, 0);
//var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
//var oneDay = 1000 * 60 * 60 * 24;
//var day = Math.floor(diff / oneDay);
//console.log('Day of year: ' + day);

const diaDelAnyo = (d) => {
	var start = new Date(d.getFullYear(), 0, 0);
	var diff = (d - start) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
	var oneDay = 1000 * 60 * 60 * 24;
	return Math.floor(diff / oneDay);
}
//---------------------------------------------------------


/*
 * 
 * HOSPEDERÍAS
 * 
 */
 
// Valores de Inicio ---------------------------------------
const valorDeInicio = {
	sexo: 'M',
	nacionalidad: 'ESPAÑA',
	tipoDocumento: 'D',
	provincia: null
}
// ------------------------------

/*
 * 
 * DATOS
 * 
 * No estoy seguro de si esto me servirá
 * Se carga al principio, pero de manera síncrona por lo que si llamo al registro desde otro lado antes de que cargue no me sirve
 * Además no es _reactivo_, si se modifica la base de datos no se actualiza.
 * 
 */
 
 	let registrosHuespedes = []

	try {
	
	cargaHuespedes((querySnapshot) => {
		querySnapshot.forEach((doc) => {
				registrosHuespedes.push({ id: doc.id,
                            ...doc.data()
                })
        })
        console.log( { registrosHuespedes } )
      })
     } catch(e) {
		 console.log(e)
	 }
      
// Filtros para campos de texto ----------------------------

// Sin tocar las EÑES
// FUNCIONA!!
var eliminaAcentos = (function () {
  var in_chrs   = 'àáâãäçèéêëìíîïòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝ',
      out_chrs  = 'aaaaaceeeeiiiiooooouuuuyyAAAAACEEEEIIIIOOOOOUUUUY', 
      chars_rgx = new RegExp('[' + in_chrs + ']', 'g'),
      transl    = {}, i,
      lookup    = function (m) { return transl[m] || m; };

  for (i=0; i<in_chrs.length; i++) {
    transl[ in_chrs[i] ] = out_chrs[i];
  }

  return function (s) { return s.replace(chars_rgx, lookup); }
})();


// Limpia cadena eliminando signos de puntuación y espacios en blanco
const limpiaCadena = (x) => {
  // Elimina [., :-/]
  return x.split(/[.,:\/\\ -]/).join('')
}

//const eliminaAcentos = (x) => {
  // Elimina acentos. Ejemplo: JOSÉ HÄNS PEÑA
//  return x.normalize("NFC").replace(/[\u0300-\u036f]/g, "")	// No ha remplazado nada
//  return x.normalize("NFD").replace(/[\u0300-\u036f]/g, "")		// Lo remplaza todo
//  return x.normalize("NFKC").replace(/[\u0300-\u036f]/g, "")	// No sustituye nada
//  return x.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")	// Lo ha quitado todo
//}

// Otra opción
// Me permitiría cambiar Ä => AE...
function quitarAcentos(cadena){
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}

// ESTA TAMBIÉN ME GUSTA:
function accentFold(inStr) {
  return inStr.replace(
    /([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g, 
    function (str, a, c, e, i, n, o, s, u, y, ae) {
      if (a) return 'a';
      if (c) return 'c';
      if (e) return 'e';
      if (i) return 'i';
      if (n) return 'n';
      if (o) return 'o';
      if (s) return 's';
      if (u) return 'u';
      if (y) return 'y';
      if (ae) return 'ae';
    }
  );
}
//----------------------------------------------------------------------

// Listas

  //íses de la UE y asimilados
  // Pendiente de terminar
  const paisesArrEU = [
    "ALEMANIA",
    "AUSTRIA",
    "SUIZA",
    "FRANCIA",
    "PORTUGAL",
    "ITALIA",
    "PAISES BAJOS",
    "LUXEMBURGO",
    "BELGICA",
    "RUMANIA",
  ]
  // Se muestra solo a españoles
  const documentosObjES = {
    "D": "DNI",
    "P": "PASAPORTE",
    "C": "PERMISO CONDUCIR ESPAÑOL"
  }
  // Se muestra sólo a nacionalizados dentro de la UE
  const documentosObjEU = {
    "P": "PASAPORTE",
    "I": "DOCUMENTO DE IDENTIDAD DE LA UE",
    "N": "NIE O TARJETA ESPAÑOLA DE EXTRANJEROS"
  }
  // Se muestra a todos menos a los españoles
  const documentosObjOtros = {
    "P": "PASAPORTE",
    "N": "NIE O TARJETA ESPAÑOLA DE EXTRANJEROS",
    "X": "PERMISO DE RESIDENCIA DE ESTADO MIEMBRO DE LA UE"
  }
  const regionesES = [
	"Andalucí­a",
	"Aragón",
	"Principado de Asturias",
	"Islas Baleares",
	"País Vasco",
	"Canarias",
	"Cantabria",
	"Castilla-La Mancha",
	"Castilla y León",
	"CataluÃña",
	"Extremadura",
	"Galicia",
	"Comunidad de Madrid",
	"Región de Murcia",
	"Comunidad Foral de Navarra",
	"La Rioja",
	"Comunidad Valenciana",
	"Ceuta",
	"Melilla"
  ]
  
  
  const provinciasES = [
    'Álava',
    'Albacete',
    'Alicante/Alacant',
    'Almería',
    'Asturias',
    'Ávila',
    'Badajoz',
    'Barcelona',
    'Bizkaia',
    'Burgos',
    'Cáceres',
    'Cádiz',
    'Cantabria',
    'Castellón/Castelló',
    'Ceuta',
    'Ciudad Real',
    'Córdoba',
    'Cuenca',
    'Girona',
    'Las Palmas',
    'Granada',
    'Guadalajara',
    'Ghipuzkoa',
    'Huelva',
    'Huesca',
    'Illes Balears',
    'Jaén',
    'A Coruña',
    'La Rioja',
    'León',
    'Lleida',
    'Lugo',
    'Madrid',
    'Málaga',
    'Melilla',
    'Murcia',
    'Navarra',
    'Ourense',
    'Palencia',
    'Pontevedra',
    'Salamanca',
    'Segovia',
    'Sevilla',
    'Soria',
    'Tarragona',
    'Santa Cruz de Tenerife',
    'Teruel',
    'Toledo',
    'Valencia/Valéncia',
    'Valladolid',
    'Zamora',
    'Zaragoza',
  ]

  const paisesArr = [
    "AFGANISTAN",
    "AFRICA",
    "ALBANIA",
    "ALEMANIA",
    "AMERICA",
    "ANDORRA",
    "ANGOLA",
    "ANTIGUA BARBUDA",
    "ANTILLAS NEERLANDESAS",
    "APATRIDA",
    "ARABIA SAUDITA",
    "ARGELIA",
    "ARGENTINA",
    "ARMENIA",
    "ARUBA",
    "ASIA",
    "AUSTRALIA",
    "AUSTRIA",
    "AZERBAYAN",
    "BAHAMAS",
    "BAHREIN",
    "BANGLADESH",
    "BARBADOS",
    "BELGICA",
    "BELICE",
    "BHUTAN",
    "BIELORRUSIA",
    "BOLIVIA",
    "BOSNIA HERZEGOVINA",
    "BOTSWANA",
    "BRASIL",
    "BRUNEI",
    "BULGARIA",
    "BURKINA FASO",
    "BURUNDI",
    "CABO VERDE",
    "CAMBOYA",
    "CAMERUN",
    "CANADA",
    "CEI",
    "CHAD",
    "CHECOSLOVAQUIA",
    "CHILE",
    "CHINA",
    "CHIPRE",
    "COLOMBIA",
    "COMORES",
    "COREA NORTE",
    "COREA SUR",
    "COSTA MARFIL",
    "COSTA RICA",
    "CROACIA",
    "CUBA",
    "CURAÇAO",
    "DINAMARCA",
    "DJIBOUTI",
    "DOMINICA",
    "ECUADOR",
    "EGIPTO",
    "EMIRATOS ARABES UNIDOS",
    "ERITREA",
    "ESLOVAQUIA",
    "ESLOVENIA",
    "ESPAÑA",
    "ESTADOS FEDERADOS MICRONESIA",
    "ESTADOS UNIDOS AMERICA",
    "ESTONIA",
    "ETIOPIA",
    "EUROPA",
    "FERNANDO POO",
    "FIDJI",
    "FILIPINAS",
    "FINLANDIA",
    "FRANCIA",
    "GABON",
    "GAMBIA",
    "GEORGIA",
    "GHANA",
    "GRECIA",
    "GUATEMALA",
    "GUINEA",
    "GUINEA BISSAU",
    "GUINEA ECUATORIAL",
    "GUYANA",
    "HAITI",
    "HONDURAS",
    "HONG KONG CHINO",
    "HUNGRIA",
    "IFNI",
    "INDIA",
    "INDONESIA",
    "IRAK",
    "IRAN",
    "IRLANDA",
    "ISLANDIA",
    "ISLAS MARIANAS NORTE",
    "ISLAS MARSHALL",
    "ISLAS SALOMON",
    "ISRAEL",
    "ITALIA",
    "JAMAICA",
    "JAPON",
    "JORDANIA",
    "KAZAJSTAN",
    "KENIA",
    "KIRIBATI",
    "KUWAIT",
    "LAOS",
    "LESOTHO",
    "LETONIA",
    "LIBANO",
    "LIBERIA",
    "LIBIA",
    "LIECHTENSTEIN",
    "LITUANIA",
    "LUXEMBURGO",
    "MACAO",
    "MACEDONIA",
    "MADAGASCAR",
    "MALASIA",
    "MALAWI",
    "MALDIVAS",
    "MALI",
    "MALTA",
    "MARRUECOS",
    "MAURICIO",
    "MAURITANIA",
    "MEXICO",
    "MOLDAVIA",
    "MONACO",
    "MONGOLIA",
    "MONTENEGRO",
    "MOZAMBIQUE",
    "MYANMAR",
    "NAMIBIA",
    "NAURU",
    "NEPAL",
    "NICARAGUA",
    "NIGER",
    "NIGERIA",
    "NORUEGA",
    "NUEVA ZELANDA",
    "OCEANIA",
    "OMAN",
    "PAISES BAJOS",
    "PAKISTAN",
    "PALESTINA",
    "PANAMA",
    "PAPUA NUEVA GUINEA",
    "PARAGUAY",
    "PERU",
    "POLONIA",
    "PORTUGAL",
    "PUERTO RICO",
    "QATAR",
    "REINO UNIDO",
    "REPUBLICA BENIN",
    "REPUBLICA CENTROAFRICANA",
    "REPUBLICA CHECA",
    "REPUBLICA CONGO",
    "REPUBLICA DEMOCRATICA CONGO",
    "REPUBLICA DOMINICANA",
    "REPUBLICA GRANADA",
    "REPUBLICA KIRGUISTAN",
    "REPUBLICA SUDAN SUR",
    "RIO MUNI",
    "RUANDA",
    "RUMANIA",
    "RUSIA",
    "SAHARA",
    "SAINT KITTS NEVIS",
    "SALVADOR",
    "SAMOA OCCIDENTAL",
    "SAN MARINO",
    "SAN MARTIN",
    "SAN VICENTE GRANADINAS",
    "SANTA LUCIA",
    "SANTA SEDE",
    "SANTO TOME PRINCIPE",
    "SENEGAL",
    "SERBIA",
    "SEYCHELLES",
    "SIERRA LEONA",
    "SINGAPUR",
    "SIRIA",
    "SOMALIA",
    "SRI LANKA",
    "SUDAFRICA",
    "SUDAN",
    "SUDAN SUR",
    "SUECIA",
    "SUIZA",
    "SURINAM",
    "SWAZILANDIA",
    "TADJIKISTAN",
    "TAILANDIA",
    "TAIWAN TAIPEI",
    "TANZANIA",
    "TIMOR ORIENTAL",
    "TOGO",
    "TONGA",
    "TRINIDAD TOBAGO",
    "TUNEZ",
    "TURKMENISTAN",
    "TURQUIA",
    "TUVALU",
    "UCRANIA",
    "UGANDA",
    "UNION EUROPEA",
    "URUGUAY",
    "UZBEKISTAN",
    "VANUATU",
    "VENEZUELA",
    "VIETNAM",
    "YEMEN",
    "YUGOSLAVIA",
    "ZAMBIA",
    "ZIMBABWE"
  ]

