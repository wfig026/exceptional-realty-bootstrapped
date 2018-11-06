<template>
  <b-col class="no-side-pad">
    <b-row class="benefits_details_row no-bottom-pad">
      <b-container fluid class="bottom-margin">
          <b-row>
            <h5>Voluntary Death & Dismemberment Insurance Plan Details</h5>
          </b-row>
          <b-row>
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins" v-for="volDeathDetails in benefit.acf.voluntary_accidental_death.voluntary_death_dismemberment_details" :key="volDeathDetails.columns.column_1">
                <b-row>
                  <b-col v-if="volDeathDetails.is_this_a_title_row" class="benefits-table-header" v-html="volDeathDetails.row_title"></b-col>
                </b-row>
                <b-row>
                  <b-col v-if="!volDeathDetails.is_this_a_title_row" class="benefits-table-col" v-html="volDeathDetails.columns.column_1"></b-col>
                  <b-col v-if="!volDeathDetails.is_this_a_title_row" class="benefits-table-col text-center" v-html="volDeathDetails.columns.column_2"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
        </b-container>
      <b-container fluid>
        <b-row class="top-margin">
          <h5>Voluntary Death & Dismemberment Insurance Rates</h5>
        </b-row>
        <b-row>
          <b-col class="benefits-table-wrap no-side-pad bottom-margin">
            <b-container fluid class="benefits-table-ins vol-death-ins">
              <b-row class="benefits-table-header vol-death-header">
                <b-col class="no-side-pad">
                  Voluntary Accidental Death & Dismemberment (AD&D)
                </b-col>
              </b-row>
              <b-row>
                <b-col class="benefits-table-col border-bottom">Employee</b-col>
                <b-col class="benefits-table-col border-bottom">
                  <span>{{ `$${parseFloat(benefit.acf.voluntary_accidental_death.rate_table.employee_rate).toFixed(2)}` }}</span>
                  <span> / $1,000</span>
                </b-col>
              </b-row>
            </b-container>
            <b-container fluid class="benefits-table-ins vol-death-ins">
              <b-row>
                <b-col class="benefits-table-col">Spouse</b-col>
                <b-col class="benefits-table-col">
                  <span>{{ `$${parseFloat(benefit.acf.voluntary_accidental_death.rate_table.spouse_rate).toFixed(2)}` }}</span>
                  <span> / $1,000</span>
                </b-col>
              </b-row>
            </b-container>
            <b-container fluid class="benefits-table-ins vol-death-ins">
              <b-row>
                <b-col class="benefits-table-col">Children</b-col>
                <b-col class="benefits-table-col">
                  <span>{{ `$${parseFloat(benefit.acf.voluntary_accidental_death.rate_table.child_rate).toFixed(2)}` }}</span>
                  <span> / $1,000</span>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
        </b-row>
        <b-row class="top-margin">
          <b-col class="no-side-pad">
            <h5>Calculate Your Monthly Payment</h5>
            <p style="font-weight: 400;">*Calculate your spouse’s rate based on your age <span style="padding-left: 25px;">**One premium covers all of your eligible children</span></p style="font-weight: 400;">
          </b-col>
        </b-row>
        <b-row class="top-margin benefits_details_row">
          <b-col class="no-side-pad">
            <label class="enrollment-option-container vol-death">
              <input
                type="checkbox"
                name="waive-vol-death"
                :value="true"
                :checked="voluntaryDeathWaived"
                @click="$emit('swap-vol-death-waive', $event)" />
              <span class="checkmark noCost"></span>
              <span class="enrollment-option-label noCost"> Waive Voluntary Accidental Death & Dismemberment Plan</span>
            </label>
          </b-col>
        </b-row>
        <template v-if="!voluntaryDeathWaived">
          <b-row>
            <b-col class="benefits-table-wrap vol-death__calc-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins vol-death__calc">
                <b-row style="background-color: #d9d9d9; font-weight: 400;" class="desktop">
                  <b-col class="benefits-table-col text-center no-side-pad">
                    Plan
                  </b-col>
                  <b-col class="benefits-table-col text-center no-side-pad">
                    Elected Amount
                  </b-col>
                  <b-col class="benefits-table-col text-center no-side-pad" cols="1">
                    
                  </b-col>
                  <b-col class="benefits-table-col text-center no-side-pad" cols="1">
                    Rate
                  </b-col>
                  <b-col class="benefits-table-col text-center no-side-pad">
                    Monthly Amount
                  </b-col>
                </b-row>
              </b-container>
              <b-container fluid class="benefits-table-ins vol-death__calc">
                <b-row>
                  <b-col class="benefits-table-col">
                    <span style="font-weight: 400;">AD&D Cost (Employee)</span>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <b-row class="input-group">
                      <span class="input-dollar-sign">$</span>
                      <input
                        type="number"
                        name="deathPersonalAmount"
                        min="0"
                        :max="benefit.acf.voluntary_life_options.personal_plan_maximum"
                        :step="benefit.acf.voluntary_life_options.personal_plan_step"
                        :value="this.deathPersonalAmount"
                        @input="$emit('change-val', $event)"
                        @blur="handlePersonalChange(benefit.acf.voluntary_life_options.personal_plan_step, benefit.acf.voluntary_life_options.personal_plan_maximum, 'deathPersonalAmount')"/>
                    </b-row>
                  </b-col>
                  <b-col class="benefits-table-col" cols="1">
                    <span>÷ $1,000</span>
                  </b-col>
                  <b-col class="benefits-table-col" cols="1">
                    <span>x {{ `$${parseFloat(benefit.acf.voluntary_accidental_death.rate_table.employee_rate).toFixed(2)}` }}</span>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <span>= {{ this.deathPersonalCost }}</span> / Month
                  </b-col>
                </b-row>
              </b-container>
              <b-container fluid class="benefits-table-ins vol-death__calc">
                <b-row>
                  <b-col class="benefits-table-col">
                    <span style="font-weight: 400;">AD&D Cost (Spouse)</span>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <b-row class="input-group">
                      <span class="input-dollar-sign">$</span>
                      <input
                        type="number"
                        name="deathSpouseAmount"
                        min="0"
                        :max="benefit.acf.voluntary_life_options.spouse_plan_maximum"
                        :step="benefit.acf.voluntary_life_options.spouse_plan_step"
                        :value="this.deathSpouseAmount"
                        @input="$emit('change-val', $event)"
                        @blur="roundAndSetSpouseProp(benefit.acf.voluntary_life_options.spouse_plan_step, benefit.acf.voluntary_life_options.spouse_plan_maximum, 'deathSpouseAmount')" />
                    </b-row>
                  </b-col>
                  <b-col class="benefits-table-col" cols="1">
                    <span>÷ $1,000</span>
                  </b-col>
                  <b-col class="benefits-table-col" cols="1">
                    <span>x {{ `$${parseFloat(benefit.acf.voluntary_accidental_death.rate_table.spouse_rate).toFixed(2)}` }}</span>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <span>= {{ this.deathSpouseCost }}</span> / Month
                  </b-col>
                </b-row>
              </b-container>
              <b-container fluid class="benefits-table-ins vol-death__calc">
                <b-row>
                  <b-col class="benefits-table-col">
                    <span style="font-weight: 400;">AD&D Cost (Children)</span>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <b-row class="input-group">
                      <span class="input-dollar-sign">$</span>
                      <input
                        type="number"
                        name="deathChildrenAmount"
                        min="0"
                        :max="benefit.acf.voluntary_life_options.children_plan_maximum"
                        :step="benefit.acf.voluntary_life_options.children_plan_step"
                        :value="deathChildrenAmount"
                        @input="$emit('change-val', $event)"
                        @blur="roundAndSetProp(benefit.acf.voluntary_life_options.children_plan_step, benefit.acf.voluntary_life_options.children_plan_maximum, 'deathChildrenAmount')" />
                    </b-row>
                  </b-col>
                  <b-col class="benefits-table-col" cols="1">
                    <span>÷ $1,000</span>
                  </b-col>
                  <b-col class="benefits-table-col" cols="1">
                    <span>x {{ `$${parseFloat(benefit.acf.voluntary_accidental_death.rate_table.child_rate).toFixed(2)}` }}</span>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <span>= {{ this.deathChildrenCost }}</span> / Month
                  </b-col>
                </b-row>
              </b-container>
              <b-container fluid class="benefits-table-ins vol-death__calc">
                <b-row>
                  <b-col class="top-margin bottom-margin">
                    <span style="font-weight: 400; margin: 1rem 0 0">AD&D Cost (Total) = <span style="font-weight: 700;">{{ this.deathTotalCost }} / Month</span></span>
                  </b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
        </template>
      </b-container>
    </b-row>
  </b-col>
