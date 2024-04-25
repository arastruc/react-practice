import noProjectLogo from "../assets/no-projects.png";
import Button from "./Button";

const NoProjectedSelected = ({ addProject }) => {
  return (
    <div className="w-3/6 mx-8 mr-20 my-8 flex flex-col justify-center items-center">
      <img src={noProjectLogo} alt="Some Image" className="w-64" />
      <h2 className="font-bold text-xl">Please select a project !</h2>

      <Button onClick={addProject}>Add project</Button>
    </div>
  );
};

export default NoProjectedSelected;
