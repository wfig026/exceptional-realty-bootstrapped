<template>
	<b-row
		class="benefits_list_item"
		v-bind:class="{ active: benefit.id === selectedId }"
		@click="$emit('side-click', benefit.id)"
    v-if="benefit.acf.additional_details == false">
	  <b-container fluid class="benefits_list_item-ins">
	    <b-row>
	      <b-col class="benefit_type-wrap" cols="9">
          <b-container fluid>
            <b-row>
              <b-col cols="1" class="benefit-icon no-side-pad">
                <span>
                  <img :src="findIconSrc(benefit)" />
                </span>
              </b-col>
              <b-col cols="11" class="benefit-name no-right-pad">
                <h5>{{ benefit.acf.abbrev_title != '' ? benefit.acf.abbrev_title : benefit.title.rendered }}</h5>
                <template v-if="benefit.acf.provided_by_cquence === true">
                  Provided by CQuence
                </template>
                <template v-else>
	                <span class="benefit_type" v-html="findTitle(benefit, '<br/>', hospitalIndemnity, criticalIllness, accidentInsurance, volLifeLabel, deathLabel, voluntaryLifeWaived, voluntaryDeathWaived, fsaWaived, fsaEmp, fsaFam)"></span>
                </template>
              </b-col>
            </b-row>
          </b-container>
	      </b-col>
	      <b-col class="benefit_cost-wrap" cols="3">
          <span class="benefit_cost">{{ findCost(benefit, voluntaryTotal, voluntaryTotalCost, deathTotalCost, voluntaryLifeWaived, voluntaryDeathWaived, fsaTotal) }}</span>
	      </b-col>
	    </b-row>
	  </b-container>
  </b-row>
</template>

<script>
import unfilledIcon from '../assets/cq-icon-election-unfilled.svg';
import singleIcon from '../assets/cq-icon-election-single.svg';
import coupleIcon from '../assets/cq-icon-election-couple.svg';
import familyIcon from '../assets/cq-icon-election-family.svg';
import waivedIcon from '../assets/cq-icon-election-waived.svg';
import helpers from '../helpers/global_funcs.js';

export default {
	name: 'BenefitSideview',
  props: [
    'benefit',
    'selectedId',
    'fsaTotal',
    'fsaEmp',
    'fsaFam',
    'fsaWaived',
    'voluntaryTotal',
    'accidentInsurance',
    'criticalIllness',
    'hospitalIndemnity',
    'importantNotices', 
    'isTotalWrapOpen', 
    'voluntaryLifeWaived', 
    'voluntaryTotalCost',
    'volLifeLabel',
    'voluntaryDeathWaived',
    'deathTotalCost',
    'deathLabel'
  ],
  data: function() {
    return {
      unfilledIcon,
      singleIcon,
      coupleIcon,
      familyIcon,
      waivedIcon
    }
  },
  methods: {
    findCost: helpers.findCost,
    findTitle: helpers.findTitle,
    findIconSrc: function(benefit) {
      var type;
      if (benefit.acf.specialized_option_plan_to_use === 'voluntary_plans') {
        var labels = [this.hospitalIndemnity.plan_label, this.accidentInsurance.plan_label];
        if (labels.indexOf('Employee') > -1 || this.criticalIllness.type === 'ee') {
          type = singleIcon;
        } else if (labels.indexOf('Family') > -1 || labels.indexOf('Employee and Child(ren)') > -1 || (this.criticalIllness.type === 'eech' || this.criticalIllness.type === 'fam') && !this.criticalIllness.waived) {
          type = familyIcon;
        } else if (labels.indexOf('Employee and Spouse') > -1 || (this.criticalIllness.type === 'eesp' && !this.criticalIllness.waived)) {
          type = coupleIcon;
        } else if (labels.indexOf('Waive') > -1 || this.criticalIllness.waived) {
          type = waivedIcon;
        } else {
          type = unfilledIcon;
        }
      } else if (benefit.acf.benefit_type === 'fsa') {
        if (this.fsaWaived) {
          type = waivedIcon;
        } else if (parseFloat(this.fsaFam) != 0) {
          type = familyIcon;
        } else if (parseFloat(this.fsaEmp) != 0) {
          type = singleIcon;
        } else {
          type = unfilledIcon;
        }
      } else if (benefit.acf.benefit_type === 'disability') {
        type = singleIcon;
      } else if (benefit.acf.benefit_type === 'life-insurance' || benefit.acf.benefit_type === 'employee-assistance-program') {
        type = familyIcon;
      } else if (benefit.acf.benefit_type === 'additional-benefits') {
        type = coupleIcon;
      } else {
        if (benefit.acf.benefit_type === 'voluntary-accidental-death-dismemberment') {
          var label = this.deathLabel;
        } else if (benefit.acf.benefit_type === 'voluntary-life-insurance') {
          var label = this.volLifeLabel;
        } else {
          var label = benefit.selectedPlan.plan_label;
        }
        if ((this.voluntaryLifeWaived && benefit.acf.benefit_type === 'voluntary-life-insurance') || (this.voluntaryDeathWaived && benefit.acf.benefit_type === 'voluntary-accidental-death-dismemberment')) {
          type = waivedIcon;
        } else if (!label || label === '') {
          type = unfilledIcon;
        } else if (label === 'Employee' || label === 'Personal') {
          type = singleIcon;
        } else if (['Family', 'Employee / Child(ren)', 'Personal / Child(ren)', 'Personal / Spouse / Child(ren)', 'Child(ren)'].indexOf(label) > -1) {
          type = familyIcon;
        } else if (label === 'Employee / Spouse' || label === 'Personal / Spouse' || label === 'Spouse') {
          type = coupleIcon;
        } else if (label === 'Waive') {
          type = waivedIcon;
        }
      }
      return type;
    }
  }
}
</script>