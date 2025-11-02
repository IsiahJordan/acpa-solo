
export type AccountType = {
  username: string;
  password: string;
};

// this is used for jwt token 
// verification through decoding
// of the token
export type CredentialType = {
  role?: string;
};

export type ExamType = {
  class_id?: string;
  exam_id?: string;
};

export type ClassroomType = {
  code?: string;
  class_id:? string;
};
