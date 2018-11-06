<template>
  <div class="benefits_list_wrap">
    <b-container fluid>
      <b-container
        fluid
        class="benefits_list_ins"
        :class="{open: isTotalWrapOpen}"
        :style="{ height: `${ listHeight }px` }">
        <b-row class="benefits_list_header">
          <b-container fluid class="benefits_list_header-ins">
            <b-row>
              <b-col class="benefits_tpye_header" cols="8">
                <h3>Your Summary</h3>
              </b-col>
              <b-col class="benefits_cost_header" cols="4">
                Monthly Contribution
              </b-col>
            </b-row>
          </b-container>
        </b-row>
        <b-row class="benefits-list_mobile-notice" v-if="!isMobileNoticeHidden">
          <b-col class="no-side-pad">
            <b-row class="benefits-list_mobile-notice-close">
              <img src="../assets/cq-icon-close-notice.png" @click="hideMobileNotice"/>
            </b-row>
            <b-row class="benefits-list_mobile-notice-msg">
            Select a benefit to begin choosing coverage.
            </b-row>
          </b-col>
        </b-row>
        <template v-for="benefit in sortedBenefits">
          <BenefitSideview
            :benefit="benefit"
            :benefits="benefits"
            :selectedId="selectedId"
            :key="benefit.title.rendered"
            :fsaTotal="fsaTotal"
            :fsaEmp="fsaEmp"
            :fsaFam="fsaFam"
            :fsaWaived="fsaWaived"
            :voluntaryTotal="voluntaryTotal"
            :accidentInsurance="accidentInsurance"
            :criticalIllness="criticalIllness"
            :hospitalIndemnity="hospitalIndemnity"
            :voluntaryLifeWaived="voluntaryLifeWaived"
            :voluntaryTotalCost="voluntaryTotalCost"
            :volLifeLabel="volLifeLabel"
            :voluntaryDeathWaived="voluntaryDeathWaived"
            :deathTotalCost="deathTotalCost"
            :deathLabel="deathLabel"
            @side-click="sideClicked($event)" />
        </template>
      </b-container>
      <b-container fluid class="benefits_total_wrap" id="benefits-summary" :class="{open: isTotalWrapOpen}">
        <b-row @click="totalWrapToggle" class="benefits_total_wrap-mobile-tab-icon-wrap" id="benefits-tab-marker">
          <img src="../assets/cq-icon-down-arrow.svg" class="benefits_total_wrap-mobile-tab-icon" width="25" height="25"/>
        </b-row>
        <b-row class="benefits_total">
          <b-col class="benefit_tpye" cols="8">
            <h3>Your Monthly Total</h3>
            <span class="benefit-total-breakdown"><em>Premiums are divided over two pay periods, per month</em></span>
          </b-col>
          <b-col class="benefit_cost" cols="4">
            <h3>{{ `${ totalCost < 0 ? "-" : "" }$${Math.abs(parseFloat(totalCost)).toFixed(2)}` }}</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-row class="email-download-wrap">
              <b-col class="no-left-pad email-download" cols="6">
                <b-btn class="btn-white" v-b-modal.modal1>Email Summary</b-btn>
              </b-col>
              <b-col class="no-side-pad email-download" cols="6">
                <b-btn class="btn-white" @click="generatePDF">Download Summary</b-btn>
              </b-col>
            </b-row>
            <p style="margin-bottom: 0;"><a class="notices-disclaimer" href="#" @click="showImportantNotices">Important Notices</a> | <a class="notices-disclaimer" href="#" @click="showDisclaimer">Disclaimer</a></p>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import BenefitSideview from './BenefitSideview';
import helpers from '../helpers/global_funcs.js';

