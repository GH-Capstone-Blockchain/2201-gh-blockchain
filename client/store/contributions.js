import axios from "axios";


const SET_CONTRIBUTIONS = "SET_CONTRIBUTIONS";
const ADD_CONTRIBUTION = "ADD_CONTRIBUTION";

export const setContributions = (contributions) => {
  return {
    type: SET_CONTRIBUTIONS,
    contributions,
  };
};

export const addContribution = (contribution) => {
  return {
    type: ADD_CONTRIBUTION,
    contribution,
  };
};

//for a particular project
export const fetchContributions = (projectId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/contributions/${projectId}`);
      dispatch(setContributions(data));
    } catch (error) {
      console.error("error in fetch contributions thunk", error);
    }
  };
};

//for a particular user
export const fetchContributionsByUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/contributions/user/${userId}`);
      dispatch(setContributions(data));
    } catch (error) {
      console.error(
        "error in fetch contributions for specific user thunk",
        error
      );
    }
  };
};

export const createContribution = (projectId, userId, contributionAmt) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/contributions", {
        userId: userId,
        projectId: projectId,
        contributionAmount: contributionAmt,
      });
      dispatch(fetchContributions(projectId));
    } catch (error) {
      console.error("error in createContribution thunk", error);
    }
  };
};

// export const handleRefund = (project, userId, account, contributionId) => {
//   return async (dispatch) => {
//     try {
//       const campaignContract = await loadContractData(
//         project.campaign_contract_address
//       );
//       await campaignContract.methods.refund(userId).send({ from: account });
//       const { data } = await axios.put(`/api/contributions/${contributionId}`, {
//         refunded: true,
//       });
//       dispatch(fetchContributionsByUser(userId));
//     } catch (error) {
//       console.error("error in refund", error);
//     }
//   };
// };

export const refund = (userId, contributionId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/contributions/${contributionId}`, {
        refunded: true,
      });
      dispatch(fetchContributionsByUser(userId));
    } catch (error) {
      console.error("error in refund thunk", error);
    }
  };
};

const initialState = [];

export default function contributionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTRIBUTIONS:
      return action.contributions;
    case ADD_CONTRIBUTION:
      return [...state, action.contribution];
    default:
      return state;
  }
}
