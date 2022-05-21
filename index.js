/*
 * CONFIGURACION SERVIDOR
 * 
 */

 /*
 * INFO ESTABLECIMIENTO
 */
 
 const Establecimiento = {
  alias: 'White Apartments & Sunrise Suites',
  firebaseDOC: 'WhiteApartments',
  huespedCOL: 'huesped',
}
// ---------------------------------------


 // Define la ruta de inicio para el 'router'
 const rutaInicio = '/'
 
 
/*
 * GESTIÓN USUARIOS
 */
 
  const adminUsersOBJ = {
	info: {
		UID: 'Kd1ZOVY0NNRntrCVlD7LnXr4kbG2',
		correo: 'info@whiteapartments.com'
	},
	gesalojamiento: {
		UID: 'fbOd44zBIZNGg80nuwkIlIK4tqO2',
		correo: 'gesalojamiento@gmail.com'
	}
  }

// Selecciona cual de los usuarios tiene funciones de administrador
  const adminUserUID = adminUsersOBJ.info.UID // Administrador => info

// ------------------------------------------------------



/*
 * ORDEN DE OBJETOS
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

      
      	  
/**
 * FECHAS
 * Genera una nueva clase Fecha() declarada en clases.js
 */

 const fecha = new Fecha(new Date())
 const hoy = fecha.hoy
 const ayer = fecha.ayer


/*
 * HOSPEDERÍAS
 */
 

// Valores de inicio para el formulario ------------------
const valorDeInicio = {
	sexo: 'F',
	nacionalidad: 'ESPAÑA',
	tipoDocumento: 'D',
	provincia: null
}
// -----------------------------

// Valores por defecto en caso de error u omisión --------------
const valorPorDefecto = {
	numIdentificacion: '00000000',
	fNacimiento: '2000-01-01',
	fEntrada: fecha.aInput(ayer),
	fExpedicionDoc: '2021-01-01'
}
// ---------------------------------


/**
 * HERRAMIENTAS
 */


// CADENAS  -------------------------------------------------------------

// Sin tocar las EÑES
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

/* 
// Elimina acentos. Ejemplo: JOSÉ HÄNS PEÑA
// No funciona del todo bien, se puede buscar más info al respecto
const eliminaAcentos = (x) => {
 return x.normalize("NFC").replace(/[\u0300-\u036f]/g, "")	// No ha remplazado nada
 return x.normalize("NFD").replace(/[\u0300-\u036f]/g, "")		// Lo remplaza todo
 return x.normalize("NFKC").replace(/[\u0300-\u036f]/g, "")	// No sustituye nada
 return x.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")	// Lo ha quitado todo
}
 */



// Permite cambiar Ä => AE...
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
    "ANDORRA",
    "AUSTRIA",
    "BELGICA",
    "DINAMARCA",
    "ESLOVAQUIA",
    "ESLOVENIA",
    "ESTONIA",
    "FINLANDIA",
    "FRANCIA",
    "GRECIA",
    "HUNGRIA",
    "ISLANDIA",
    "ITALIA",
    "LETONIA",
    "LIECHTENSTEIN",
    "LITUANIA",
    "LUXEMBURGO",
    "MALTA",
    "MONACO",
    "NORUEGA",
    "PAISES BAJOS",
    "POLONIA",
    "PORTUGAL",
    "REPUBLICA CHECA",
    "SAN MARINO",
    "SUECIA",
    "SUIZA",
    "BULGARIA",
    "CHIPRE",
    "CROACIA",
    "IRLANDA",
    "RUMANIA"
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
    'Gipuzkoa',
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

