import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };

  currentLanguage: "html" | "css" | "javascript";
  isOwner: boolean
}

const initialState: CompilerSliceStateType = {
  fullCode: {
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
    </head>
    <body>
    <div class="container">
      <h1>To-Do List</h1>
      <input type="text" id="taskInput" placeholder="Add New Task">
      <button onclick="addTask()">Add Task</button>
      <ul id="taskList">
        <!-- Tasks will be added here dynamically -->
      </ul>
    </div>
    <script src="script.js"></script>
    </body>
    </html>
    
    `,
    css: `
    body {
      font-family: Arial, sans-serif;
    }
    
    .container {
      max-width: 400px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    
    input[type="text"] {
      width: 70%;
      padding: 10px;
      margin-right: 10px;
    }
    
    button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #45a049;
    }
    
    ul {
      list-style-type: none;
      padding: 0;
    }
    
    li {
      margin: 10px 0;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    
    li:hover {
      background-color: #f0f0f0;
    }
    
    .delete {
      float: right;
      cursor: pointer;
      color: #f44336;
    }
    
    `,
    javascript: `
    function addTask() {
      var taskInput = document.getElementById("taskInput");
      var taskList = document.getElementById("taskList");
    
      // Create a new list item with the entered task
      var li = document.createElement("li");
      var taskText = document.createTextNode(taskInput.value);
      li.appendChild(taskText);
    
      // Create a delete button for each task
      var deleteBtn = document.createElement("span");
      var deleteText = document.createTextNode(" ×");
      deleteBtn.className = "delete";
      deleteBtn.appendChild(deleteText);
      deleteBtn.onclick = function() {
        this.parentElement.remove();
      };
      li.appendChild(deleteBtn);
    
      // Append the new task to the task list
      taskList.appendChild(li);
    
      // Clear the input field after adding task
      taskInput.value = "";
    }
    
    `,
  },
  currentLanguage: "html",
  isOwner: false,
};
const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (
      state,
      action: PayloadAction<CompilerSliceStateType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
    updateIsOwner:(state, action: PayloadAction<boolean>)=>{
      state.isOwner = action.payload
    },
    updateFullCode: (
      state,
      action: PayloadAction<CompilerSliceStateType["fullCode"]>
    ) => {
      state.fullCode = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updateCodeValue, updateFullCode,updateIsOwner } =
  compilerSlice.actions;
