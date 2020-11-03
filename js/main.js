const app = new Vue({
    el: '#app',
    data() {
        return {
            students: [],
            last_updated: '',
            error: '',
            searching: false,
            authenticated: false,
            id: '',
            student: [],
            works: {
                "portfolio": "PowerApps: Portfolio",
                "bmi": "PowerApps: BMI Calculator",
                "comp_design": "Exercise: Computer Design",
                "cc_license": "Exercise: CC License",
                "excel": "Exercise: Excel",
                "tree": "Exercise: Examinature"
            },
            inputPassword: ''
        }
    },
    computed: {
        currentStudent() {
            return this.students.filter(std => std.id.startsWith(this.id)).slice(0, 3);
        },
        profileColor() {
            return this.student.profileImage;
        },
        missingWorks() {
            let missing = [];
            for (work in this.works) {
                if (!(work in this.student)) {
                    missing.push(work);
                }
            }
            return missing;
        },
        final_score() {
            return parseFloat(this.student.final_exam).toFixed(2);
        },
        total_score() {
            let total = 0;

            for (work in this.works) {
                if (work in this.student) {
                    total += parseFloat(this.student[work]);
                }
            }

            return total + parseFloat(this.final_score);
        },
        grading() {
            const ts = this.total_score
            if (ts >= 80) {
                return 4
            } else if (ts >= 75) {
                return 3.5
            } else if (ts >= 70) {
                return 3
            } else if (ts >= 65) {
                return 2.5
            } else if (ts >= 60) {
                return 2
            } else if (ts >= 55) {
                return 1.5
            } else if (ts >= 50) {
                return 1
            } else {
                return 0
            }
        }
    },
    methods: {
        reset: function () {
            this.student = [];
            this.inputPassword = '';
            this.authenticated = false
        }
    },
    mounted() {
        var _0xfba2=["\x73\x74\x75\x64\x65\x6E\x74\x73","\x6D\x32","\x64\x61\x74\x61","\x74\x68\x65\x6E","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x67\x69\x73\x74\x2E\x67\x69\x74\x68\x75\x62\x75\x73\x65\x72\x63\x6F\x6E\x74\x65\x6E\x74\x2E\x63\x6F\x6D\x2F\x33\x78\x62\x75\x6E\x2F\x39\x31\x33\x34\x34\x65\x35\x32\x63\x65\x32\x34\x32\x65\x32\x61\x33\x62\x39\x66\x62\x61\x30\x32\x61\x38\x65\x39\x39\x37\x32\x66\x2F\x72\x61\x77\x2F","\x67\x65\x74","\x6C\x61\x73\x74\x5F\x75\x70\x64\x61\x74\x65\x64"];axios[_0xfba2[5]](_0xfba2[4])[_0xfba2[3]]((_0x3e7dx1)=>{return (this[_0xfba2[0]]= _0x3e7dx1[_0xfba2[2]][_0xfba2[1]])});axios[_0xfba2[5]](_0xfba2[4])[_0xfba2[3]]((_0x3e7dx1)=>{return (this[_0xfba2[6]]= _0x3e7dx1[_0xfba2[2]][_0xfba2[6]])})
    }
    
})

Vue.config.devtools = true