<template>
  <el-container class='container'>
    <el-header>
      Sign Up
    </el-header>
    <el-card class='box-card'>
      <el-form size='mini' :model='inputForm'>
        <!--이름-->
        <el-form-item label='이름'>
          <el-input size='medium' v-model='inputForm.username.value'></el-input>
        </el-form-item>

        <!-- 아이디-->
        <el-form-item label='아이디'>
          <el-input size='medium' :value='inputForm.id.value' @input='onIdInput'>
            <el-button slot='append' type='primary' @click='checkIdDuplicated' round>중복확인</el-button>
          </el-input>
          <WarningMessage
              @onCloseWarningMessage='onCloseWarningMessage'
              :keyName='inputForm.id.keyName'
              :message='inputForm.id.warningMessage'
              :visible='inputForm.id.warningMessageVisible'></WarningMessage>
        </el-form-item>

        <!-- 비밀번호-->
        <el-form-item label='비밀번호'>
          <el-input size='medium' show-password v-model='inputForm.password.value'>
          </el-input>
        </el-form-item>

        <!-- 비빌번호 확인-->
        <el-form-item label='비밀번호 확인'>
          <el-input size='medium' show-password :value='inputForm.passwordConfirm.value' @input='onCheckPassword'
                    :class='{wrong:inputForm.passwordConfirm.warningMessageVisible}'>
          </el-input>
          <WarningMessage
              @onCloseWarningMessage='onCloseWarningMessage'
              :keyName='inputForm.passwordConfirm.keyName'
              :message='inputForm.passwordConfirm.warningMessage'
              :visible='inputForm.passwordConfirm.warningMessageVisible'></WarningMessage>
        </el-form-item>


        <!--학생여부-->
        <el-form-item label='학생인가요?'>
          <el-switch v-model='inputForm.isStudent.value'></el-switch>
        </el-form-item>

        <!-- 재학기간-->
        <el-form-item label='재학기간'>
          <el-date-picker type='daterange' range-separator='To' start-placeholder='입학일'
                          end-placeholder='졸업(예정)일' :value='inputForm.schoolYears.value'
                          @input='divideDate'></el-date-picker>

          <!--가입목적-->
        </el-form-item>
        <el-form-item label='목적'>
          <el-checkbox-group v-model='inputForm.purposes.value'>
            <el-checkbox v-for='(purpose,index) of purposes' :label='purpose' :key='index'>{{ purpose }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!--성별-->
        <el-form-item label='성별'>
          <el-radio v-model='inputForm.gender.value' label='1'>남성</el-radio>
          <el-radio v-model='inputForm.gender.value' label='2'>여성</el-radio>
        </el-form-item>

        <!--가입-->
        <el-button @click='onSubmit'>가입하기</el-button>

      </el-form>
    </el-card>
  </el-container>
</template>
<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';
import {SignupFormData, SignupResult} from '@/models/SignupModel';
import SignupApi from '@/api/SignupApi';
import WarningMessage from '@/components/message/WarningMessage.vue';

@Component({
             components: {
               WarningMessage
             }
           })
export default class Signup extends Vue {

  inputForm: any = {
    username: {
      value: '',
    },
    id: {
      keyName: 'id',
      value: '',
      warningMessage: '',
      warningMessageVisible: false,
    },
    password: {
      value: ''
    },
    passwordConfirm: {
      keyName: 'passwordConfirm',
      value: '',
      warningMessage: 'Passwords do not match',
      warningMessageVisible: false,
    },
    isStudent: {
      value: false
    },
    schoolYears: {
      value: null
    },
    purposes: {
      value: []
    },
    gender: {
      value: 0
    }

  }

  private availableId = false;
  private availablePassword = false;
  private purposes: string[] = [];

  public mounted() {
    this.getPurposes();
  }

  divideDate(e: any) {
    this.inputForm = {
      ...this.inputForm,
      schoolYears: {
        value: e
      }
    }
  }

  checkIdDuplicated() {
    SignupApi.checkId(this.inputForm.id.value)
             .then(() => {
               this.availableId = true
               this.$message({
                               message: 'Available Id.',
                               type: 'success'
                             })
               this.inputForm = {
                 ...this.inputForm,
                 id: {
                   ...this.inputForm.id,
                   warningMessageVisible: false
                 }
               }
             })
             .catch(() => {
               this.availableId = false;
               this.inputForm = {
                 ...this.inputForm,
                 id: {
                   ...this.inputForm.id,
                   warningMessageVisible: true,
                   warningMessage: 'Duplicated Id'
                 }
               }
             })
  }

  getPurposes() {
    SignupApi.getUserPurpose().then(({purposes}) => {
      this.purposes = JSON.parse((JSON.stringify(purposes)));
    });
  }

  onSubmit() {
    if (!this.availableId) {
      this.$message.error('Please check your ID');
      return
    } else if (!this.availablePassword) {
      this.$message.error('Passwords do not match');
      return;
    }

    const {username, id, password, isStudent, schoolYears, purposes, gender} = this.inputForm;
    const submitForm: SignupFormData = {
      username: username.value,
      id: id.value,
      password: password.value,
      isStudent: isStudent.value,
      admissionDay: schoolYears.value[0],
      graduatedDay: schoolYears.value[1],
      checkedPurPose: purposes.value,
      gender: gender.value
    };
    SignupApi.signUp(submitForm).then((e: SignupResult) => {
               this.$message({
                               message: e.message,
                               type: 'success'
                             })
             })
             .catch((e: SignupResult) => {
               this.$message.error((e.message));
             })

  }

  onIdInput(value: string) {
    this.isItDuplicateId = false;
    this.inputForm = {
      ...this.inputForm,
      id: {
        ...this.inputForm.id,
        value: value,
        warningMessage: 'Please Duplicate Check Your Id',
        warningMessageVisible: true
      }
    };
  }

  onCheckPassword(value: string) {
    this.availablePassword = value === this.inputForm.password.value;
    this.inputForm = {
      ...this.inputForm,
      passwordConfirm: {
        ...this.inputForm.passwordConfirm,
        value: value,
        warningMessageVisible: !this.availablePassword
      }
    }
  }

  onCloseWarningMessage(keyName) {
    this.inputForm = {
      ...this.inputForm,
      [keyName]: {
        ...this.inputForm[keyName],
        warningMessageVisible: false
      }
    }
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

.wrong > input {
  border: 1px solid #F56C6C;
}
</style>