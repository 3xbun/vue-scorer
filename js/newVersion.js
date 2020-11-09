const app = new Vue({
  el: "#app",
  data() {
    return {
      api: "http://a8fa7fa571a2.ngrok.io/api/",
      students: [],
      last_updated: "",
      error: "",
      searching: false,
      authenticated: false,
      id: "",
      student: [],
      score: [],
      works: {
        portfolio: "PowerApps: Portfolio",
        bmi: "PowerApps: BMI Calculator",
        comp_design: "Exercise: Computer Design",
        cc_license: "Exercise: CC License",
        excel: "Exercise: Excel",
        tree: "Exercise: Examinature",
      },
      placeholder: "* * * * * * * *",
      inputPassword: "",
    };
  },
  computed: {
    currentStudent() {
      return this.students
        .filter((std) => std.id.startsWith(this.id))
        .slice(0, 3);
    },
    profileColor() {
      return this.student.profileImage;
    },
    missingWorks() {
      let missing = [];
      for (work in this.works) {
        if (!(work in this.score)) {
          missing.push(work);
        }
      }
      return missing;
    },
    final_score() {
      return NaN ? "" : parseFloat(this.score.final_exam).toFixed(2);
    },
    total_score() {
      let total = 0;

      for (work in this.works) {
        if (work in this.score) {
          total += parseFloat(this.score[work]);
        }
      }

      return (total + parseFloat(this.final_score)).toFixed(2);
    },
    grading() {
      const ts = this.total_score;
      if (ts >= 80) {
        return 4;
      } else if (ts >= 75) {
        return 3.5;
      } else if (ts >= 70) {
        return 3;
      } else if (ts >= 65) {
        return 2.5;
      } else if (ts >= 60) {
        return 2;
      } else if (ts >= 55) {
        return 1.5;
      } else if (ts >= 50) {
        return 1;
      } else {
        return 0;
      }
    },
    profilePicture() {
      const image = `https://joeschmoe.io/api/v1/random`;

      return image;
    },
  },
  methods: {
    authenticattion: function (id) {
      axios
        .post(`${this.api}students/authenticate/${id}`, {
          password: this.inputPassword,
        })
        .then((res) => {
          res.data.msg
            ? (this.authenticated = true)
            : (this.error = "wrong password");
        });
    },
    findStudent: function (id) {
      axios
        .get(`${this.api}students/${id}`)
        .then((res) => {
          res.data.err
            ? (this.error = res.data.err)
            : (this.students = res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getScore: function (id) {
      axios.get(`${this.api}scores/${id}`).then((res) => {
        res.data[0] ? (this.score = res.data[0]) : (this.score = []);
      });
    },
    reset: function () {
      this.students = [];
      this.student = [];
      this.inputPassword = "";
      this.authenticated = false;
      this.error = "";
    },
    formatDate: function (date) {
      return moment(date).fromNow();
    },
    getProfileImage: function (seed) {
      return `https://avatars.dicebear.com/api/avataaars/${seed}.svg?top[]=longHair&skin[]=tanned&skin[]=pale&skin[]=light`;
    },
  },
});

Vue.config.devtools = true;
