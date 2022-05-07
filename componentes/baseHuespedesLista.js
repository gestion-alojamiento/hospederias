const baseHuespedesLista = {
  template: `
	<table class="styled-table">
    <thead>
        <tr>
			<th>Entrada</th>
            <th>Nombre</th>
            <th>Apellidos</th>
			<th>Nacionalidad</th>
			<th>Documento</th>
			<th># Hab.</th>
			<th>Reserva</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="{id, fEntrada, nombre, apellido1, apellido2, nacionalidad, tipoDocumento, numIdentificacion, habitacionID, reservaID, subido} in data">
            <td>{{ fEntrada }}</td>
            <td>{{ nombre }}</td>
			<td>{{ apellido1, apellido2 }}</td>
			<td>{{ nacionalidad }}</td>
			<td>{{ tipoDocumento }}: {{ numIdentificacion }}</td>
			<td>{{ habitacionID }}</td>
			<td>{{ reservaID }}</td>
        </tr>
        <!-- and so on... -->
    </tbody>
    </table>
  `,
  props: {
    data: {
      type: Array,
      default: ''
    }
  },
  setup(props) {
	  
	
  }
}
