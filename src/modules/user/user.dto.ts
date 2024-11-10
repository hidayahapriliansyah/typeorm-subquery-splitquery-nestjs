export type TGetUserWithLastChatHistory = {
  id: number;
  name: number;
  last_chat: {
    id: number;
    created_at: number;
    message: number;
  };
};
