const DashboardWindow = {
    data: function() {
        return {
            tasks: [],

            messages: [{
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
                checkedDependencies: [],
                subItemsList: [],
                currentSubItem: ""
            },
            inCreateMode: false
        }
    },
    created: function() {
        axios.get('http://localhost:8000/taskcontroller/getAll')
            .then(response => {
                // JSON responses are automatically parsed.
                console.log(response.data)
                this.tasks = response.data
            })
            .catch(e => {
                console.log(e)
            })
    },

    methods: {
	"removerTarefa": function(task) {
               		var i = this.tasks.indexOf(task);
			this.tasks.splice(i, 1);;
	axios.delete('http://localhost:8000/taskcontroller/remover', {
                    id: task.id
                })
                .then(function(response) {
                    console.log(response);
                    //this.tasks.push(response.data)
		// TODO - se http 200 OK entao remover a task da UI.
		})
                .catch(function(error) {
                    console.log(error);
                });

    	},
	"toggleExpandClass": function(task) {
            task.isExpanded = !task.isExpanded;
        },
        "calculateProgress": function(task) {
            task.progress = task.checkedItems.length * 100 / task.checklistItems.length;
            this.setProgressClass(task);
        },
        "setProgressClass": function(task) {
            task.progressClasses.pop();
            if (task.progress < 34) {
                task.progressClasses.push("is-danger");
            } else if (task.progress < 67) {
                task.progressClasses.push("is-warning");
            } else {
                task.progressClasses.push("is-success");
            }
        },
        "getDependencieTitle": function(id) {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id == id) {
                    return this.tasks[i].title;
                }
            }
        },
        "getDependencieProgress": function(id) {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id == id) {
                    return this.tasks[i].progress;
                }
            }
        },
        "getDependencieProgressClasses": function(id) {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id == id) {
                    return this.tasks[i].progressClasses;
                }
            }
        },

        "toggleCreateMode": function() {
            this.inCreateMode = !this.inCreateMode;
        },

        "sendMessage": function() {
            this.messages.push({
                text: this.newMessageText,
                owner: ["chat", "self"]
            });
            this.newMessageText = "";
        },

        "addNewSubItem": function() {
            this.createTaskData.subItemsList.push(this.createTaskData.currentSubItem);
            this.createTaskData.currentSubItem = "";
        },

        "createTask": function() {
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
                .then(function(response) {
                    console.log(response);
                    this.tasks.push(response.data)
                })
                .catch(function(error) {
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
        },
           "editTask": function(task) {
	    this.createTaskData.taskId = task.id;
            this.createTaskData.taskTitle = task.title;
            this.createTaskData.taskDescription = task.description;
            this.createTaskData.taskDeadline = task.deadline;
            this.createTaskData.checkedTeamMembers = task.members;
            this.createTaskData.checkedDependencies = task.dependencies;
            this.createTaskData.subItemsList = task.checklistItems;
            this.createTaskData.currentSubItem = [];
            this.toggleCreateMode(); 
        },
	    "clearChat": function () {
  this.messages = [];
  },
	    "logout": function () {
		   store.commit('cleanUser')
		    this.$router.push('login')
	    }
    },

    template: `<div id = 'dashboard-base'>
    <nav class="navbar is-fixed-top is-success" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" @click="() => this.$router.go()">
          <img src="./TrekkLogo.png" alt="Welcome to Trekk!">
          <p class="trekk-title">Trekk</p>
        </a>
      </div>
      <div class="navbar-end">
        <a class="navbar-item is-pulled-right" v-show="!inCreateMode">
          <span class="icon" @click="toggleCreateMode()">
            <i class="fas fa-plus-square fa-2x" aria-hidden="true"></i>
          </span>
        </a>
	<a class="navbar-item is-pulled-right" >
          <span class="icon" @click="() => this.$router.push('settings')">
            <i class="fas fa-cog " aria-hidden="true"></i>
          </span>
        </a>
	<a class="navbar-item is-pulled-right" >
          <span class="icon" @click="logout()">
            <i class="fas fa-sign-out-alt" aria-hidden="true"></i>
          </span>
        </a>
      </div>
    </nav>
    <div class="chat-container" v-show="!inCreateMode">
      <article class="message is-medium is-success">
        <div class="message-header">
          <p>Chat</p>


<div class="dropdown is-right is-hoverable">
	<div id="chat-dropdown-trigger" class="dropdown-trigger">
		<button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
		<span>Contacts</span>
		<span class="icon is-small">
		<i class="fas fa-angle-down" aria-hidden="true"></i>
		</span>
		</button>
	</div>
	<div class="dropdown-menu" id="chat-dropdown-menu" role="menu">
		<div class="dropdown-content">
			<div class="dropdown-item">
				<ul class="menu-list">
					<div  v-for="member in teamMembers">
						<li><a v-on:click="clearChat">{{member}}</a></li>
					</div>
				</ul>
			</div>
		</div>
	</div>

</div>



        </div>
        <div class="chatbox">
          <div class="chatlogs">
            <div v-bind:class="message.owner" v-for="message in messages">
              <div class="user-photo"></div>
              <p class="chat-message">{{message.text}}</p>
            </div>
          </div>
          <div class="chat-form">
            <textarea v-model="newMessageText"></textarea>
            <div class="control">
              <button class="button is-primary is-fullwidth" @click="sendMessage()">Enviar</button>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="cards-container">
      <article class="message is-medium is-success" v-for="task in tasks">
        <div class="message-header" v-on:click="toggleExpandClass(task)">
          <p>{{task.title}}</p>
          <p>Deadline: {{task.deadline}}</p>
        </div>
        <div class="message-body">
          <div class="message-body-left">
            <progress v-bind:class="task.progressClasses" v-bind:value="task.progress" max="100">90%</progress>
            <div v-show="task.isExpanded">
              <p>{{task.description}}</p>
              <nav class="panel" v-show="task.checklistItems.length > 0">
                <p class="panel-heading">
                  Task Progress
                </p>
                <div class="panel-block" v-for="item in task.checklistItems">
                  <label class="checkbox">
                    <input type="checkbox" v-bind:value="item" v-model="task.checkedItems" @change="calculateProgress(task)">
                    {{item}}
                  </label>
                </div>
              </nav>

		<button class="button is-warning" v-on:click= "editTask(task)"> Editar tarefa </button>
	<button class="button is-danger" v-on:click= "removerTarefa(task)"> Remover tarefa </button>
	</div>
          </div>
          <div class="message-body-right">
            <div class="team-member-container">
              <img class="team-member-icon task-creator" src="bot.png"></img>
              <img class="team-member-icon" src="bot.png" v-for="i in task.members - 1"></img>
            </div>
            <div class="task-dependencies-container" v-show="task.isExpanded">
              <nav class="panel" v-show="task.dependencies.length > 0">
                <p class="panel-heading">Task Dependencies: </p>
                <div class="task-dependencie panel-block" v-for="id in task.dependencies">
                   <p>{{getDependencieTitle(id)}}</p>
                   <progress v-bind:class="getDependencieProgressClasses(id)" v-bind:value="getDependencieProgress(id)" max="100">90%</progress>
                 </div>
               </nav>
             </div>
          </div>
        </div>
      </article>
    </div>
    <div class="form-container" v-show="inCreateMode">
      <article class="message is-medium is-success">
        <div class="message-header">
          <p>Nova Task</p>
        </div>
        <div class="message-body">
          <div class="field">
            <label class="label">Titulo</label>
            <div class="control">
              <input class="input" type="text" placeholder="digite o nome da tarefa" v-model="createTaskData.taskTitle">
            </div>
          </div>
          <div class="field">
            <label class="label">Descriçao</label>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <textarea class="textarea" placeholder="Descriçao da tarefa" v-model="createTaskData.taskDescription"></textarea>
                </div>
              </div>
            </div>
          </div>

          <label class="label">Membros</label>
          <nav class="panel">
            <div class="panel-block" v-for="member in this.teamMembers">
              <label class="checkbox">
                <input type="checkbox" v-bind:value="member" v-model="createTaskData.checkedTeamMembers">
                {{member}}
              </label>
            </div>
          </nav>
          <label class="label">Dependencias</label>
          <nav class="panel">
            <div class="panel-block" v-for="task in this.tasks">
              <label class="checkbox">
                <input type="checkbox" v-bind:value="task.id" v-model="createTaskData.checkedDependencies">
                {{task.title}}
              </label>
            </div>
          </nav>
	<label class="label">Subtarefas</label>
          <div class="subitems-list">
            <li v-for="item in createTaskData.subItemsList">{{item}}</li>
          </div>
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="text" placeholder="Nova subtarefa" v-model="createTaskData.currentSubItem">
            </div>
            <div class="control">
              <a class="button is-primary" @click="addNewSubItem()">
                +
              </a>
            </div>
          </div>
          <div class="field">
            <label class="label">Deadline</label>
            <div class="control">
              <input class="input" type="text" placeholder="dd/mm/aaaa" v-model="createTaskData.taskDeadline">
            </div>
          </div>
          <div class="control">
            <button class="button is-primary" @click="createTask()">Criar</button>
            <button class="button is-danger" @click="toggleCreateMode()">Cancel</button>
          </div>
        </div>
      </article>
    </div>
  </div>`
}
