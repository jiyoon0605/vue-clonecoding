<template>
  <div>
    <el-dialog
        class="select-sponsor-dialogue"
        :visible.sync="visible"
        :before-close="onClose"
        title="Select Sponsor"
        :modalAppendToBody="false">
      <DialogueSelector :cur-item="curSpo" :item-list="getSponsors" @onChange="onSponsorChange"></DialogueSelector>
      <DialogueSelector :cur-item="curSender" :item-list="getSenders" @onChange="onSenderChange"></DialogueSelector>
      <WarningMessage :visible="warningMessageVisible" :message="warningMessage"></WarningMessage>
      <CancelButton @onClick="onClose"></CancelButton>
      <OkButton @onClick="onSubmit"></OkButton>
    </el-dialog>
  </div>
</template>
<script lang="ts">

import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {Sender, Sponsor} from '@/models/Model';
import {getSenderList} from '@/api/SelectSender';
import WarningMessage from '@/components/message/WarningMessage.vue';
import DialogueSelector from '@/components/selector/DialogueSelector.vue';
import CancelButton from '@/components/button/CancelButton.vue';
import OkButton from '@/components/button/OkButton.vue';


@Component({
             components: {
               OkButton,
               CancelButton,
               DialogueSelector,
               WarningMessage,
             }
           })
export default class SelectSponsorDialogue extends Vue {
  @Prop({default: () => false}) private readonly visible: boolean;
  @Prop({default: () => []}) private readonly sponsors: Sponsor[];
  curSpo: number = 0;
  senders: Sender[] = [];
  curSender: number = 0;
  warningMessageVisible: boolean = false;
  warningMessage: string = ''

  get getSponsors() {
    return this.sponsors.map((e) => ({
      key: e.sponsorKey,
      label: e.sponsorName,
      value: e.sponsorKey
    }))
  }

  get getSenders() {
    return this.senders.map((e) => ({
      key: e.SENDER_KEY,
      label: e.SND_ORGAN,
      value: e.SENDER_KEY
    }))
  }

  @Watch('sponsors')
  initSponsor() {
    this.curSpo = this.sponsors[0].sponsorKey;
    this.getSendersApi();
  }

  getSendersApi() {
    getSenderList().then(({data}) => {
      this.warningMessageVisible = false;
      this.senders = data.data.senders;
      this.curSender = this.senders[0].SENDER_KEY;
    }).catch(() => {
      this.warningMessageVisible = true;
      this.warningMessage = 'Network Error'
    })
  }

  onClose() {
    this.$emit("onClose");
  }

  onSponsorChange(val: any) {
    this.curSpo = val;
  }

  onSenderChange(val: any) {
    this.curSender = val
  }

  onSubmit() {

  }
}
</script>
<style>
.select-sponsor-dialogue {
  z-index: -9999;
}

</style>