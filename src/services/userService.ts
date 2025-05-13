import { User, UserAttributes } from '../models/user';

export const userService = {
  async createUser(data: UserAttributes) {
    return await User.create(data);
  },

  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  },

  async findById(id: number) {
    return await User.findByPk(id);
  },

  async updateUser(id: number, data: Partial<UserAttributes>) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuário não encontrado');
    return await user.update(data);
  },

  async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuário não encontrado');
    return await user.destroy();
  },
};
