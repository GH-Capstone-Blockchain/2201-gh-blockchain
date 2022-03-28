import axios from 'axios'

const SET_CONVERSION = 'SET_CONVERSION'

//ETH TO USD CONVERSION
export const setConversion = (conversion) => {
    return {
      type: SET_CONVERSION,
      conversion,
    };
  };

//https://developers.coinbase.com/api/v2#exchange-rates
export const fetchConversion = () => {
      return async (dispatch) => {
        const {data} = await axios.get("https://api.coinbase.com/v2/exchange-rates?currency=ETH")//returns usd rate for 1 ETH
        dispatch(setConversion(Number(data.data.rates.USD)))
      }
  }

const initialState = 0

export default function conversionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONVERSION:
      return action.conversion;
    default:
      return state;
  }
}











