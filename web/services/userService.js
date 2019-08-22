import { postRequest } from '/utils/httpHelper';

const RESOURCE = 'users';

export const createUser = async () => {
  try {
    const response = await postRequest({
      path: RESOURCE,
    });
    return response;
  } catch(error) {
    throw error;
  }
};
