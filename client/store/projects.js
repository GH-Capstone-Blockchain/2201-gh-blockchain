import axios from "axios";
import Campaign from "../../build/contracts/Campaign.json";
import { formatIsoToUnix } from "../components/smallComponents/utilities";

const SET_PROJECTS = "SET_PROJECTS";
const ADD_PROJECT = "ADD_PROJECT";

export const setProjects = (projects) => {
  return {
    type: SET_PROJECTS,
    projects,
  };
};

export const addProject = (newProject) => {
  return {
    type: ADD_PROJECT,
    newProject,
  };
};

export const fetchProjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/projects");
      const notPassedDeadline = data.filter((project) => {
        const dateNow = Date.now();
        const campaignEnd = formatIsoToUnix(project.campaign_timeline_end);
        return dateNow < campaignEnd;
      });
      dispatch(setProjects(notPassedDeadline));
    } catch (error) {
      console.log("error in fetchProjects thunk", error);
    }
  };
};

//to fetch all projects associated with a specific scientist
export const fetchProjectsByScientist = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/projects/scientist/${userId}`);
      dispatch(setProjects(data));
    } catch (error) {
      console.log("error in fetchProjectsByScientist thunk", error);
    }
  };
};

export const createProject = (newProject) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/projects", newProject);
      const date1 = Math.floor(Date.parse(data.campaign_timeline_start) / 1000);
      const date2 = Math.floor(Date.parse(data.campaign_timeline_end) / 1000);
      const web3 = window.web3;
      const newCampaign = new web3.eth.Contract(Campaign.abi);
      const response = await newCampaign
        .deploy({
          data: Campaign.bytecode,
          arguments: [
            data.id,
            newProject.scientists[0],
            data.project_wallet_address,
            data.name,
            data.fundraising_goal,
            date1,
            date2,
          ],
        })
        .send({ from: newProject.address });
      await axios.put(`/api/projects/${data.id}`, {
        campaign_contract_address: response._address,
      });
      dispatch(addProject(data));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

const initialState = [];

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects;

    case ADD_PROJECT:
      return [...state, action.newProject];

    default:
      return state;
  }
}