</template>

<script>
import helpers from '../../helpers/global_funcs.js';

export default {
	name: 'AccidentalDeath',
	props: [
		'benefit',
		'voluntaryDeathWaived',
		'deathPersonalAmount',
		'deathSpouseAmount',
		'deathChildrenAmount',
		'deathPersonalCost',
		'deathSpouseCost',
		'deathChildrenCost',
		'deathTotalCost'
	],
	methods: {
		roundVolProp: helpers.roundVolProp,
    handlePersonalChange: function(step, max, prop) {
      let options = this.benefit.acf.voluntary_life_options;
      this.roundAndSetProp(step, max, prop);
      this.roundAndSetSpouseProp(options.spouse_plan_step, options.spouse_plan_maximum, 'deathSpouseAmount');
    },
		roundAndSetProp: function(step, max, prop) {
			let roundedProp = this.roundVolProp(step, max, this[prop]);
			this.$emit('change-val-auto', { name: prop, value: roundedProp });
		},
    roundAndSetSpouseProp: function(step, max, prop) {
      let spouseMax = Math.min(max, (this.deathPersonalAmount/2));
      let roundedProp = this.roundVolProp(step, spouseMax, this[prop]);
      this.$emit('change-val-auto', { name: prop, value: roundedProp });
    }
	}
}
</script>