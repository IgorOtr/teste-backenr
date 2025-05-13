import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';

export interface UserAttributes {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  fotoPerfil?: string;
  dataNascimento: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public fotoPerfil!: string;
  public dataNascimento!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fotoPerfil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dataNascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
  }
);
