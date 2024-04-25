import { useState } from "react";
import Project from "./components/Project";
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
    const updatedProjects = [...projects, projectData];

    setProjectState({
      selectedProject: projectData,
      projects: updatedProjects,
    });
  }

  function handleSelectProject(index) {
    setProjectState((prev) => ({
      ...prev,
      selectedProject: projects[index],
    }));
  }

  function handleDelete(projectData) {
    setProjectState(({ projects }) => ({
      selectedProject: undefined,
      projects: projects.filter(({ title }) => projectData.title !== title),
    }));
  }

  function handleCancel() {
    setProjectState((prev) => ({ ...prev, selectedProject: undefined }));
  }

  function displayProject() {
    if (selectedProject !== null && selectedProject !== undefined) {
      return (
        <Project
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
          projects={projects}
          selectProject={handleSelectProject}
          addProject={handleAddProject}
        />

        {displayProject()}
      </main>
    </>
  );
}

export default App;
