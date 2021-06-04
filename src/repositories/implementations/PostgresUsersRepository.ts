import { User } from '../../entities/User';
import { IUserRepository } from '../IUserRepository'

export class PostgresUsersRepository implements IUserRepository {
    private users: User[] = []

    async findByEmail (email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email)
        return user !== undefined ? user : null
    }

    async save (user: User): Promise<void> {
        this.users.push(user)
    }
}