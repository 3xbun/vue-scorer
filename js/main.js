const app = new Vue({
    el: '#app',
    data() {
        return {
            students: [],
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
    mounted() {
        axios.get('https://gist.githubusercontent.com/3xbun/91344e52ce242e2a3b9fba02a8e9972f/raw/').then(res => (this.students = res.data['m2']))
    }
    
})

Vue.config.devtools = true