<template>
  <div class="off-canvas-benefits_list_wrap">
    <b-container fluid>
      <b-container fluid class="off-canvas-benefits_list_ins">
        <template v-for="benefit in benefits">
          <OffCanvasMenuBenefits
            :benefit="benefit"
            :selectedId="selectedId"
            :key="benefit.acf.abbrev_title"
            @off-canvas-click="offCanvasClicked($event)" />
        </template>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import OffCanvasMenuBenefits from './OffCanvasMenuBenefits';

export default {
  name: 'OffCanvasBenefitsList',
  components: {
    OffCanvasMenuBenefits
  },
  props: ['benefits', 'selectedId'],
  methods: {
    offCanvasClicked: function($id) {
      this.$emit('off-canvas-click', $id);
    }
  }
}
</script>