export default {
  name: 'BenefitsList',
  components: {
    BenefitSideview
  },
  props: [
    'benefits',
    'selectedId', 
    'fsaTotal',
    'fsaEmp',
    'fsaFam',
    'fsaWaived',
    'totalCost', 
    'voluntaryTotal', 
    'accidentInsurance', 
    'criticalIllness', 
    'hospitalIndemnity', 
    'importantNotices', 
    'voluntaryLifeWaived', 
    'voluntaryTotalCost',
    'volLifeLabel',
    'voluntaryDeathWaived',
    'deathTotalCost',
    'deathLabel'
  ],
  data: function() {
    return {
      listHeight: 0,
      isTotalWrapOpen: false,
      isMobileNoticeHidden: false,
    }
  },
  methods: {
    createPDF: helpers.createPDF,
    findListHeight: function() {
      if (document.getElementById('header-wrap')) {
        var headerHeight = document.getElementById('header-wrap').clientHeight;
      } else {
        var headerHeight = 0;
      }
      if (document.getElementById('benefits-summary')) {
        var sumElm = document.getElementById('benefits-summary');
        if (window.matchMedia('(max-width: 1024px)').matches) {
          var summaryHeight = sumElm.clientHeight + parseInt(window.getComputedStyle(sumElm).bottom) - document.getElementById('benefits-tab-marker').clientHeight;
        } else {
          var summaryHeight = document.getElementById('benefits-summary').clientHeight;
        }
      } else {
        var summaryHeight = 0;
      }
      var screenHeight = window.innerHeight ? window.innerHeight : window.clientHeight;
      var isIe11 = !!window.MSInputMethodContext && !!document.documentMode;
      if (isIe11 && window.matchMedia('(max-width: 1024px)').matches) {
        this.listHeight = (screenHeight - 50) - (headerHeight + summaryHeight);
      } else {
        this.listHeight = screenHeight - (headerHeight + summaryHeight)
      }
    },
    findMenuHeight: function() {
      if (document.getElementById('header-wrap')) {
        var headerHeight = document.getElementById('header-wrap').clientHeight;
      } else {
        var headerHeight = 0;
      }
      if (document.getElementById('off-canvas')) {
        document.getElementById('off-canvas').style['min-height'] = `calc(100vh - ${ headerHeight }px)`;
        document.getElementById('off-canvas').style['max-height'] = `calc(100vh - ${ headerHeight }px)`;
      }
    },
    showDisclaimer: function() {
      let disclaimerId = this.benefits.filter(benefit => {
        return benefit.slug === 'disclaimer';
      })[0].id;
      this.isMobileNoticeHidden = true;
      this.$emit('side-click', disclaimerId);
    },
    showImportantNotices: function() {
      let importantNoticesId = this.benefits.filter(benefit => {
        return benefit.slug === 'legal-notices';
      })[0].id;
      this.$emit('side-click', importantNoticesId);
    },
    sideClicked: function($id) {
      this.isMobileNoticeHidden = true;
      this.$emit('side-click', $id);
    },
    hideMobileNotice: function() {
      this.isMobileNoticeHidden = !this.isMobileNoticeHidden
    },
    totalWrapToggle: function() {
      this.isTotalWrapOpen = !this.isTotalWrapOpen;
      setTimeout(() => {
        this.findListHeight();
      }, 300);
    },
    generatePDF: function() {
      var doc = this.createPDF(this.benefits, this.fsaTotal, this.fsaWaived, this.fsaEmp, this.fsaFam, this.voluntaryTotal, this.voluntaryTotalCost, this.deathTotalCost, this.totalCost, this.hospitalIndemnity, this.criticalIllness, this.accidentInsurance, this.voluntaryLifeWaived, this.voluntaryDeathWaived, this.volLifeLabel, this.deathLabel);
      doc.save('cquence-health-personalized-benefits-summary.pdf');
    }
  },
  computed: {
    sortedBenefits: function() {
      return this.benefits.sort((a,b) => {
        return a.acf.order - b.acf.order;
      })
    }
  },
  created: function() {
    this.findListHeight();
    this.findMenuHeight();
    window.addEventListener('load', () => {
      this.findListHeight();
      this.findMenuHeight();
      // Safari doesn't find full height on DOMContentLoaded, so keep this as a safety net
      window.setTimeout(() => {
        this.findListHeight();
        this.findMenuHeight();
      }, 500);
    });
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.findListHeight();
        this.findMenuHeight();
      }, 300);
    });
  }
}
</script>