import bcryptjs from "bcryptjs";

const passwordHash = (password) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};

export default passwordHash;
