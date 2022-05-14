/**
 * CLASES
 */
 
/** 
 * Fecha
 * 
 * Nueva clase:
 * const hoy = new Fecha(new Date())
 * 
 * Trabajando con JSON:
 * fecha.JSON => Corrige el método toJSON(), porque devuelve el día y hora locales, pero en el formato JSON (Siempre y cuando no hagas caso a la zona horaria)
 * fecha.aGMT(fecha.hoy).toJSON() => Devuelve el mismo valor que antes
 * fecha.aJSON(fecha.mañana) == fecha.aGMT(fecha.mañana).toJSON() => Lo mismo que antes pero ahora le suma 24 horas
 * 
 */
class Fecha {
  constructor(f) {
    this.fecha = new Date(f);
  }
  get formato() {
	  return { day: '2-digit', month: '2-digit', year: 'numeric'}
  }
  get difMsGMT() {
	  return this.fecha.getTimezoneOffset() * 60 * 1000
  }
  // Devuelve la hora local cuando la GMT sea igual a la hora local actual
  // Si elimino el comando _new Date()_ obtendría el resultado en ms.
  aGMT(d) {
	  return new Date( d.valueOf() - this.difMsGMT )
  }
  //Creo el string JSON con la hora local y no con la UTC
  //Lo consigo restando el _getTimezoneOffset()_ de la fecha actual
  aJSON(d) {
	  return this.aGMT(d).toJSON()
  }
  get JSON() {
	  return this.aGMT(this.fecha.valueOf()).toJSON()
  }
  get UTC() {
	  return this.fecha.toUTCString()
  }
  get dia() {
	  return this.fecha.getUTCDate()
  }
  get mes() {
	  return this.fechaCorta.slice(3, 5)
  }
  get año() {
	  return this.fechaCorta.slice(6, 10)
  }
  aNum(d) {
	let primerDiaAnyo = new Date(d.getFullYear(), 0, 0);
	let segundosHastaFecha = (d - primerDiaAnyo) + ((primerDiaAnyo.getTimezoneOffset() - this.fecha.getTimezoneOffset()) * 60 * 1000);
	let segundosEnUnDia = 1000 * 60 * 60 * 24;
	return Math.floor(segundosHastaFecha / segundosEnUnDia);
  }
  // añade o resta días de la fecha de creación de la clase (this.fecha)
  en(n) {
	let f = new Date(this.fecha.valueOf())
	return new Date( f.setDate(f.getDate() +n) )
  }
  get hoyMs() {
	  return this.fecha.valueOf()
  }
  get hoy() {
	  return this.fecha
  }
  get ayerMs() {
	let d = new Date(this.fecha.valueOf())
	return d.setDate(d.getDate() -1)
  }
  get ayer() {
	return new Date(this.ayerMs)
  }
  get mañanaMs() {
	let d = new Date(this.fecha.valueOf())
	return d.setDate(d.getDate() +1)
  }
  get mañana() {
	return new Date(this.mañanaMs)
  }
  corta(d) {
	  return d.toLocaleDateString('es-ES', this.formato)
  }
  input(d) {
	  return d.toJSON().slice(0, 10)
  }
  aInput(d) {
	  return this.input(this.aGMT(d))
  }
  aDiaMs(d) {
	  let f = new Date(this.fecha.valueOf())
	  return f.setDate(d)
  }
  aDia(d) {
	  let f = new Date(this.fecha.valueOf())
	  return new Date(f.setDate(d))
  }
  cortaAFecha (d) {
	  let arr = d.split('/')
	  return new Date(`${arr[2]}-${arr[1]}-${arr[0]}`)
  }
  cortaAInput (d) {
	  return this.aInput(this.cortaAFecha(d))
  }
  inputACorta (d) {
	  let arr = d.split('-')
	  return `${arr[2]}/${arr[1]}/${arr[0]}`
  }
  esPasado(d) {
	let S = this.cortaAFecha(d)
//  Me interesa que la fecha de hoy devuelva true. En caso contrario dejo esta línea sin comentar
//	S.setDate(S.getDate() -1)
	console.log(this.fecha,d,S)
	return this.fecha < S
  }
}