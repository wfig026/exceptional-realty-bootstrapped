<template>
	<b-row
		class="off-canvas-benefits_list_item"
		v-bind:class="{ active: benefit.id === selectedId }"
		@click="$emit('off-canvas-click', benefit.id)"
		v-if="benefit.acf.additional_details == true">
	  <b-container fluid class="off_canvas_menu-ins">
	    <b-row>
	      <b-col class="off_canvas_menu-item-wrap">
	        <span class="off_canvas_menu-item">{{ benefit.acf.abbrev_title != '' ? benefit.acf.abbrev_title : benefit.title.rendered }}</span>
	      </b-col>
	    </b-row>
	  </b-container>
  </b-row>
</template>

<script>
export default {
	name: 'OffCanvsMenuDetails',
	props: ['benefit', 'selectedId']
}
</script>
