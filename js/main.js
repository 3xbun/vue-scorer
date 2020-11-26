const app = new Vue({
  el: "#app",
  data() {
    return {
      students: [],
      data:
        "https://gist.githubusercontent.com/3xbun/fd57e85333d4e089f7deda435c2ce65b/raw",
      visitors: "",
      last_updated: "",
      error: "",
      searching: false,
      authenticated: false,
      id: "",
      student: [],
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
    progress() {
      const pg = {};
      const ts = this.total_score;
      pg.percent = 452 - (452 * ts) / 100;

      if (ts > 80) {
        pg.color = "#58D68D";
      } else if (ts > 70) {
        pg.color = "#F4D03F";
      } else if (ts > 60) {
        pg.color = "#EB984E";
      } else {
        pg.color = "#EC7063";
      }

      return pg;
    },
    currentStudent() {
      // console.log(
      //   this.students.filter((std) => {
      //     if (std.id.startsWith("18")) {
      //       console.log(std.id);
      //     }
      //   })
      // );
      // return this.students;
      // return this.students.filter({ id: startsWith(this.id) });
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
        if (this.student[work] == 0) {
          this.student[work] = null;
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
        if (this.student[work]) {
          total += parseFloat(this.student[work]);
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
    reset: function () {
      this.student = [];
      this.inputPassword = "";
      this.authenticated = false;
    },
    formatDate: function (date) {
      return moment(date).fromNow();
    },
    getProfileImage: function (seed) {
      const image = `https://avatars.dicebear.com/api/avataaars/${seed}.svg?top[]=longHair&skin[]=tanned&skin[]=pale&skin[]=light`;

      return image;
    },
  },
  mounted() {
    // prettier-ignore

    axios
      .get(
        `${this.data}`
      )
      .then((res) => {
        this.last_updated = res.data.pop().last_updated;
        this.students = res.data
      });

    axios
      .get("https://api.countapi.xyz/hit/3xbun.me/vue-scorer")
      .then((res) => (this.visitors = res.data.value));
  },
});

Vue.config.devtools = true;
