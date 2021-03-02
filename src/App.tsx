import { DataStore } from "@aws-amplify/datastore";
import React, { useEffect } from "react";
import "./App.css";
import { BasicLayout } from "./components/common/BasicLayout";
import { TaskSection } from "./components/home/TaskSection";
import { Task, Work } from "./models";

export function App(): React.ReactElement {
  return (
    <BasicLayout>
      <div className="App">
        <TaskSection />
      </div>
    </BasicLayout>
  );
}
