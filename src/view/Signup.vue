<template>
  <el-container class="container">
    <el-header>
      Sign Up
    </el-header>
    <el-card class="box-card">
      <el-form size="mini" :model="form">
        <!--이름-->
        <el-form-item label="이름">
          <el-input size="medium" v-model="form.username"></el-input>
        </el-form-item>

        <!-- 아이디-->
        <el-form-item label="아이디">
          <el-input size="medium" v-model="form.id">
            <el-button slot="append" type="primary" @click="checkIdDuplicated" round>중복확인</el-button>
          </el-input>
          <WarningMessage message="중복된 아이디인지 확인해 주세요." :visible="isItDuplicateId===null&&this.form.id"></WarningMessage>
          <WarningMessage message="중복된 아이디입니다." :visible='isItDuplicateId'></WarningMessage>
        </el-form-item>

        <!-- 비밀번호-->
        <el-form-item label="비밀번호">
          <el-input size="medium" show-password v-model="form.password">
          </el-input>
        </el-form-item>

        <!-- 비빌번호 확인-->
        <el-form-item label="비밀번호 확인">
          <el-input size="medium" show-password v-model="form.passwordConfirm" :class="{wrong:!isPasswordSame}">
          </el-input>
          <WarningMessage message="비밀번호가 일치하지 않습니다" :visible='!isPasswordSame'></WarningMessage>
        </el-form-item>


        <!--학생여부-->
        <el-form-item label="학생인가요?">
          <el-switch v-model="form.isStudent"></el-switch>
        </el-form-item>

        <!-- 재학기간-->
        <el-form-item label="재학기간">
          <el-date-picker type="daterange" range-separator="To" start-placeholder="입학일"
                          end-placeholder="졸업(예정)일" v-model="schoolYears"></el-date-picker>

          <!--가입목적-->
        </el-form-item>
        <el-form-item label="목적">
          <el-checkbox-group v-model="form.checkedPurPose">
            <el-checkbox v-for="(purpose,index) of purposes" :label="purpose" :key="index">{{ purpose }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!--성별-->
        <el-form-item label="성별">
          <el-radio v-model="form.gender" label="1">남성</el-radio>
          <el-radio v-model="form.gender" label="2">여성</el-radio>
        </el-form-item>

        <!--가입-->
        <el-button @click="onSubmit">가입하기</el-button>

      </el-form>
    </el-card>
  </el-container>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {SignupFormData, SignupResult} from '@/models/SignupModel';
import SignupApi from '@/api/SignupApi';
import WarningMessage from '@/components/message/WarningMessage.vue';

@Component({
  components:{
    WarningMessage
  }
           })
export default class Signup extends Vue {
  private form: SignupFormData = {
    username: "",
    id: "",
    password: "",
    passwordConfirm: "",
    isStudent: false,
    admissionDay: new Date(),
    graduatedDay: new Date(),
    checkedPurPose: [],
    gender: 0
  }
  private isItDuplicateId: boolean | null = null;
  private shcoolyears: Date[] = [];
  private purposes: string[] = [];

  checkIdDuplicated() {
    SignupApi.checkId(this.form.id)
             .then(() => {
               this.isItDuplicateId = false
               this.$message({
                               message: "사용 가능한 아이디입니다.",
                               type: "success"
                             })
             })
             .catch(() => {
               this.isItDuplicateId = true
               this.$message.error(("중복된 아이디입니다."));
             })
  }

  getPurposes() {
    SignupApi.getUserPurpose().then(({purposes}) => {
      this.purposes = JSON.parse((JSON.stringify(purposes)));
    });
  }

  onSubmit() {
    if (!this.isPasswordSame) {
      this.$message.error("Passwords do not match");
    }
    if(!this.isItDuplicateId){
      this.$message.error("Please check your ID");
    }
    else {
      SignupApi.signUp(this.form).then((e: SignupResult) => {
                 this.$message({
                                 message: e.message,
                                 type: "success"
                               })
               })
               .catch((e: SignupResult) => {
                 this.$message.error((e.message));
                 this.form.id = "";
               })
    }

  }

  get isPasswordSame() {
    return this.form.password === this.form.passwordConfirm;
  }

  get schoolYears() {
    return this.shcoolyears;
  }

  set schoolYears(e: any) {
    this.shcoolyears = JSON.parse((JSON.stringify(e)));
    this.form.admissionDay = e[0];
    this.form.graduatedDay = e[1];
  }

  public mounted() {
    this.getPurposes();
  }

}
</script>
<style>


.container {
  margin-top: 100px;
  display: flex;
  align-items: center;
}

.box-card {
  width: 500px;
}

label {
  width: 100%;
  text-align: left !important;
}

.el-date-editor {
  width: 100% !important;
}


.wrong {
  border: 1px solid #F56C6C;
}
</style>