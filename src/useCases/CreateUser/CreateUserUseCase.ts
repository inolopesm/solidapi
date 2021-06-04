import { User } from '../../entities/User'
import { IMailProvider } from '../../providers/IMailProvider'
import { IUserRepository } from '../../repositories/IUserRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'

export class CreateUserUseCase {
    public constructor (
        private readonly userRepository: IUserRepository,
        private readonly mailProvider: IMailProvider
    ) {}

    public async execute (data: ICreateUserRequestDTO): Promise<void> {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email)
        if (userAlreadyExists !== null) throw new Error('User already exists')
        const user = new User(data)
        await this.userRepository.save(user)
        await this.mailProvider.sendMail({
            to: { name: data.name, email: data.email },
            from: { name: 'Equipe do Meu App', email: 'equipe@meuapp.com' },
            subject: 'Seja bem-vindo à plataforma',
            body: '<p>Você já pode fazer login em nossa plataforma</p>'
        })
    }
}
