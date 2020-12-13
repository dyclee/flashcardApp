export const GET_SUBJECTS = "GET SUBJECTS";
export const ADD_SUBJECT = "ADD SUBJECT"

export const getSubjects = (subjects) => ({ type: GET_SUBJECTS, subjects })
export const addSubject = (subject) => ({ type: ADD_SUBJECT, subject })
