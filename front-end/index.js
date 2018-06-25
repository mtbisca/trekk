    let app = new Vue({
      el: '#app',
      data: {
          tasks: [],

          messages: [
            {
              text: "Ow vc sabe do joaozinho?",
              owner: ["chat", "self"]
            },
            {
              text: "Sei nao",
              owner: ["chat", "friend"]
            },
            {
              text: "Pq?",
              owner: ["chat", "friend"]
            },
            {
              text: "To travado em uma dependencia dele",
              owner: ["chat", "self"]
            },
          ],
          newMessageText: "",
          teamMembers: ["Pedro", "João", "Maria"],
          createTaskData: {
            taskId: 3,
            taskTitle: "",
            taskDescription: "",
            taskDeadline: "",
            checkedTeamMembers: [],
            checkedDependencies:[],
            subItemsList: [],
            currentSubItem: ""
          },
          inCreateMode: false
      },
      created() {
    axios.get('http://localhost:8000/taskcontroller/getAll')
    .then(response => {
      // JSON responses are automatically parsed.
      console.log(response.data)
      this.tasks = response.data
    })
    .catch(e => {
      console.log(e)
    })},
      methods: {
        "toggleExpandClass": function (task) {
          task.isExpanded = !task.isExpanded;
        },
        "calculateProgress": function (task) {
          task.progress = task.checkedItems.length * 100 / task.checklistItems.length ;
          this.setProgressClass(task);
        },
        "setProgressClass": function (task) {
          task.progressClasses.pop();
          if(task.progress < 34) {
            task.progressClasses.push("is-danger");
          } else if (task.progress < 67) {
            task.progressClasses.push("is-warning");
          } else {
            task.progressClasses.push("is-success");
          }
        },
        "getDependencieTitle": function (id) {
          for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == id) {
              return this.tasks[i].title;
            }
          }
        },
        "getDependencieProgress": function (id) {
          for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == id) {
              return this.tasks[i].progress;
            }
          }
        },
        "getDependencieProgressClasses": function (id) {
          for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == id) {
              return this.tasks[i].progressClasses;
            }
          }
        },

        "toggleCreateMode": function () {
          this.inCreateMode = !this.inCreateMode;
        },

        "sendMessage": function () {
          this.messages.push({
            text: this.newMessageText,
            owner: ["chat", "self"]
          });
          this.newMessageText = "";
        },

        "addNewSubItem": function () {
          this.createTaskData.subItemsList.push(this.createTaskData.currentSubItem);
          this.createTaskData.currentSubItem = "";
        },

       "createTask": function () {
          axios.post('http://localhost:8000/taskcontroller/inserir', {
              title: this.createTaskData.taskTitle,
              description: this.createTaskData.taskDescription,
              deadline: this.createTaskData.taskDeadline,
              progress: 0,
              progressClasses: ["progress", "is-danger"],
              dependencies: this.createTaskData.checkedDependencies,
              creator: 0,
              members: this.createTaskData.checkedTeamMembers.length,
              checklistItems: this.createTaskData.subItemsList,
              checkedItems: [],
              isExpanded: false
            })
            .then(function (response) {
              console.log(response);
              this.tasks.push(response.data)
            })
            .catch(function (error) {
              console.log(error);
            });

            // clear previous create data
            this.createTaskData.taskTitle = "";
            this.createTaskData.taskDescription = "";
            this.createTaskData.taskDeadline = "";
            this.createTaskData.checkedTeamMembers = [];
            this.createTaskData.checkedDependencies = [];
            this.createTaskData.subItemsList = [];
            this.createTaskData.currentSubItem = "";
            this.toggleCreateMode();
        }
      }
    });