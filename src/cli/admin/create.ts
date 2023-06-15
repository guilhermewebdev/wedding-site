import { getPrompt } from '../../lib/prompt';
import { admin } from '../../modules/application';

async function getAdminData() {
    while(true) {
        try {
            const { ask, close, clearScreen } = getPrompt();
            await clearScreen();
            const { passwordConfirmation, ...adminData } = {
                name: await ask('Nome: '),
                email: await ask('Email: '),        
                password: await ask('Defina uma senha: '),
                passwordConfirmation: await ask('Confirme a senha: '),
            }
            if (adminData.password != passwordConfirmation) {
                throw new Error('Senha não confere');
            }
            close();
            return adminData;
        } catch (error: any) {
            console.log('\n')
            console.error(error?.message || error)
            console.log('\n')
        }
    }
}

!async function main() {
    try {
        const { controller } = admin();
        const adminData = await getAdminData();
        await controller.createAdmin(adminData);
        console.log('Admin criado');
        process.exit(0);
    } catch (error: any) {
        console.log('\n')
        console.error(error?.message || error);
        console.log('\n')
        process.exit(1);
    } 
}()