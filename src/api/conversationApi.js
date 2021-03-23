import apiCall from '../libs/apiCall';

export const createConversationApi = (userName) =>
  apiCall(`/conversation/create_conversation`);
