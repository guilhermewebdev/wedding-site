import readline from 'readline';

async function clearScreen() {
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
}

export function getPrompt() {
    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const ask = async (question: string) => {
        return new Promise<string>((accept) => {
            reader.question(question, name => {
                accept(name);
            });
        })
    };
    const close = () => reader.close();
    return {
        ask, close, clearScreen,
    }
}