import ActionTypes from '../constants/ActionTypes';

const getMessage = (payload) => {
  switch (payload.type) {
    case ActionTypes.IMAGE: {
      return 'Great shot!';
    }
    case ActionTypes.SIMA: {
      return 'One sima down!';
    }
    case ActionTypes.LECTURE: {
      return 'Absorb that knowledge!';
    }
    case ActionTypes.BUTTON_PUSH: {
      return 'Way to push that button!';
    }
    case ActionTypes.TEXT: {
      return 'That\'s cool!';
    }
  }
};

const getErrorMessage = (payload) => {
  console.log(payload);
  return 'Oh no, an error occurred! :-(';
};

const getRateLimitMessage = (payload) => {
  return 'Hold your horses!'
};

export {
  getMessage,
  getErrorMessage,
  getRateLimitMessage
};
