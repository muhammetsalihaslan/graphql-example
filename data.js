export const users = [
  { id: "1", fullname: "Salih Aslan", age: 28 },
  { id: "2", fullname: "Osman Demirci", age: 32 },
];

export const posts = [
  { id: "1", title: "Salihin gönderisi", user_id: "1" },
  { id: "2", title: "Salihin diğer gönderisi", user_id: "1" },
  { id: "3", title: "Osmanin gönderisi", user_id: "2" },
];

export const comments = [
  { id: "1", text: "Osmanin yorumu ", post_id: "1", user_id: "2" },
  { id: "2", text: "Salihin Yorumu ", post_id: "1", user_id: "1" },
  { id: "3", text: "Salihin Yorumu", post_id: "1", user_id: "1" },
  { id: "4", text: "Osmanin yorumu ", post_id: "2", user_id: "2" },
];
