<template>
  <b-col class="no-side-pad">
    <!-- Plan Details -->
    <b-row class="benefits_details_row">
      <b-col class="no-side-pad" v-html="activeBenefit.acf.voluntary_plans_options.voluntary_plans_details"></b-col>
    </b-row>
    <!-- Accident Insurance -->
    <b-row class="bottom-margin benefits_details_row">
      <h5>Accident Insurance Enrollment Options</h5>
      <form
        action=""
        class="enrollment-options-form"
        @change="$emit('acc-plan-chosen', $event.target.value)">
        <template v-for="option in activeBenefit.acf.voluntary_plans_options.accidental_insurance">
          <label class="enrollment-option-container" :key="option.plan_label">
            <input
              type="radio"
              name="cost"
              :value="option.plan_label"
              :checked="accidentInsurance.plan_label === option.plan_label" />
            <span class="checkmark" :class="{ noCost: option.plan_cost == 0}"></span>
            <span class="enrollment-option-label" :class="{ noCost: option.plan_cost == 0 }"> {{ option.plan_label }}</span>
            <br />
            <template v-if="parseFloat(option.plan_cost) != 0">
              <span class="enrollment-option-price">
                {{ `${ option.plan_cost < 0 ? "-" : "" }$${ Math.abs(parseFloat(option.plan_cost)).toFixed(2) } Monthly Cost` }}
              </span>
            </template>
          </label>
        </template>
      </form>
    </b-row>
    <!-- Critical Illness Desktop Tables -->
    <!-- <template v-for="option in activeBenefit.acf.voluntary_plans_options.critical_illness[0].options">
      <b-row :key="'desktop' + option.option_label" class="desktop">
        <h5 class="top-margin">Critical Illness Enrollment {{ option.option_label }}</h5>
      </b-row>
      <b-row class="desktop">
        <b-col class="benefits-table-wrap no-side-pad bottom-margin">
          <b-container fluid class="benefits-table-ins voluntary-plans">
            <b-row class="benefits-table-header">
              <b-col class="no-side-pad text-center" cols="2">{{ option.option_amount }}</b-col>
              <b-col class="no-side-pad text-center" cols="5">Non-tobacco User</b-col>
              <b-col class="no-side-pad text-center" cols="5">Tobacco User</b-col>
              </b-row>
          </b-container>
          <b-container fluid class="benefits-table-ins voluntary-plans">
            <b-row>
              <b-col class="benefits-table-col">Issue Age</b-col>
              <b-col class="benefits-table-col">EE, EE & CH</b-col>
              <b-col class="benefits-table-col">EE & SP, Family</b-col>
              <b-col class="benefits-table-col">EE, EE & CH</b-col>
              <b-col class="benefits-table-col">EE & SP, Family</b-col>
            </b-row>
          </b-container>
          <b-container fluid class="benefits-table-ins voluntary-plans" v-for="range in option.age_range" :key="range.age_range_label">
            <b-row>
              <b-col class="benefits-table-col">{{ range.age_range_label }}</b-col>
              <b-col class="benefits-table-col">
                {{ noTobaccoEeCh(range.plans).rate }}
              </b-col>
              <b-col class="benefits-table-col">
                {{ noTobaccoSpFam(range.plans).rate }}
              </b-col>
              <b-col class="benefits-table-col">
                {{ tobaccoEeCh(range.plans).rate }}
              </b-col>
              <b-col class="benefits-table-col">
                {{ tobaccoSpFam(range.plans).rate }}
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </template>

    <template v-for="option in activeBenefit.acf.voluntary_plans_options.critical_illness[0].options">
      <b-row :key="'mobile' + option.option_label" class="mobile">
        <h5 class="top-margin">Critical Illness Enrollment {{ option.option_label }}</h5>
      </b-row>
      <b-row class="mobile">
        <b-col class="benefits-table-wrap no-side-pad bottom-margin">
          <b-row>
            <b-container fluid class="benefits-table-ins voluntary-plans">
              <b-row class="benefits-table-header">
                <b-col class="no-side-pad text-center">{{ option.option_amount }} - Non-tobacco User</b-col>
                </b-row>
            </b-container>
            <b-container fluid class="benefits-table-ins voluntary-plans">
              <b-row>
                <b-col class="benefits-table-col">Issue Age</b-col>
                <b-col class="benefits-table-col">EE, EE & CH</b-col>
                <b-col class="benefits-table-col">EE & SP, Family</b-col>
              </b-row>
            </b-container>
            <b-container fluid class="benefits-table-ins voluntary-plans" v-for="range in option.age_range" :key="range.age_range_label">
              <b-row>
                <b-col class="benefits-table-col">{{ range.age_range_label }}</b-col>
                <b-col class="benefits-table-col">
                  {{ noTobaccoEeCh(range.plans).rate }}
                </b-col>
                <b-col class="benefits-table-col">
                  {{ noTobaccoSpFam(range.plans).rate }}
                </b-col>
              </b-row>
            </b-container>
          </b-row>
          <b-row>
            <b-container fluid class="benefits-table-ins voluntary-plans">
              <b-row class="benefits-table-header">
                <b-col class="no-side-pad text-center">{{ option.option_amount }} - Tobacco User</b-col>
                </b-row>
            </b-container>
            <b-container fluid class="benefits-table-ins voluntary-plans">
              <b-row>
                <b-col class="benefits-table-col">Issue Age</b-col>
                <b-col class="benefits-table-col">EE, EE & CH</b-col>
                <b-col class="benefits-table-col">EE & SP, Family</b-col>
              </b-row>
            </b-container>
            <b-container fluid class="benefits-table-ins voluntary-plans" v-for="range in option.age_range" :key="range.age_range_label">
              <b-row>
                <b-col class="benefits-table-col">{{ range.age_range_label }}</b-col>
                <b-col class="benefits-table-col">
                  {{ tobaccoEeCh(range.plans).rate }}
                </b-col>
                <b-col class="benefits-table-col">
                  {{ tobaccoSpFam(range.plans).rate }}
                </b-col>
              </b-row>
            </b-container>
          </b-row>
        </b-col>
      </b-row>
    </template> -->

    <b-row>
      <b-col class="no-side-pad top-margin bottom-margin">
        <h5>Choose Your Critical Illness Plan</h5>
      </b-col>
    </b-row>
    <b-row class="voluntary-plans bottom-margin benefits_details_row">
      <b-col class="no-side-pad">
        <label class="enrollment-option-container critical-illness">
          <input
            type="checkbox"
            name="waive-crit"
            :value="true"
            :checked="criticalIllness.waived"
            @click="$emit('swap-crit-ill-waive', $event)" />
          <span class="checkmark noCost"></span>
          <span class="enrollment-option-label noCost"> Waive Critical Illness Plan</span>
        </label>
      </b-col>
    </b-row>
    <template v-if="!criticalIllness.waived">
      <b-row class="voluntary-plans">
        <b-col class="no-side-pad vol-plan-options-wrap">
          <span class="vol-plan-option-label">Select Plan</span>
          <select
            data-key="plan"
            @change="$emit('crit-plan', $event)">
            <option disabled selected value="Select Plan">Select Plan</option>
            <template v-for="option in activeBenefit.acf.voluntary_plans_options.critical_illness[0].options">
              <option :value="option.option_label" :key="option.option_label">{{ `${ option.option_amount } - ${ option.option_label }` }}</option>
            </template>
          </select>
        </b-col>
        <b-col class="no-side-pad vol-plan-options-wrap">
          <span class="vol-plan-option-label">Tobacco User</span>
          <select
            data-key="tobacco"
            @change="$emit('crit-plan', $event)">
            <option disabled selected value="Choose Yes/No">Choose Yes/No</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </b-col>
        <b-col class="no-side-pad vol-plan-options-wrap">
          <span class="vol-plan-option-label">Select Plan Type</span>
          <select
            data-key="type"
            @change="$emit('crit-plan', $event)">
            <option disabled selected value="Choose Plan Type">Choose Plan Type</option>
            <option value="ee">Employee</option>
            <option value="eesp">Employee and Spouse</option>
            <option value="eech">Employee and Children</option>
            <option value="fam">Family</option>
          </select>
        </b-col>
        <b-col class="no-side-pad vol-plan-options-wrap">
          <span class="vol-plan-option-label">Your Age</span>
          <select
            data-key="age_range"
            @change="$emit('crit-plan', $event)">
            <option disabled selected value="Choose Age Range">Choose Age Range</option>
            <template v-for="range in activeBenefit.acf.voluntary_plans_options.critical_illness[0].options[0].age_range">
              <option :value="range.age_range_label" :key="range.age_range_label">{{ range.age_range_label }}</option>
            </template>
          </select>
        </b-col>
      </b-row>
      <b-row class="bottom-margin benefits_details_row">
        <span style="font-weight: 400; margin: 1rem 0 0">Cost = <span style="font-weight: 700;">{{ critIllTotal ? critIllTotal : '$0.00' }} / Month</span></span>
      </b-row>
    </template>
    <!-- Hospital Indemnity -->
    <b-row class="top-margin">
      <h5>Hospital Indemnity</h5>
      <form
        action=""
        @change="$emit('hosp-plan-chosen', $event.target.value)"
        class="enrollment-options-form">
        <template v-for="option in activeBenefit.acf.voluntary_plans_options.hospital_indemnity">
          <label class="enrollment-option-container" :key="option.plan_label"> 
            <input
              type="radio"
              name="cost"
              :value="option.plan_label"
              :checked="hospitalIndemnity.plan_label === option.plan_label" />
            <span class="checkmark" :class="{ noCost: option.plan_cost == 0 }"></span>
            <span class="enrollment-option-label" :class="{ noCost: option.plan_cost == 0 }"> {{ option.plan_label }}</span>
            <br />
            <template v-if="parseFloat(option.plan_cost) != 0">
              <span class="enrollment-option-price">
                {{ `${ option.plan_cost < 0 ? "-" : "" }$${ Math.abs(parseFloat(option.plan_cost)).toFixed(2) } Monthly Cost` }}
              </span>
            </template>
          </label>
        </template>
      </form>
    </b-row>
  </b-col>
</template>

<script>
export default {
  name: 'VoluntaryPlans',
  props: ['activeBenefit', 'critIllTotal', 'hospitalIndemnity', 'accidentInsurance', 'criticalIllness'],
  methods: {
    noTobaccoEeCh: function(plans) {
      return plans.filter(plan => { return !plan.tobacco_user && plan.type === 'ee-eech' })[0];
    },
    noTobaccoSpFam: function(plans) {
      return plans.filter(plan => { return !plan.tobacco_user && plan.type === 'eesp-fam' })[0];
    },
    tobaccoEeCh: function(plans) {
      return plans.filter(plan => { return plan.tobacco_user && plan.type === 'ee-eech' })[0];
    },
    tobaccoSpFam: function(plans) {
      return plans.filter(plan => { return plan.tobacco_user && plan.type === 'eesp-fam' })[0];
    }
  },
}
</script>

