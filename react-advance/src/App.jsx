import { useState } from "react";
import SelectedProject from "./components/SelectedProject";
import { initialProjects } from "./data/data";
import SideBar from "./components/SideBar";
import NewProject from "./components/NewProject";
import NoProjectedSelected from "./components/NoProjectSelected";

function App() {
  const [projectState, setProjectState] = useState({
    projects: initialProjects,
    selectedProject: undefined,
  });

  const { selectedProject, projects } = projectState;

  function handleAddProject() {
    setProjectState((prev) => ({ ...prev, selectedProject: null }));
  }

  function handleCancel() {
    setProjectState((prev) => ({ ...prev, selectedProject: undefined }));
  }

  function handleDelete(projectData) {
    setProjectState(({ projects }) => ({
      selectedProject: undefined,
      projects: projects.filter(({ title }) => projectData.title !== title),
    }));
  }

  function handleUpdatingProject(projectData) {
    const updatedProject = projects.map((project) => {
      if (projectData.title == project.title) {
        return projectData;
      }
      return project;
    });

    setProjectState({
      selectedProject: projectData,
      projects: [...updatedProject],
    });
  }

  function handleSaveProject(projectData) {
    setProjectState({
      selectedProject: projectData,
      projects: [...projects, projectData],
    });
  }

  function handleSelectProject(index) {
    setProjectState((prev) => ({
      ...prev,
      selectedProject: projects[index],
    }));
  }

  function displayProject() {
    if (selectedProject !== null && selectedProject !== undefined) {
      return (
        <SelectedProject
          projectData={selectedProject}
          deleteProject={handleDelete}
          updateProject={handleUpdatingProject}
        />
      );
    } else if (selectedProject === null) {
      return (
        <NewProject
          saveProject={handleSaveProject}
          cancelProject={handleCancel}
        />
      );
    }

    return <NoProjectedSelected addProject={handleAddProject} />;
  }

  return (
    <>
      <header>
        <h1 className="my-8 text-center text-5xl font-bold">
          My beautiful site
        </h1>
      </header>
      <main className="flex h-screen gap-8">
        <SideBar
          projectState={projectState}
          selectProject={handleSelectProject}
          addProject={handleAddProject}
        />

        {displayProject()}
      </main>
    </>
  );
}

export default App;
