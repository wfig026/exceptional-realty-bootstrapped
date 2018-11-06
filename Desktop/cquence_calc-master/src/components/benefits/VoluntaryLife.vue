<template>
  <b-col class="no-side-pad">
    <b-row class="benefits_details_row no-bottom-pad">
      <b-container fluid class="bottom-margin">
        <b-row>
            <h5>Voluntary Life Insurance Plan Details</h5>
          </b-row>
          <b-row>
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins" v-for="volLifeDetails in benefit.acf.voluntary_life_insurance.vol_life_details" :key="volLifeDetails.columns.column_1">
                <b-row>
                  <b-col v-if="volLifeDetails.is_this_a_title_row == true" class="benefits-table-header" v-html="volLifeDetails.row_title"></b-col>
                </b-row>
                <b-row>
                  <b-col v-if="volLifeDetails.is_this_a_title_row == false" class="benefits-table-col" v-html="volLifeDetails.columns.column_1"></b-col>
                  <b-col v-if="volLifeDetails.is_this_a_title_row == false" class="benefits-table-col text-center" v-html="volLifeDetails.columns.column_2"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
        </b-container>
      <b-container fluid>
        <b-row class="top-margin">
          <b-col class="no-side-pad">
            <h5>Calculate Your Monthly Payment</h5>
            <p style="font-weight: 400;">*Calculate your spouse’s rate based on your age <span style="padding-left: 25px;">**One premium covers all of your eligible children</span></p style="font-weight: 400;">
          </b-col>
        </b-row>
        <b-row class="top-margin benefits_details_row">
          <b-col class="no-side-pad">
            <label class="enrollment-option-container vol-life">
              <input
                type="checkbox"
                name="waive-vol-life"
                :value="true"
                :checked="voluntaryLifeWaived"
                @click="$emit('swap-vol-life-waive', $event)" />
              <span class="checkmark noCost"></span>
              <span class="enrollment-option-label noCost"> Waive Voluntary Life Plan</span>
            </label>
          </b-col>
        </b-row>
        <template v-if="!voluntaryLifeWaived">
          <b-row>
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins vol-life-ins__calc">
                <b-row style="background-color: #d9d9d9; font-weight: 400;" class="desktop">
                  <b-col class="benefits-table-col text-center" style="padding-left: 0;">
                    Plan
                  </b-col>
                  <b-col class="benefits-table-col text-center">
                    Elected Amount
                  </b-col>
                  <b-col class="benefits-table-col text-center" cols="1">
                    
                  </b-col>
                  <b-col class="benefits-table-col text-center">
                    Rate (Age)
                  </b-col>
                  <b-col class="benefits-table-col text-center" style="padding-right: 0;">
                    Monthly Amount
                  </b-col>
                </b-row>
              </b-container>
              <b-container fluid class="benefits-table-ins vol-life-ins__calc">
                <b-row>
                  <b-col class="benefits-table-col">
                    <p>Voluntary Life Cost (Personal)</p>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <b-row class="input-group">
                      <span class="input-dollar-sign">$</span>
                      <input
                        type="number"
                        name="voluntaryPersonalAmount"
                        min="0"
                        :max="benefit.acf.voluntary_life_options.personal_plan_maximum"
                        :step="benefit.acf.voluntary_life_options.personal_plan_step"
                        :value="voluntaryPersonalAmount"
                        @input="$emit('change-val', $event)"
                        @blur="handlePersonalChange(benefit.acf.voluntary_life_options.personal_plan_step, benefit.acf.voluntary_life_options.personal_plan_maximum, 'voluntaryPersonalAmount')" />
                    </b-row>
                  </b-col>
                  <b-col class="benefits-table-col" cols="1">
                    <span>÷ $10,000</span>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <span class="span-nowrap">
                      <span>x </span>
                      <select
                        name="voluntaryPersonalRate"
                        :value="voluntaryPersonalRate"
                        @change="$emit('change-val', $event)">
                        <option disabled value="false">Select Rate (Age)</option>
                        <template v-for="row in benefit.acf.voluntary_life_insurance.rate_table">
                          <option :value="row.personal_rate">{{ `$${ parseFloat(row.personal_rate).toFixed(2) } (${ createAgeRangeStr(row.age_minimum, row.age_maximum) })` }}</option>
                        </template>
                      </select>
                    </span>
                    <p style="font-size: 1rem; font-style: italic;">See rate table</p>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <span>= {{ voluntaryPersonalCost }}</span> / Month
                  </b-col>
                </b-row>
              </b-container>
              <b-container fluid class="benefits-table-ins vol-life-ins__calc">
                <b-row>
                  <b-col class="benefits-table-col">
                    <p>Voluntary Life Cost (Spouse)</p>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <b-row class="input-group">
                      <span class="input-dollar-sign">$</span>
                      <input
                        type="number"
                        name="voluntarySpouseAmount"
                        min="0"
                        :max="benefit.acf.voluntary_life_options.spouse_plan_maximum"
                        :step="benefit.acf.voluntary_life_options.spouse_plan_step"
                        :value="voluntarySpouseAmount"
                        @input="$emit('change-val', $event)"
                        @blur="roundAndSetSpouseProp(benefit.acf.voluntary_life_options.spouse_plan_step, benefit.acf.voluntary_life_options.spouse_plan_maximum, 'voluntarySpouseAmount')" />
                    </b-row>
                  </b-col>
                  <b-col class="benefits-table-col" cols="1">
                    <span>÷ $10,000</span>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <span class="span-nowrap">
                      <span>x </span>
                      <select
                        name="voluntarySpouseRate"
                        :value="voluntarySpouseRate"
                        @change="$emit('change-val', $event)">
                        <option disabled value="false">Select Rate (Age)</option>
                        <template v-for="row in benefit.acf.voluntary_life_insurance.rate_table"> 
                          <option :value="row.rate_including_spouse">{{ `$${ parseFloat(row.rate_including_spouse).toFixed(2) } (${ createAgeRangeStr(row.age_minimum, row.age_maximum) })` }}</option>
                        </template>
                      </select>
                    </span>
                    <p style="font-size: 1rem; font-style: italic;">See rate table</p>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <span>= {{ voluntarySpouseCost }}</span> / Month
                  </b-col>
                </b-row>
              </b-container>
              <b-container fluid class="benefits-table-ins vol-life-ins__calc">
                <b-row>
                  <b-col class="benefits-table-col">
                    <p>Voluntary Life Cost (Children)</p>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <b-row class="input-group">
                      <span class="input-dollar-sign">$</span>
                      <input
                        type="number"
                        name="voluntaryChildAmount"
                        min="0"
                        :max="benefit.acf.voluntary_life_options.children_plan_maximum"
                        :step="benefit.acf.voluntary_life_options.children_plan_step"
                        :value="voluntaryChildAmount"
                        @input="$emit('change-val', $event)"
                        @blur="roundAndSetProp(benefit.acf.voluntary_life_options.children_plan_step, benefit.acf.voluntary_life_options.children_plan_maximum, 'voluntaryChildAmount')" />
                    </b-row>
                  </b-col>
                  <b-col class="benefits-table-col" cols="1">
                    <span>÷ $1,000</span>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <span class="span-nowrap">x {{ parseFloat(benefit.acf.voluntary_life_insurance.rate_for_children).toFixed(2) }}</span>
                  </b-col>
                  <b-col class="benefits-table-col">
                    <span>= {{ voluntaryChildCost }}</span> / Month
                  </b-col>
                </b-row>
              </b-container>
              <b-container fluid class="benefits-table-ins vol-life-ins__calc">
                <b-row>
                  <b-col class="top-margin bottom-margin">
                    <span style="font-weight: 400; margin: 1rem 0 0">Voluntary Life Cost Total = <span style="font-weight: 700;">{{ voluntaryTotalCost }} / Month</span></span>
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
  name: 'VoluntaryLife',
  props: [
    'benefit',
    'voluntaryLifeWaived',
    'voluntaryPersonalAmount',
    'voluntarySpouseAmount',
    'voluntaryChildAmount',
    'voluntaryPersonalRate',
    'voluntarySpouseRate',
    'voluntaryChildRate',
    'voluntaryPersonalCost',
    'voluntarySpouseCost',
    'voluntaryChildCost',
    'voluntaryTotalCost'
  ],
  methods: {
    createAgeRangeStr: helpers.createAgeRangeStr,
    roundVolProp: helpers.roundVolProp,
    handlePersonalChange: function(step, max, prop) {
      let options = this.benefit.acf.voluntary_life_options;
      this.roundAndSetProp(step, max, prop);
      this.roundAndSetSpouseProp(options.spouse_plan_step, options.spouse_plan_maximum, 'voluntarySpouseAmount');
    },
    roundAndSetProp: function(step, max, prop) {
      let roundedProp = this.roundVolProp(step, max, this[prop]);
      this.$emit('change-val-auto', { name: prop, value: roundedProp });
    },
    roundAndSetSpouseProp: function(step, max, prop) {
      let spouseMax = Math.min(max, (this.voluntaryPersonalAmount/2));
      let roundedProp = this.roundVolProp(step, spouseMax, this[prop]);
      this.$emit('change-val-auto', { name: prop, value: roundedProp });
    }
  }
}
</script>